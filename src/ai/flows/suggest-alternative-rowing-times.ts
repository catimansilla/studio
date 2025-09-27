'use server';
/**
 * @fileOverview Suggests alternative rowing times based on weather conditions.
 *
 * - suggestAlternativeRowingTimes - A function that suggests alternative rowing times.
 * - SuggestAlternativeRowingTimesInput - The input type for the suggestAlternativeRowingTimes function.
 * - SuggestAlternativeRowingTimesOutput - The return type for the suggestAlternativeRowingTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeRowingTimesInputSchema = z.object({
  windSpeed: z.number().describe('The current wind speed in m/s.'),
  gust: z.number().describe('The current wind gust in m/s.'),
  windDirection: z.number().describe('The current wind direction in degrees.'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  currentTime: z.string().describe('The time the user initially wants to row.'),
});
export type SuggestAlternativeRowingTimesInput = z.infer<typeof SuggestAlternativeRowingTimesInputSchema>;

const SuggestAlternativeRowingTimesOutputSchema = z.object({
  alternativeTimes: z.string().describe('Suggested alternative times for rowing.'),
});
export type SuggestAlternativeRowingTimesOutput = z.infer<typeof SuggestAlternativeRowingTimesOutputSchema>;

export async function suggestAlternativeRowingTimes(input: SuggestAlternativeRowingTimesInput): Promise<SuggestAlternativeRowingTimesOutput> {
  return suggestAlternativeRowingTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeRowingTimesPrompt',
  input: {schema: SuggestAlternativeRowingTimesInputSchema},
  output: {schema: SuggestAlternativeRowingTimesOutputSchema},
  prompt: `El usuario quiere salir a remar a las {{currentTime}}, pero las condiciones actuales son: velocidad del viento de {{windSpeed}} m/s, ráfagas de hasta {{gust}} m/s, dirección del viento de {{windDirection}} grados y una temperatura de {{temperature}} grados Celsius.\n\nSugerí horarios alternativos para más tarde o para los próximos días en los que las condiciones podrían ser mejores, con menos viento. Hablá en un tono amigable y coloquial, en español de Argentina. Sé breve y directo.`,
});

const suggestAlternativeRowingTimesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeRowingTimesFlow',
    inputSchema: SuggestAlternativeRowingTimesInputSchema,
    outputSchema: SuggestAlternativeRowingTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
