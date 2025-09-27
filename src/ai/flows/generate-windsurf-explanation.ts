
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
  prompt: `Sos un asistente experto en windsurf. Explicá de forma sencilla y amigable las condiciones del tiempo para hacer windsurf en Rosario, Argentina. Usá un tono coloquial y la respuesta debe ser siempre en español de Argentina.

  Basándote en los siguientes datos, generá una explicación sobre si las condiciones son buenas para hacer windsurf y para qué nivel de experiencia, teniendo en cuenta:
  - Principiantes: 2.2 a 4.4 m/s (8-16 km/h). Ideal para arrancar sin que la vela te domine.
  - Intermedios: 7.8 a 10.3 m/s (28-37 km/h). Buen viento para planear y maniobras más avanzadas.
  - Avanzados: > 10.3 m/s (> 37 km/h). Viento fuerte para los que buscan velocidad y saltos.
  - No recomendable: < 2.2 m/s. No hay viento suficiente.

  También considerá:
  - Dirección del Viento: Remarcá la importancia de la dirección. "On-shore" (hacia la costa) o "Cross-shore" (paralelo) son las más seguras. "Off-shore" (hacia el río) es peligroso y debe ser evitado por principiantes e intermedios.
  - Condiciones del Agua: Mencioná que el viento genera "chop" (oleaje), que puede ser divertido para los más experimentados pero un desafío para los que empiezan.
  - Tormentas: Aconsejá firmemente no salir a navegar si hay pronóstico de tormentas eléctricas.

  Incluí la velocidad del viento, las ráfagas, la dirección del viento y la temperatura en la explicación.

  Datos del tiempo:
  - Velocidad del Viento: {{{windSpeed}}} m/s
  - Ráfagas: {{{windGust}}} m/s
  - Dirección del Viento: {{{windDirection}}}
  - Temperatura: {{{temperature}}} °C

  Explicación:`,
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
