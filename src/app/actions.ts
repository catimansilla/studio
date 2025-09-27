'use server';

import { generateWeatherExplanation } from '@/ai/flows/generate-weather-explanation';
import { suggestAlternativeRowingTimes } from '@/ai/flows/suggest-alternative-rowing-times';
import type { WeatherAnalysisResult, RowingCondition } from '@/lib/types';

const ROSARIO_LAT = -32.95;
const ROSARIO_LON = -60.64;

export async function getWeatherAnalysis(
  hour: number
): Promise<WeatherAnalysisResult> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ROSARIO_LAT}&longitude=${ROSARIO_LON}&hourly=temperature_2m,wind_speed_10m,wind_gusts_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto`;
    
    // Cache for 1 hour to avoid hitting the API on every request
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) {
      console.error('API Error:', response.statusText);
      throw new Error('No se pudieron obtener los datos meteorológicos.');
    }

    const data = await response.json();
    
    if (!data || !data.hourly || !data.hourly.time || data.hourly.time.length <= hour) {
      throw new Error('Datos meteorológicos inválidos o incompletos recibidos.');
    }

    const weatherData = {
      temperature: Math.round(data.hourly.temperature_2m[hour]),
      windSpeed: data.hourly.wind_speed_10m[hour],
      windGust: data.hourly.wind_gusts_10m[hour],
      windDirection: data.hourly.wind_direction_10m[hour],
    };

    let condition: RowingCondition;
    if (weatherData.windSpeed >= 10 || weatherData.windGust > 12) {
      condition = 'Not Suitable';
    } else if (weatherData.windSpeed >= 5) {
      condition = 'Caution';
    } else {
      condition = 'Optimal';
    }

    const [explanationResult, alternativesResult] = await Promise.all([
      generateWeatherExplanation({
        ...weatherData,
        windDirection: String(weatherData.windDirection),
      }),
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

    return {
      weather: weatherData,
      condition: condition,
      explanation: explanationResult.explanation,
      alternatives: alternativesResult?.alternativeTimes ?? null,
      hour: hour,
    };
  } catch (error) {
    console.error('Error in getWeatherAnalysis:', error);
    if (error instanceof Error) {
        throw new Error(`Ocurrió un error al analizar las condiciones climáticas: ${error.message}`);
    }
    throw new Error('Ocurrió un error al analizar las condiciones climáticas.');
  }
}
