export type RowingCondition = 'Optimal' | 'Caution' | 'Not Suitable';

export type WeatherData = {
  temperature: number;
  windSpeed: number;
  windGust: number;
  windDirection: number;
};

export type WeatherAnalysisResult = {
  weather: WeatherData;
  condition: RowingCondition;
  explanation: string;
  alternatives: string | null;
  hour: number;
  date: string;
};
