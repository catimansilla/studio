import { BridgeIcon } from '@/components/icons';
import WeatherChecker from '@/components/weather-checker';
import { Card } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <BridgeIcon className="h-10 w-10 text-primary" />
            <h1 className="font-headline text-xl font-semibold tracking-tight text-foreground">
              Rosario <span className="text-primary">RemAIr</span>
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <WeatherChecker />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t">
        <div className="container mx-auto flex h-14 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            Desarrollado con ❤️ para lxs remerxs de la mejor ciudad del mundo, Rosario.
          </p>
        </div>
      </footer>
    </div>
  );
}
