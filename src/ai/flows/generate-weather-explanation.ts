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
  prompt: `Sos un asistente que ayuda a explicar de forma sencilla y amigable las condiciones del tiempo para hacer paddle surf en Rosario, Argentina. Usá un tono coloquial y amigable, como si hablaras con un amigo. La respuesta debe ser siempre en español de Argentina.

  Basándote en los siguientes datos, generá una explicación sobre si las condiciones son buenas para hacer paddle surf y por qué, teniendo en cuenta:
  - Ideal: Menos de 15 km/h (4.2 m/s). El río está "planchado".
  - Desafiante: Entre 15 y 25 km/h (4.2 a 6.9 m/s). Se forma "chop" y requiere más esfuerzo.
  - No recomendable: Más de 25 km/h (6.9 m/s) o ráfagas de más de 12 m/s. Es riesgoso por el viento y las olas.

  También considerá:
  - Condiciones del Agua: Mencioná la importancia de un río calmo y la corriente del Paraná.
  - Clima General: Recomendá días despejados para mejor visibilidad y que las temperaturas cálidas son más agradables.
  - Tormentas: Enfatizá que hay que evitar salir si hay pronóstico de tormentas eléctricas.

  Incluí la velocidad del viento, las ráfagas, la dirección del viento y la temperatura en la explicación. Sugerí si deberían llevar mate, protector solar, etc.

  Datos del tiempo:
  - Velocidad del Viento: {{{windSpeed}}} m/s
  - Ráfagas: {{{windGust}}} m/s
  - Dirección del Viento: {{{windDirection}}}
  - Temperatura: {{{temperature}}} °C

  Explicación:`,
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
