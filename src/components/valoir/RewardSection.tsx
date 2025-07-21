import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import ProductImage from './ProductImage';

type RewardSectionProps = {
  score: number;
  onProceed: () => void;
};

export default function RewardSection({ score, onProceed }: RewardSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-4 md:p-8 rounded-xl bg-card/80 backdrop-blur-sm border border-primary/20 max-w-4xl animate-fade-in-up">
      <h1 className="font-headline text-5xl md:text-7xl text-primary tracking-wider">
        🏆 PARABÉNS, GUERREIRO.
      </h1>
      <p className="mt-2 text-2xl font-headline text-foreground/90">Sua Pontuação de Presença: <span className="text-primary">{score}/100</span></p>
      <p className="mt-4 text-lg md:text-xl max-w-2xl text-foreground/80">
        Você desbloqueou o nível SUPREMO. Agora pode garantir o Combo VALOIR (Relógio + Corrente) por um preço exclusivo.
      </p>

      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl">
        <ProductImage src="https://placehold.co/400x400" alt="VALOIR Watch" width={400} height={400} hint="luxury watch" />
        <ProductImage src="https://placehold.co/400x400" alt="VALOIR Chain" width={400} height={400} hint="cuban chain" />
      </div>

      <div className="flex flex-col items-center gap-4 bg-card/50 p-6 rounded-lg border border-primary/10">
        <p className="font-headline text-2xl text-foreground/70">OFERTA DESBLOQUEADA</p>
        <div className="flex items-baseline gap-4">
          <span className="text-3xl text-muted-foreground line-through">R$379</span>
          <span className="font-headline text-6xl text-primary">R$67</span>
        </div>
        <p className="text-sm text-amber-300/80">Oferta desbloqueada apenas uma vez.</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-foreground/80 font-headline tracking-widest">A OFERTA TERMINA EM:</span>
          <CountdownTimer initialMinutes={5} onComplete={() => {}} className="font-mono text-2xl font-bold tracking-widest text-primary" />
        </div>
        <Button onClick={onProceed} size="lg" className="font-headline text-2xl tracking-widest px-12 py-8 mt-4 transition-transform duration-300 hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30">
          GARANTIR MEU COMBO AGORA
        </Button>
      </div>
    </div>
  );
}
