'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a human-friendly explanation of the weather conditions for rowing.
 *
 * - generateWeatherExplanation - A function that takes weather data as input and returns a natural language explanation.
 * - WeatherExplanationInput - The input type for the generateWeatherExplanation function.
 * - WeatherExplanationOutput - The return type for the generateWeatherExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherExplanationInputSchema = z.object({
  windSpeed: z.number().describe('The current wind speed in meters per second.'),
  windGust: z.number().describe('The current wind gust in meters per second.'),
  windDirection: z.string().describe('The current wind direction in degrees.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
});
export type WeatherExplanationInput = z.infer<typeof WeatherExplanationInputSchema>;

const WeatherExplanationOutputSchema = z.object({
  explanation: z.string().describe('A human-friendly explanation of the weather conditions for paddle surfing.'),
});
export type WeatherExplanationOutput = z.infer<typeof WeatherExplanationOutputSchema>;

export async function generateWeatherExplanation(input: WeatherExplanationInput): Promise<WeatherExplanationOutput> {
  return generateWeatherExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherExplanationPrompt',
  input: {schema: WeatherExplanationInputSchema},
  output: {schema: WeatherExplanationOutputSchema},
  prompt: `You are a helpful assistant that provides concise, human-friendly explanations of weather conditions for paddle surfing in Rosario, Argentina. Use a colloquial and friendly tone, as if speaking to a friend.

  Based on the following weather data, generate an explanation of whether the conditions are good for paddle surfing, and why, taking into account:
  - Ideal: wind_speed < 4.2 m/s (less than 15 km/h). River is flat.
  - Challenging: 4.2 ≤ wind_speed < 6.9 m/s (between 15 and 25 km/h). Some chop, more effort required.
  - Not Recommended: wind_speed ≥ 6.9 m/s (more than 25 km/h) or gust > 12 m/s. Risky due to wind and waves.

  Also consider:
  - Water Conditions: Mention the importance of a calm river and the Paraná river current.
  - General Weather: Recommend clear, sunny days for visibility. Mention that warm temperatures are more pleasant.
  - Storms: Emphasize avoiding paddle surfing if there's any forecast of electrical storms.

  Include the wind speed, gusts, wind direction, and temperature in the explanation. Suggest if they should bring mate, sunscreen, etc.

  Weather Data:
  - Wind Speed: {{{windSpeed}}} m/s
  - Wind Gusts: {{{windGust}}} m/s
  - Wind Direction: {{{windDirection}}}
  - Temperature: {{{temperature}}} °C

  Explanation:`,
});

const generateWeatherExplanationFlow = ai.defineFlow(
  {
    name: 'generateWeatherExplanationFlow',
    inputSchema: WeatherExplanationInputSchema,
    outputSchema: WeatherExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
