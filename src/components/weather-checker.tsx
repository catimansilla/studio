'use client';

import { useState, useEffect, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getWeatherAnalysis } from '@/app/actions';
import type { WeatherAnalysisResult } from '@/lib/types';
import WeatherResults from './weather-results';
import { Skeleton } from './ui/skeleton';

const getDayOptions = () => {
  const options = [];
  const today = new Date();
  const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const label = i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : `${weekdays[date.getDay()]} ${date.getDate()}`;
    options.push({ value: i, label: label });
  }
  return options;
};


export default function WeatherChecker() {
  const [selectedDay, setSelectedDay] = useState<number | undefined>(0);
  const [selectedHour, setSelectedHour] = useState<number | undefined>(undefined);
  const [analysisResult, setAnalysisResult] = useState<WeatherAnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const dayOptions = getDayOptions();

  useEffect(() => {
    // Set default hour to current hour on client mount to avoid hydration mismatch
    setSelectedHour(new Date().getHours());
  }, []);

  const handleCheckWeather = () => {
    if (selectedDay === undefined || selectedHour === undefined) {
      toast({
        title: 'Error',
        description: 'Por favor, seleccione un día y una hora.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      try {
        const result = await getWeatherAnalysis(selectedDay, selectedHour);
        setAnalysisResult(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
        toast({
          title: 'Error de Análisis',
          description: errorMessage,
          variant: 'destructive',
        });
        setAnalysisResult(null);
      }
    });
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Chequear Condiciones</CardTitle>
        <CardDescription>Seleccioná el día y la hora en la que planeas remar para ver el pronóstico.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
           <div className="grid grid-cols-2 flex-grow gap-4">
            <div>
              <label htmlFor="day-select" className="mb-2 block text-sm font-medium text-foreground">
                Día
              </label>
               {selectedDay !== undefined ? (
                <Select
                  value={String(selectedDay)}
                  onValueChange={(value) => setSelectedDay(Number(value))}
                >
                  <SelectTrigger id="day-select" className="w-full">
                    <SelectValue placeholder="Seleccionar día..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dayOptions.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </div>
            <div>
              <label htmlFor="time-select" className="mb-2 block text-sm font-medium text-foreground">
                Hora de Salida
              </label>
              {selectedHour !== undefined ? (
                <Select
                  value={String(selectedHour)}
                  onValueChange={(value) => setSelectedHour(Number(value))}
                >
                  <SelectTrigger id="time-select" className="w-full">
                    <SelectValue placeholder="Seleccionar hora..." />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={String(hour)}>
                        {String(hour).padStart(2, '0')}:00 hs
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                  <Skeleton className="h-10 w-full" />
              )}
            </div>
          </div>
          <Button
            onClick={handleCheckWeather}
            disabled={isPending || selectedHour === undefined || selectedDay === undefined}
            className="w-full sm:w-auto"
            size="lg"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analizando...
              </>
            ) : (
              'Verificar'
            )}
          </Button>
        </div>

        <div className="mt-8">
          {isPending ? (
            <WeatherResultsSkeleton />
          ) : analysisResult ? (
            <WeatherResults result={analysisResult} />
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>Seleccioná un día y una hora y presioná "Verificar" para ver las condiciones.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherResultsSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-12 w-1/3 mx-auto" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-28 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />
             <Skeleton className="h-20 w-full" />
        </div>
    )
}
