'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { playPurchaseSound } from '@/lib/utils';
import { CheckCircle, CreditCard, Gift, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { diagnoseStyle } from '@/ai/flows/diagnose-style-flow';
import ProductImage from './ProductImage';

const testimonials = [
  { name: 'Ricardo Alves', text: 'Qualidade impressionante, superou minhas expectativas. O relógio é robusto e a corrente tem um brilho único.', image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Fernanda Lima', text: 'Chegou muito rápido! A embalagem é linda, perfeita pra presente. Meu namorado amou!', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop' },
  { name: 'Jorge Martins', text: 'O combo mudou meu visual. Todo lugar que eu vou alguém pergunta. Valeu cada centavo.', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=200&h=200&auto=format&fit=crop' }
];

const purchaseNotifications = [
  'Lucas de São Paulo, SP',
  'Mariana de Rio de Janeiro, RJ',
  'Pedro de Belo Horizonte, MG',
  'Ana de Salvador, BA',
  'Carlos de Brasília, DF',
  'Beatriz de Curitiba, PR',
];

type SalesPageProps = {
  quizAnswers: string[];
  onCheckout: () => void;
}

export default function SalesPage({ quizAnswers, onCheckout }: SalesPageProps) {
  const [isDiscountClaimed, setIsDiscountClaimed] = useState(false);
  const [notification, setNotification] = useState<{ name: string, key: number } | null>(null);
  const [styleDiagnosis, setStyleDiagnosis] = useState<string | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState(true);

  useEffect(() => {
    async function getDiagnosis() {
      const fallbackDiagnosis = "Seu estilo é único e suas escolhas mostram que você está pronto para um novo nível de presença. O COMBO Dominante Supreme foi feito para pessoas como você.";

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
    <div className="w-full bg-background text-foreground animate-fade-in-up">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center p-4 text-center">
          <h1 className="font-headline text-xl md:text-3xl text-primary tracking-widest">COMBO Dominante Supreme™</h1>
          <p className="hidden md:block font-body text-lg text-foreground/80">O Combo Que Vai Mudar Seu Estilo</p>
        </div>
      </header>
      
      {notification && (
        <div 
          key={notification.key}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-card border border-primary/30 p-4 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-3 animate-notification-float"
        >
           <CheckCircle className="text-primary h-6 w-6"/>
           <p className="text-sm">{notification.name} comprou agora mesmo o COMBO Dominante Supreme!</p>
        </div>
      )}

      <main className="container mx-auto px-4">
        
        {styleDiagnosis && (
          <section className="py-12 text-center">
            <Card className="bg-card/50 border border-primary/20 p-6 max-w-3xl mx-auto shadow-lg shadow-primary/10">
              <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
              <h2 className="font-headline text-2xl text-primary tracking-wider mb-2">Seu Diagnóstico de Estilo:</h2>
              <p className="text-lg text-foreground/90 italic">"{styleDiagnosis}"</p>
            </Card>
          </section>
        )}

        <section className="relative text-center py-16 md:py-24 min-h-[80vh] flex flex-col items-center justify-center">
          <div className="absolute inset-0 -z-10">
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <h2 className="font-headline text-4xl md:text-7xl text-foreground tracking-wider text-shadow-gold">
            De <span className="line-through text-foreground/50">R$299</span> por apenas <br className="md:hidden" /> <span className="text-primary">R$67</span>
          </h2>
          <p className="font-body text-lg md:text-2xl mt-4 text-foreground/80 max-w-2xl">Surpreenda. Impulsione seu status. Sinta-se invencível.</p>
          <div className="my-8 bg-card/50 border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2">
            <CountdownTimer initialMinutes={15} className="font-mono text-3xl md:text-4xl text-primary font-bold" />
            <p className="text-sm text-primary/80">A OFERTA ACABA EM</p>
          </div>
          <Button onClick={handleProceedToCheckout} size="lg" className="font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
            Quero Meu Combo Agora
          </Button>
        </section>

        <section className="py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full h-auto mb-5">
                <ProductImage
                src="https://storage.googleapis.com/gcp-kms-prod-tokens/6379555f-87d3-4a1d-8f2a-e24177209ac7/z0pdp/7995166f-4022-48a6-912a-3507d9f79603.png"
                alt="Relógio do COMBO Dominante Supreme"
                width={600}
                height={600}
                hint="luxury watch"
                className="hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="text-center md:text-left">
              <h3 className="font-headline text-3xl md:text-4xl text-primary">Relógio Dominante™</h3>
              <ul className="mt-4 space-y-3 text-lg text-foreground/80 list-none p-0">
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Pulseira em Aço Inoxidável</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Mostrador de Precisão Suíço</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Vidro de Safira Antirrisco</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
             <div className="text-center md:text-right md:order-2">
              <h3 className="font-headline text-3xl md:text-4xl text-primary">Corrente Supreme™</h3>
              <ul className="mt-4 space-y-3 text-lg text-foreground/80 list-none p-0">
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Corrente Cubana 5mm</li>
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Banhada a Ouro 18K</li>
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Fecho de Gaveta Seguro</li>
              </ul>
            </div>
            <ProductImage
              src="https://storage.googleapis.com/gcp-kms-prod-tokens/6379555f-87d3-4a1d-8f2a-e24177209ac7/z0pdp/60fca566-f99a-452f-879a-88698a96c141.png"
              alt="Corrente do COMBO Dominante Supreme"
              width={600}
              height={600}
              hint="gold chain"
              className="hover:scale-105 transition-transform duration-300 md:order-1"
            />
          </div>
        </section>

        <section className="py-16 md:py-20 text-center">
            <h2 className="font-headline text-4xl md:text-5xl text-foreground">Sua Oportunidade Única</h2>
            <Card className="mt-8 max-w-2xl mx-auto bg-card/50 border-2 border-dashed border-primary/50 p-6 md:p-8">
                {!isDiscountClaimed ? (
                    <>
                        <p className="font-headline text-2xl text-primary">VOCÊ FOI SELECIONADO</p>
                        <p className="text-lg mt-2">Clique na caixa abaixo para revelar seu acesso exclusivo ao COMBO Dominante Supreme.</p>
                        <button onClick={handleClaimDiscount} className="mt-6 animate-pulse-glow transition-transform hover:scale-105">
                           <Gift className="text-primary h-24 w-24 md:h-32 md:w-32"/>
                        </button>
                    </>
                ) : (
                    <div className="animate-fade-in-up">
                       <h3 className="font-headline text-2xl md:text-3xl text-primary">PARABÉNS!</h3>
                       <p className="text-lg md:text-xl mt-2">Você ganhou <span className="font-bold text-primary">77% DE DESCONTO</span> e acesso ao preço final de <span className="font-bold text-primary">R$67</span>.</p>
                       <Button onClick={handleProceedToCheckout} size="lg" className="mt-8 font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
                           Finalizar Pedido com Desconto
                       </Button>
                    </div>
                )}
            </Card>
        </section>


        <section className="py-16 md:py-20">
          <h2 className="text-center font-headline text-4xl md:text-5xl text-foreground mb-12">Quem Comprou, Aprovou</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(item => (
              <Card key={item.name} className="bg-card/50 border-primary/20 p-6 text-center">
                <ProductImage src={item.image} alt={item.name} width={80} height={80} className="rounded-full mx-auto mb-4 border-2 border-primary" hint="man portrait"/>
                <p className="text-foreground/80 italic">"{item.text}"</p>
                <h4 className="mt-4 font-bold text-lg text-primary">{item.name}</h4>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="py-16 md:py-20">
            <Card className="bg-card/50 border-primary/20 max-w-4xl mx-auto p-6 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary">Sua Satisfação ou seu Dinheiro de Volta.</h2>
                        <p className="text-lg text-foreground/80 mt-4">Temos tanta confiança na qualidade do COMBO Dominante Supreme que oferecemos uma garantia incondicional de 7 dias. Se você não ficar 100% satisfeito, devolvemos seu dinheiro. Sem perguntas, sem burocracia.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <ShieldCheck className="h-24 w-24 text-primary" />
                         <p className="text-center font-bold text-xl">Compra 100% Segura</p>
                    </div>
                </div>
            </Card>
        </section>

        <section className="text-center py-16 md:py-20">
            <h2 className="font-headline text-4xl md:text-5xl text-foreground">Não Deixe Para Depois</h2>
            <p className="text-lg md:text-xl text-foreground/80 mt-2">Seu novo status está a um clique de distância.</p>
            <Card className="max-w-xl mx-auto mt-8 p-6 md:p-8 bg-card/50 border-primary/20 shadow-lg shadow-primary/20">
                 <p className="text-lg">Receba seu <span className="font-bold text-primary">COMBO Dominante Supreme</span> em casa em até 7 dias úteis.</p>
                 <div className="flex justify-center items-center gap-4 my-4">
                    <CreditCard className="h-8 w-8 text-foreground/70" />
                    <p className="font-bold text-2xl text-foreground">PIX</p>
                 </div>
                 <Button onClick={handleProceedToCheckout} size="lg" className="w-full font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
                   Finalizar Pedido com Desconto
                 </Button>
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
