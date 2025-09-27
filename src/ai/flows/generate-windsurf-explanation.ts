
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a human-friendly explanation of weather conditions for windsurfing.
 *
 * - generateWindsurfExplanation - A function that takes weather data as input and returns a natural language explanation for windsurfing.
 * - WindsurfExplanationInput - The input type for the generateWindsurfExplanation function.
 * - WindsurfExplanationOutput - The return type for the generateWindsurfExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WindsurfExplanationInputSchema = z.object({
  windSpeed: z.number().describe('The current wind speed in meters per second.'),
  windGust: z.number().describe('The current wind gust in meters per second.'),
  windDirection: z.string().describe('The current wind direction in degrees.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
});
export type WindsurfExplanationInput = z.infer<typeof WindsurfExplanationInputSchema>;

const WindsurfExplanationOutputSchema = z.object({
  explanation: z.string().describe('A human-friendly explanation of the weather conditions for windsurfing.'),
});
export type WindsurfExplanationOutput = z.infer<typeof WindsurfExplanationOutputSchema>;

export async function generateWindsurfExplanation(input: WindsurfExplanationInput): Promise<WindsurfExplanationOutput> {
  return generateWindsurfExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'windsurfExplanationPrompt',
  input: {schema: WindsurfExplanationInputSchema},
  output: {schema: WindsurfExplanationOutputSchema},
  prompt: `You are a helpful assistant and an expert windsurfer. Provide concise, human-friendly explanations of weather conditions for windsurfing in Rosario, Argentina. Use a colloquial and friendly tone.

  Based on the following weather data, generate an explanation of whether the conditions are good for windsurfing and for what skill level, taking into account:
  - Beginners: 2.2 to 4.4 m/s (8-16 km/h). Enough to get going without being overpowered.
  - Intermediates: 7.8 to 10.3 m/s (28-37 km/h). Good for planing and more advanced maneuvers.
  - Advanced: > 10.3 m/s (> 37 km/h). Strong wind for experienced riders seeking speed and jumps.
  - Not Recommended: < 2.2 m/s. Not enough wind.

  Also consider:
  - Wind Direction: Emphasize the importance of wind direction. On-shore (towards the coast) or Cross-shore (parallel) are safest. Off-shore (away from the coast) is dangerous and should be avoided by beginners and intermediates.
  - Water Conditions: Mention that wind creates chop, which can be fun for experienced riders but challenging for beginners.
  - Storms: Strongly advise against windsurfing if there is any forecast of electrical storms.

  Include the wind speed, gusts, wind direction, and temperature in the explanation.

  Weather Data:
  - Wind Speed: {{{windSpeed}}} m/s
  - Wind Gusts: {{{windGust}}} m/s
  - Wind Direction: {{{windDirection}}}
  - Temperature: {{{temperature}}} °C

  Explanation:`,
});

const generateWindsurfExplanationFlow = ai.defineFlow(
  {
    name: 'generateWindsurfExplanationFlow',
    inputSchema: WindsurfExplanationInputSchema,
    outputSchema: WindsurfExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
