'use client';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { playPurchaseSound } from '@/lib/utils';
import { CheckCircle, Gift, Loader2, ShieldCheck, Sparkles, Star, ChevronDown, AlarmClock, Flame } from 'lucide-react';
import { diagnoseStyle } from '@/ai/flows/diagnose-style-flow';
import ProductImage from './ProductImage';
import ArtisanWorkshop from './ArtisanWorkshop';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import VideoPlayer from './VideoPlayer';
import { Progress } from '../ui/progress';


const testimonials = [
  { name: 'Ricardo A.', text: 'Qualidade impressionante, superou minhas expectativas. O relógio é robusto e a corrente tem um brilho único. A entrega foi rápida e a embalagem impecável.', stars: 5 },
  { name: 'Jorge M.', text: 'O combo mudou meu visual. Todo lugar que eu vou alguém pergunta. Me sinto mais confiante. Valeu cada centavo.', stars: 5 },
  { name: 'Fernando L.', text: 'Chegou muito rápido! A qualidade do material é visível. Pesado, brilhante e exatamente como na foto. Comprarei novamente.', stars: 5 }
];

const purchaseNotifications = [
  'Lucas de São Paulo, SP',
  'Mariana de Rio de Janeiro, RJ',
  'Pedro de Belo Horizonte, MG',
  'Ana de Salvador, BA',
  'Carlos de Brasília, DF',
  'Beatriz de Curitiba, PR',
];

const StockCounter = () => {
  const [stock, setStock] = useState(23);
  const totalStock = 30;

  useEffect(() => {
    const decreaseStock = () => {
      setStock(prevStock => {
        const newStock = prevStock - Math.floor(Math.random() * 2) - 1;
        return newStock > 5 ? newStock : 5; // Never go below 5
      });
    };

    const intervalId = setInterval(decreaseStock, Math.random() * (15000 - 8000) + 8000); // every 8-15 seconds

    return () => clearInterval(intervalId);
  }, []);

  const stockPercentage = (stock / totalStock) * 100;

  return (
    <div className="mt-6 w-full max-w-sm p-3 bg-card/80 border border-destructive/30 rounded-lg shadow-lg">
        <div className="flex justify-between items-center text-sm font-semibold mb-1">
            <span className='text-destructive-foreground flex items-center gap-1'><Flame className='w-4 h-4 text-destructive' /> Estoque Acabando</span>
            <span className='text-destructive font-bold'>{stock} restantes</span>
        </div>
      <Progress value={stockPercentage} className="h-3 bg-destructive/20 [&>div]:bg-destructive" />
    </div>
  );
};

type SalesPageProps = {
  quizAnswers: string[];
  onCheckout: () => void;
}

export default function SalesPage({ quizAnswers, onCheckout }: SalesPageProps) {
  const [isDiscountClaimed, setIsDiscountClaimed] = useState(false);
  const [notification, setNotification] = useState<{ name: string, key: number } | null>(null);
  const [styleDiagnosis, setStyleDiagnosis] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(true);

  const { ref: workshopRef, inView: workshopInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    async function getDiagnosis() {
      const fallbackDiagnosis = "Seu estilo é único e suas escolhas mostram que você está pronto para um novo nível de presença. O COMBO Dominante Supreme™ foi feito para pessoas como você.";

      if (quizAnswers.length > 0) {
        try {
          const result = await diagnoseStyle({ answers: quizAnswers });
          setStyleDiagnosis(result.diagnosis);
        } catch (error) {
          console.error("Erro ao obter diagnóstico de estilo:", error);
          setStyleDiagnosis(fallbackDiagnosis);
        } finally {
          setTimeout(() => setIsDiagnosing(false), 1500);
        }
      } else {
        setIsDiagnosing(false);
        setStyleDiagnosis(fallbackDiagnosis);
      }
    }
    getDiagnosis();
  }, [quizAnswers]);


  const handleClaimDiscount = () => {
    playPurchaseSound();
    setIsDiscountClaimed(true);
  };
  
  const handleProceedToCheckout = () => {
    playPurchaseSound();
    onCheckout();
  };

  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = purchaseNotifications[Math.floor(Math.random() * purchaseNotifications.length)];
      setNotification({ name: randomName, key: Date.now() });
    };

    const intervalId = setInterval(showRandomNotification, 12000);
    const initialTimeout = setTimeout(showRandomNotification, 4000);
    
    return () => {
      clearInterval(intervalId)
      clearTimeout(initialTimeout);
    };
  }, []);

  if (isDiagnosing) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh] animate-fade-in-up">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="font-headline text-3xl text-primary tracking-widest">Analisando seu perfil dominante...</h2>
        <p className="text-foreground/80 mt-2">Estamos preparando uma oferta exclusiva para você.</p>
      </div>
    )
  }

  return (
    <div className={cn("w-full bg-background text-foreground animate-fade-in-up", "animate-background-aurora")}>
        <style jsx>{`
            .rays-container {
              position: absolute;
              top: 50%;
              left: 50%;
              width: 1px;
              height: 1px;
              animation: spin 30s linear infinite;
              transform: translate(-50%, -50%);
            }

            .rays-container-2 {
              animation: spin-reverse 40s linear infinite;
            }

            @keyframes spin {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes spin-reverse {
                from { transform: translate(-50%, -50%) rotate(360deg); }
                to { transform: translate(-50%, -50%) rotate(0deg); }
            }

            .ray {
              position: absolute;
              left: 0;
              top: 0;
              width: 2px;
              height: 500px; /* Increased height for bigger effect */
              background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.2), transparent);
              transform-origin: 0 0;
            }
            
            .rays-container-2 .ray {
              height: 550px; /* Increased height for bigger effect */
              background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.15), transparent);
            }
        `}</style>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center p-4 text-center">
          <h1 className="font-headline text-xl md:text-3xl text-primary tracking-widest">COMBO Dominante Supreme™</h1>
          <p className="hidden md:block font-body text-lg text-foreground/80">O Status Que Você Merece.</p>
        </div>
      </header>
      
      {notification && (
        <div 
          key={notification.key}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card border border-primary/30 p-3 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-3 animate-notification-float"
        >
           <CheckCircle className="text-primary h-5 w-5"/>
           <p className="text-sm">{notification.name} acabou de garantir o COMBO!</p>
        </div>
      )}

      <main className="container mx-auto px-4">
        
        {styleDiagnosis && (
          <section className="py-12 text-center">
            <Card className="bg-card/50 border border-primary/20 p-6 max-w-3xl mx-auto shadow-lg shadow-primary/10 animate-fade-in-up">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
              <h2 className="font-headline text-2xl text-primary tracking-wider mb-2">Seu Diagnóstico de Estilo:</h2>
              <p className="text-lg text-foreground/90 italic">"{styleDiagnosis}"</p>
            </Card>
          </section>
        )}

        <section className="relative text-center pt-16 md:pt-20 pb-12 flex flex-col items-center justify-center">
          <div className="relative flex justify-center items-center w-full max-w-2xl mx-auto">
            <div className="absolute inset-0 z-0 opacity-70 blur-sm">
                <div className="rays-container">
                    {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`r1-${i}`} className="ray" style={{ transform: `rotate(${i * 30}deg)` }} />
                    ))}
                </div>
                <div className="rays-container rays-container-2">
                    {Array.from({ length: 12 }).map((_, i) => (
                    <div key={`r2-${i}`} className="ray" style={{ transform: `rotate(${i * 30 + 15}deg)` }} />
                    ))}
                </div>
            </div>
            <VideoPlayer src="https://i.imgur.com/s3q6b3e.mp4" className="z-10" />
          </div>


          <h2 className="font-headline text-4xl md:text-6xl lg:text-7xl text-foreground tracking-wider text-shadow-gold mt-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Sua Imagem de Poder, Forjada em Aço e Ouro.
          </h2>
          <p className="font-body text-lg md:text-xl lg:text-2xl mt-4 text-foreground/80 max-w-2xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>De <span className="line-through">R$299</span> por apenas <span className="text-primary font-bold">R$47</span>. Pague com PIX e receba o respeito que você merece.</p>
          <div className="my-8 bg-card/50 border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p className="text-sm text-primary/80">OFERTA EXCLUSIVA TERMINA EM:</p>
            <CountdownTimer initialMinutes={15} className="font-mono text-3xl md:text-4xl text-primary font-bold" />
          </div>
          <Button onClick={handleProceedToCheckout} size="lg" className="w-full max-w-md md:max-w-lg font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold animate-fade-in-up" style={{animationDelay: '0.8s'}}>
            FORJAR MINHA IMAGEM DE PODER
          </Button>
          <div className="animate-fade-in-up" style={{animationDelay: '1s'}}>
            <StockCounter />
          </div>
           <p className="text-xs mt-4 text-foreground/60 animate-fade-in-up" style={{animationDelay: '1.2s'}}>Compra 100% segura. Vagas limitadas para essa condição.</p>
           <div className="flex w-full justify-center mt-8 animate-fade-in-up" style={{animationDelay: '1.4s'}}>
              <div className="flex flex-col items-center gap-1 text-foreground/60">
                <span className="text-xs">Role para ver mais</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
              </div>
           </div>
        </section>
        
        <section className="py-16 md:py-20 text-center" ref={workshopRef}>
            <h2 className="text-center font-headline text-4xl md:text-5xl text-foreground mb-4 animate-fade-in-up">A Forja do Respeito</h2>
            <p className="text-center text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Sua imagem atual é apenas o material bruto. Assista à criação da sua nova imagem de poder.</p>
            <Card className="max-w-lg mx-auto bg-card/80 border border-primary/30 p-2 group shadow-2xl shadow-primary/20 transition-shadow duration-300 animate-fade-in-up shine-effect" style={{ animationDelay: '400ms' }}>
                <ArtisanWorkshop
                    startAnimation={workshopInView}
                    finalImage="https://i.imgur.com/5jkszP7.png"
                    finalImageHint="watch chain"
                />
            </Card>
        </section>

        <section className="py-16 md:py-20">
           <h2 className="text-center font-headline text-4xl md:text-5xl text-foreground mb-4 animate-fade-in-up">A Ferramenta Definitiva para o Homem de Respeito</h2>
           <p className="text-center text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>O COMBO Dominante Supreme™ não é um acessório. É uma declaração. A peça que faltava para solidificar sua imagem de sucesso e autoridade.</p>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full h-auto mb-5 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <ProductImage
                src="https://i.imgur.com/cfbV6b0.png"
                alt="Relógio do COMBO Dominante Supreme™"
                width={600}
                height={600}
                hint="gold watch"
                className="hover:scale-105 transition-transform duration-300 w-full h-auto mb-5"
                />
            </div>
            <div className="text-center md:text-left animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h3 className="font-headline text-3xl md:text-4xl text-primary">⌚ Relógio VALOIR™</h3>
              <p className="mt-4 text-lg text-foreground/80">Um relógio marcante com pulseira de aço inoxidável, mostrador elegante e vidro resistente a riscos. Perfeito para quem quer se destacar com estilo e presença. Combina com qualquer ocasião, do casual ao sofisticado.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
             <div className="text-center md:text-right md:order-2 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h3 className="font-headline text-3xl md:text-4xl text-primary">🔗 Corrente VALOIR™</h3>
              <p className="mt-4 text-lg text-foreground/80">Corrente estilo cubana banhada a ouro 18K, com 5mm de espessura e acabamento premium. Brilho impressionante, feita para transmitir respeito, confiança e autoridade. Ideal para completar seu visual com atitude.</p>
            </div>
            <div className='md:order-1 animate-fade-in-up' style={{ animationDelay: '400ms' }}>
                <ProductImage
                src="https://i.imgur.com/LrEQVOb.jpeg"
                alt="Corrente do COMBO Dominante Supreme™"
                width={600}
                height={600}
                hint="gold chain man"
                className="hover:scale-105 transition-transform duration-300"
                />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 text-center animate-fade-in-up">
            <h2 className="font-headline text-4xl md:text-5xl text-foreground">Sua Oportunidade Única de Ascensão</h2>
            <p className="text-lg md:text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">Você provou seu potencial no desafio. Agora, reivindique sua recompensa.</p>
            <Card className="mt-8 max-w-2xl mx-auto bg-card/50 border-2 border-dashed border-primary/50 p-6 md:p-8">
                {!isDiscountClaimed ? (
                    <>
                        <p className="font-headline text-2xl text-primary">VOCÊ FOI SELECIONADO</p>
                        <p className="text-lg mt-2">Toque no presente e desbloqueie seu acesso VIP ao COMBO Dominante Supreme™.</p>
                        <button onClick={handleClaimDiscount} className="mt-6 animate-pulse-glow transition-transform hover:scale-105">
                           <Gift className="text-primary h-24 w-24 md:h-32 md:w-32"/>
                        </button>
                    </>
                ) : (
                    <div className="animate-fade-in-up">
                       <h3 className="font-headline text-2xl md:text-3xl text-primary">PARABÉNS! ACESSO LIBERADO.</h3>
                       <p className="text-lg md:text-xl mt-2">Você desbloqueou <span className="font-bold text-primary">84% DE DESCONTO</span>. Seu preço final é <span className="font-bold text-primary">R$47</span>.</p>
                       <p className="text-muted-foreground mt-2 text-sm">(Esta oferta é pessoal, intransferível e válida apenas agora)</p>
                       <Button onClick={handleProceedToCheckout} size="lg" className={cn(
                          "mt-8 font-headline tracking-widest animate-pulse-glow shadow-gold",
                          "text-lg px-6 py-5 md:text-xl md:px-10 md:py-7"
                       )}>
                           GARANTIR MEU DESCONTO E PODER
                       </Button>
                    </div>
                )}
            </Card>
        </section>

        <section className="py-16 md:py-20">
          <h2 className="text-center font-headline text-4xl md:text-5xl text-foreground mb-12 animate-fade-in-up">Quem Compra, Domina. Quem Espera, Assiste.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <Card key={index} className="bg-card/50 border-primary/20 p-6 text-center animate-fade-in-up" style={{ animationDelay: `${index * 150}ms`}}>
                <div className="flex text-primary justify-center mb-4">
                  {[...Array(item.stars)].map((_, i) => <Star key={i} className="fill-current h-5 w-5" />)}
                </div>
                <p className="text-foreground/80 italic">"{item.text}"</p>
                <h4 className="mt-4 font-bold text-lg text-primary">{item.name}</h4>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="py-16 md:py-20 animate-fade-in-up">
            <Card className="bg-card/50 border-2 border-primary/50 max-w-4xl mx-auto p-6 md:p-12 shadow-[0_0_30px_theme(colors.primary/0.2)]">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary">RISCO ZERO. RESPEITO TOTAL.</h2>
                        <p className="text-lg text-foreground/80 mt-4">Ou você sente o poder da transformação na sua imagem em 7 dias, ou nós devolvemos cada centavo. Sem perguntas, sem burocracia. O risco é 100% nosso.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <ShieldCheck className="h-24 w-24 text-primary" />
                         <p className="text-center font-bold text-xl">Sua Satisfação ou Seu Dinheiro de Volta.</p>
                    </div>
                </div>
            </Card>
        </section>

        <section className="text-center py-16 md:py-20 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-4 text-destructive animate-pulse">
              <AlarmClock className="h-10 w-10"/>
              <CountdownTimer initialMinutes={5} className="font-mono text-3xl md:text-4xl font-bold tracking-widest" />
              <AlarmClock className="h-10 w-10"/>
            </div>
            <h2 className="font-headline text-4xl md:text-5xl text-foreground">Sua Última Chance de Dominar.</h2>
            <p className="text-lg md:text-xl text-foreground/80 mt-2 max-w-2xl mx-auto">O tempo está se esgotando. Após esta página, o preço retorna para R$299. A decisão que define sua imagem é agora.</p>
            <Card className="max-w-xl mx-auto mt-8 p-6 md:p-8 bg-card/50 border-primary/20 shadow-lg shadow-primary/20">
                 <p className="text-lg">Receba o símbolo da sua nova fase em até 7 dias úteis.</p>
                 <div className="flex justify-center items-center gap-4 my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" className="text-foreground/70"><path fill="currentColor" d="M140 160a12 12 0 1 1-12-12a12 12 0 0 1 12 12m-60-12a12 12 0 1 0-12 12a12 12 0 0 0 12-12m108 12a12 12 0 1 0 12 12a12 12 0 0 0-12-12m-48-68.55V88a12 12 0 0 0 24 0V61.87a44 44 0 0 1 0-27.74V24a12 12 0 0 0-24 0v10.13a44 44 0 0 1 0 27.74m-64-27.74V24a12 12 0 0 0-24 0v10.13a44 44 0 0 0 0 27.74V88a12 12 0 0 0 24 0V65.87a44 44 0 0 0 0-27.74M220 38a58 58 0 0 0-32.46-52.1a12 12 0 0 0-11.08 21.8A34 34 0 0 1 204 64v3.45a60 60 0 0 0-29.4-18.06a12 12 0 0 0-9.2 22.52a36 36 0 0 1 0 32.18a12 12 0 0 0 9.2 22.52A60 60 0 0 0 204 145v110a12 12 0 0 0 24 0V43.87A57.84 57.84 0 0 0 220 38M36 38a58 58 0 0 1 32.46-52.1a12 12 0 1 1 11.08 21.8A34 34 0 0 0 52 64v3.45a60 60 0 0 1 29.4-18.06a12 12 0 1 1 9.2 22.52a36 36 0 0 0 0 32.18a12 12 0 1 1-9.2 22.52A60 60 0 0 1 52 145v110a12 12 0 0 1-24 0V43.87A57.84 57.84 0 0 1 36 38m104 20a58 58 0 0 0-32.46-52.1a12 12 0 1 0-11.08 21.8A34 34 0 0 1 124 64v3.45a60 60 0 0 0-29.4-18.06a12 12 0 1 0-9.2 22.52a36 36 0 0 1 0 32.18a12 12 0 1 0 9.2 22.52A60 60 0 0 0 124 145v110a12 12 0 0 0 24 0V43.87A57.84 57.84 0 0 0 140 38Z"/></svg>
                    <p className="font-bold text-2xl text-foreground">PAGAMENTO 100% SEGURO VIA PIX</p>
                 </div>
                 <Button onClick={handleProceedToCheckout} size="lg" className="w-full font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
                   FINALIZAR PEDIDO COM 84% OFF
                 </Button>
                 <p className="text-xs mt-4 text-foreground/60">Pagamento processado pela FreePay, a plataforma mais segura do Brasil.</p>
            </Card>
        </section>

      </main>

      <footer className="border-t border-primary/20 py-8 text-center text-foreground/50">
          <div className="container mx-auto px-4">
             <p className="font-headline text-xl md:text-2xl text-primary mb-2">COMBO Dominante Supreme™</p>
             <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 my-4">
                <a href="#" className="hover:text-primary">Política de Troca</a>
                <a href="#" className="hover:text-primary">Privacidade</a>
                <a href="#" className="hover:text-primary">Suporte</a>
             </div>
             <p>Instagram: @dominante.supreme.official</p>
             <p className="text-xs mt-4">Todos os direitos reservados © 2024</p>
          </div>
      </footer>
    </div>
  );
}
