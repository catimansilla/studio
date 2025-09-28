'use server';

import { generateWeatherExplanation } from '@/ai/flows/generate-weather-explanation';
import { generateWindsurfExplanation } from '@/ai/flows/generate-windsurf-explanation';
import { suggestAlternativeRowingTimes } from '@/ai/flows/suggest-alternative-rowing-times';
import type { WeatherAnalysisResult, RowingCondition, Sport } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const ROSARIO_LAT = -32.95;
const ROSARIO_LON = -60.64;

function getPaddleSurfCondition(windSpeed: number, windGust: number): RowingCondition {
    if (windSpeed >= 6.9 || windGust > 12) {
      return 'Not Suitable';
    } else if (windSpeed >= 4.2) {
      return 'Caution';
    } else {
      return 'Optimal';
    }
}

function getWindsurfCondition(windSpeed: number): RowingCondition {
    // For windsurf, higher wind is better, but let's define "Optimal" as good for intermediates/advanced
    if (windSpeed >= 7.8) { // Approx 28 km/h
        return 'Optimal';
    } else if (windSpeed >= 2.2) { // Approx 8 km/h
        return 'Caution'; // Good for beginners
    } else {
        return 'Not Suitable'; // Not enough wind
    }
}


export async function getWeatherAnalysis(
  day: number,
  hour: number,
  sport: Sport,
  userId?: string | null
): Promise<WeatherAnalysisResult> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ROSARIO_LAT}&longitude=${ROSARIO_LON}&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto&forecast_days=6`;
    
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      throw new Error('No se pudieron obtener los datos meteorológicos.');
    }

    const data = await response.json();
    
    const index = day * 24 + hour;

    if (!data || !data.hourly || !data.hourly.time || data.hourly.time.length <= index) {
      throw new Error('Datos meteorológicos inválidos o incompletos recibidos.');
    }

    const weatherData = {
      temperature: Math.round(data.hourly.temperature_2m[index]),
      windSpeed: data.hourly.wind_speed_10m[index],
      windGust: data.hourly.wind_gusts_10m[index],
      windDirection: data.hourly.wind_direction_10m[index],
    };

    let condition: RowingCondition;
    let explanationFlow;

    if (sport === 'paddlesurf') {
        condition = getPaddleSurfCondition(weatherData.windSpeed, weatherData.windGust);
        explanationFlow = generateWeatherExplanation({
            ...weatherData,
            windDirection: String(weatherData.windDirection),
        });
    } else { // windsurf
        condition = getWindsurfCondition(weatherData.windSpeed);
        explanationFlow = generateWindsurfExplanation({
            ...weatherData,
            windDirection: String(weatherData.windDirection),
        });
    }


    const [explanationResult, alternativesResult] = await Promise.all([
      explanationFlow,
      condition !== 'Optimal'
        ? suggestAlternativeRowingTimes({
            ...weatherData,
            gust: weatherData.windGust,
            currentTime: `${hour}:00`,
          })
        : Promise.resolve(null),
    ]);

    if (!explanationResult) {
        throw new Error('No se pudo generar la explicación del clima.');
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + day);

    const result: WeatherAnalysisResult = {
      weather: weatherData,
      condition: condition,
      explanation: explanationResult.explanation,
      alternatives: alternativesResult?.alternativeTimes ?? null,
      hour: hour,
      date: targetDate.toISOString(),
      sport: sport,
    };

    if (userId) {
        try {
            await addDoc(collection(db, 'queries'), {
                ...result,
                userId: userId,
                createdAt: serverTimestamp()
            });
        } catch (dbError) {
            console.error("Error writing to Firestore: ", dbError);
            // We don't re-throw the error, as the main function (weather analysis) was successful.
            // We just log it for debugging.
        }
    }


    return result;
  } catch (error) {
    console.error('Error in getWeatherAnalysis:', error);
    if (error instanceof Error) {
        throw new Error(`Ocurrió un error al analizar las condiciones climáticas: ${error.message}`);
    }
    throw new Error('Ocurrió un error al analizar las condiciones climáticas.');
  }
}
