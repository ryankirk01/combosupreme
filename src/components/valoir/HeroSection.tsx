import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';

type HeroSectionProps = {
  onStart: () => void;
};

export default function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 max-w-3xl animate-fade-in-up">
      
      <p className="text-sm text-foreground/60 mb-6">
        🧠 A forma como você é visto muda com pequenos detalhes. Esse é o mais importante.
      </p>

      <h1 className="font-headline text-5xl md:text-7xl text-primary tracking-wider text-shadow-gold">
        ⚔️ DESAFIO DOMINANTE SUPREME
      </h1>
      
      <p className="mt-4 font-headline text-xl md:text-2xl text-foreground/80 tracking-wider">
        Você é só mais um... ou está pronto para ser notado?
      </p>

      <p className="mt-6 text-base md:text-lg max-w-xl text-foreground/90">
        Você tem <span className="font-bold text-primary">3 minutos</span> para provar que é digno de respeito.
        Desbloqueie o <span className="font-bold">COMBO SUPREME</span> e entre para a elite por apenas <span className="font-bold text-primary">R$47</span>.
        Sua imagem muda agora.
      </p>
      
      <div className="my-8 flex flex-col items-center gap-2">
        <span className="text-foreground/70 text-sm">⏳ A contagem começou...</span>
        <div className="flex items-center gap-4 font-headline tracking-widest text-base md:text-lg">
          <span className="text-foreground/80">TEMPO RESTANTE:</span>
          <CountdownTimer 
            initialMinutes={3} 
            onComplete={onStart} 
            className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-primary bg-black/30 px-3 py-1 rounded-md border border-primary/20" 
          />
        </div>
      </div>

      <Button 
        onClick={onStart} 
        size="lg" 
        className="font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 transition-all duration-300 hover:scale-105 active:scale-100 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 animate-pulse-glow shine-effect"
      >
        [ SIM, EU ACEITO O DESAFIO ]
      </Button>
    </div>
  );
}
