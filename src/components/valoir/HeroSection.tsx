import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';

type HeroSectionProps = {
  onStart: () => void;
};

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 max-w-2xl animate-fade-in-up">
      <h1 className="font-headline text-5xl md:text-7xl text-primary tracking-wider [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
        ⚔️ DESAFIO DOMINANTE SUPREME
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-lg text-foreground/80">
        Você tem 3 minutos para provar que está pronto para ostentar respeito. Desbloqueie o Combo VALOIR por apenas <span className="font-bold text-primary">R$67</span>.
      </p>
      <div className="my-8 flex items-center gap-4">
        <span className="text-foreground/80 font-headline tracking-widest">TEMPO RESTANTE:</span>
        <CountdownTimer initialMinutes={3} onComplete={onStart} className="font-mono text-2xl font-bold tracking-widest text-primary" />
      </div>
      <Button onClick={onStart} size="lg" className="font-headline text-2xl tracking-widest px-12 py-8 transition-transform duration-300 hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
        ENTRAR NO DESAFIO
      </Button>
    </div>
  );
}
