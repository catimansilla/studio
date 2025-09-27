import { RowerIcon } from '@/components/icons';
import WeatherChecker from '@/components/weather-checker';
import WindguruEmbed from '@/components/windguru-embed';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <RowerIcon className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-xl font-semibold tracking-tight text-foreground">
              Rosario <span className="text-primary">RemAIr</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <WeatherChecker />
            </div>
            <div className="lg:col-span-1">
              <WindguruEmbed />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t">
        <div className="container mx-auto flex h-14 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            Desarrollado con ❤️ para los remeros de Rosario.
          </p>
        </div>
      </footer>
    </div>
  );
}
