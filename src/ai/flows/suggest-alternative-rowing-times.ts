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
  windDirection: z.string().describe('The current wind direction.'),
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
  prompt: `The user wants to row at {{currentTime}}, but the current wind speed is {{windSpeed}} m/s, with gusts up to {{gust}} m/s, wind direction is {{windDirection}}, and the temperature is {{temperature}} degrees Celsius.\n\nSuggest alternative times when the conditions might be better for rowing in a conversational, friendly tone. Focus on times with lower wind speeds. Be brief.`,
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
