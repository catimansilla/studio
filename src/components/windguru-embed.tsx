import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

export default function WindguruEmbed() {
  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="font-headline">Pronóstico Windguru</CardTitle>
        <CardDescription>Spot: Rosario, Río Paraná</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[3/4] overflow-hidden rounded-md border">
          <iframe
            src="https://www.windguru.cz/mapa/spot/221"
            className="h-full w-full"
            title="Windguru Rosario Forecast"
            loading="lazy"
          />
        </div>
      </CardContent>
    </Card>
  );
}
