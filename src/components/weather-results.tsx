'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Wind,
  Thermometer,
  Waves,
  Compass,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Lightbulb,
  Sailboat,
} from 'lucide-react';
import type { WeatherAnalysisResult, RowingCondition } from '@/lib/types';

interface WeatherResultsProps {
  result: WeatherAnalysisResult;
}

const paddleSurfConfig: Record<
  RowingCondition,
  { text: string; className: string; icon: React.ElementType }
> = {
  Optimal: {
    text: 'Óptimo',
    className: 'bg-green-600/80 hover:bg-green-600/90 text-white border-green-500',
    icon: CheckCircle2,
  },
  Caution: {
    text: 'Precaución',
    className: 'bg-yellow-500/80 hover:bg-yellow-500/90 text-yellow-950 border-yellow-400',
    icon: AlertTriangle,
  },
  'Not Suitable': {
    text: 'No Apto',
    className: 'bg-red-600/80 hover:bg-red-600/90 text-white border-red-500',
    icon: XCircle,
  },
};

const windSurfConfig: Record<
  RowingCondition,
  { text: string; className: string; icon: React.ElementType }
> = {
  Optimal: {
    text: 'Ideal',
    className: 'bg-blue-600/80 hover:bg-blue-600/90 text-white border-blue-500',
    icon: Sailboat,
  },
  Caution: {
    text: 'Principiantes',
    className: 'bg-green-600/80 hover:bg-green-600/90 text-white border-green-500',
    icon: CheckCircle2,
  },
  'Not Suitable': {
    text: 'Poco Viento',
    className: 'bg-gray-500/80 hover:bg-gray-500/90 text-white border-gray-400',
    icon: XCircle,
  },
};


function windDirectionToCardinal(degrees: number) {
  const cardinals = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return cardinals[index];
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();

  if (isToday) {
    return 'hoy';
  }
  if (isTomorrow) {
    return 'mañana';
  }
  return date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric' });
};


export default function WeatherResults({ result }: WeatherResultsProps) {
  const { weather, condition, explanation, alternatives, hour, date, sport } = result;
  
  const isPaddleSurf = sport === 'paddlesurf';
  const conditionConfig = isPaddleSurf ? paddleSurfConfig : windSurfConfig;

  const config = conditionConfig[condition];
  const Icon = config.icon;
  const formattedDate = formatDate(date);
  const sportName = isPaddleSurf ? 'Paddle Surf' : 'Windsurf';

  return (
    <div className="animate-in fade-in-50 duration-500 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h3 className="text-lg font-medium text-muted-foreground">Condiciones para {sportName} {formattedDate} a las {hour}:00 hs</h3>
        <Badge className={`text-lg px-4 py-2 rounded-full shadow-md ${config.className}`}>
          <Icon className="mr-2 h-5 w-5" />
          {config.text}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <WeatherMetric
          icon={Thermometer}
          label="Temperatura"
          value={`${weather.temperature}°C`}
        />
        <WeatherMetric
          icon={Wind}
          label="Viento"
          value={`${weather.windSpeed.toFixed(1)} m/s`}
        />
        <WeatherMetric
          icon={Waves}
          label="Ráfagas"
          value={`${weather.windGust.toFixed(1)} m/s`}
        />
        <WeatherMetric
          icon={Compass}
          label="Dirección"
          value={`${windDirectionToCardinal(weather.windDirection)} (${weather.windDirection}°)`}
        />
      </div>

      <Card className="bg-card/50">
        <CardHeader className="flex-row items-center gap-3 space-y-0">
          <Sparkles className="h-6 w-6 text-primary" />
          <CardTitle>Recomendación:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground/90">{explanation}</p>
        </CardContent>
      </Card>
      
      {alternatives && (
        <Card className="bg-accent/20 border-accent/50">
          <CardHeader className="flex-row items-center gap-3 space-y-0">
            <Lightbulb className="h-6 w-6 text-accent-foreground" />
            <CardTitle>Sugerencia</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">{alternatives}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface WeatherMetricProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function WeatherMetric({ icon: Icon, label, value }: WeatherMetricProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-4 text-center">
      <Icon className="h-8 w-8 mb-2 text-primary" />
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </Card>
  );
}
