import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import ProductImage from './ProductImage';
import { Gem } from 'lucide-react';

type RewardSectionProps = {
  score: number;
  onProceed: () => void;
};

export default function RewardSection({ score, onProceed }: RewardSectionProps) {
  const getStatus = (score: number) => {
    if (score > 45) return 'NÍVEL SUPREMO';
    if (score > 35) return 'NÍVEL DOMINANTE';
    return 'NÍVEL NOTÁVEL';
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 rounded-xl bg-card/80 backdrop-blur-sm border border-primary/20 max-w-4xl animate-fade-in-up">
      <div className="mb-4 inline-flex items-center justify-center gap-2 text-2xl font-bold text-primary bg-card/50 py-2 px-4 rounded-lg border border-primary/20">
        <Gem className="h-7 w-7" />
        <span>{getStatus(score)} ALCANÇADO!</span>
      </div>
      <h1 className="font-headline text-5xl md:text-7xl text-primary tracking-wider [text-shadow:0_0_20px_hsl(var(--primary)/0.6)]">
        🏆 OFERTA EXCLUSIVA DESBLOQUEADA
      </h1>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-foreground/80">
        Você provou seu valor e está pronto para o próximo nível. Agora pode garantir o Combo VALOIR (Relógio + Corrente) por um preço exclusivo.
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl">
        <ProductImage src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31c?q=80&w=800&h=800&auto=format&fit=crop" alt="VALOIR Watch" width={400} height={400} hint="luxury watch" />
        <ProductImage src="https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=800&h=800&auto=format&fit=crop" alt="VALOIR Chain" width={400} height={400} hint="cuban chain" />
      </div>

      <div className="flex flex-col items-center gap-4 bg-card/50 p-6 rounded-lg border border-primary/10">
        <p className="font-headline text-2xl text-foreground/70">OFERTA DESBLOQUEADA</p>
        <div className="flex items-baseline gap-4">
          <span className="text-3xl text-muted-foreground line-through">R$379</span>
          <span className="font-headline text-6xl text-primary">R$67</span>
        </div>
        <p className="text-sm text-amber-300/80">Oferta desbloqueada apenas uma vez.</p>
        <div className="mt-4 flex items-center gap-4 bg-background/50 px-4 py-2 rounded-md">
          <span className="text-foreground/80 font-headline tracking-widest">A OFERTA TERMINA EM:</span>
          <CountdownTimer initialMinutes={5} onComplete={() => {}} className="font-mono text-2xl font-bold tracking-widest text-primary" />
        </div>
        <Button onClick={onProceed} size="lg" className="font-headline text-2xl tracking-widest px-12 py-8 mt-4 transition-transform duration-300 hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
          FINALIZAR COMPRA
        </Button>
      </div>
    </div>
  );
}
