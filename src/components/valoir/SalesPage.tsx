'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { playPurchaseSound } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CheckCircle, CreditCard, Gift, ShieldCheck, Truck } from 'lucide-react';

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

const FREEPAY_CHECKOUT_URL = 'https://app.freepaybr.com/payment/checkout/1bcd8078-318b-4ac6-bac4-93e8b519a39b';

export default function SalesPage() {
  const [isDiscountClaimed, setIsDiscountClaimed] = useState(false);
  const [notification, setNotification] = useState<{ name: string, visible: boolean } | null>(null);

  const handleClaimDiscount = () => {
    playPurchaseSound();
    setIsDiscountClaimed(true);
  };
  
  const handleRedirectToCheckout = () => {
    playPurchaseSound();
    setTimeout(() => {
      window.location.href = FREEPAY_CHECKOUT_URL;
    }, 300);
  };

  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = purchaseNotifications[Math.floor(Math.random() * purchaseNotifications.length)];
      setNotification({ name: randomName, visible: true });

      setTimeout(() => {
        setNotification(prev => prev ? { ...prev, visible: false } : null);
      }, 5000); // Notification visible for 5 seconds
    };

    const intervalId = setInterval(showRandomNotification, 12000); // New notification every 12 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-black text-white animate-fade-in-up">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center p-4 text-center">
          <h1 className="font-headline text-xl md:text-3xl text-primary tracking-widest">COMBO Dominante Supreme™</h1>
          <p className="hidden md:block font-body text-lg text-white/80">O Combo Que Vai Mudar Seu Estilo</p>
        </div>
      </header>
      
      {/* Recent Purchase Notification */}
      {notification && (
        <div className={cn(
          "fixed bottom-4 left-4 z-50 bg-card border border-primary/30 p-4 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-3",
          notification.visible ? 'animate-notification-in' : 'animate-notification-out'
        )}>
           <CheckCircle className="text-primary h-6 w-6"/>
           <p className="text-sm">{notification.name} comprou agora mesmo o COMBO Dominante Supreme!</p>
        </div>
      )}

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative text-center py-16 md:py-24 min-h-[80vh] flex flex-col items-center justify-center">
          <div className="absolute inset-0 overflow-hidden -z-10">
             <Image src="https://images.unsplash.com/photo-1620625634522-800c74291316?q=80&w=1920&h=1080&auto=format&fit=crop" alt="COMBO Dominante Supreme" layout="fill" objectFit="cover" className="opacity-30" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
          </div>
          <h2 className="font-headline text-4xl md:text-7xl text-white tracking-wider">
            De <span className="line-through text-white/50">R$299</span> por apenas <br className="md:hidden" /> <span className="text-primary text-shadow-gold">R$67</span>
          </h2>
          <p className="font-body text-lg md:text-2xl mt-4 text-white/80 max-w-2xl">Surpreenda. Impulsione seu status. Sinta-se invencível.</p>
          <div className="my-8 bg-black/50 border border-primary/20 rounded-lg p-4 flex flex-col items-center gap-2">
            <CountdownTimer initialMinutes={15} className="font-mono text-3xl md:text-4xl text-primary font-bold" />
            <p className="text-sm text-primary/80">A OFERTA ACABA EM</p>
          </div>
          <Button onClick={handleRedirectToCheckout} size="lg" className="font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
            Quero Meu Combo Agora
          </Button>
        </section>

        {/* Product Presentation */}
        <section className="py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <Card className="bg-card border-primary/20 p-4 shine-effect hover:scale-105 transition-transform duration-300">
              <Image src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31c?q=80&w=600&h=600&auto=format&fit=crop" alt="Relógio do COMBO Dominante Supreme" width={600} height={600} className="rounded-lg w-full" />
            </Card>
            <div className="text-center md:text-left">
              <h3 className="font-headline text-3xl md:text-4xl text-primary">Relógio Dominante™</h3>
              <ul className="mt-4 space-y-3 text-lg text-white/80 list-none p-0">
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Pulseira em Aço Inoxidável</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Mostrador de Precisão Suíço</li>
                <li className="flex items-center justify-center md:justify-start gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Vidro de Safira Antirrisco</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
             <div className="text-center md:text-right md:order-2">
              <h3 className="font-headline text-3xl md:text-4xl text-primary">Corrente Supreme™</h3>
              <ul className="mt-4 space-y-3 text-lg text-white/80 list-none p-0">
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Corrente Cubana 5mm</li>
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Banhada a Ouro 18K</li>
                <li className="flex items-center justify-center md:justify-end gap-3"><CheckCircle className="text-primary h-5 w-5 flex-shrink-0"/>Fecho de Gaveta Seguro</li>
              </ul>
            </div>
            <Card className="bg-card border-primary/20 p-4 shine-effect hover:scale-105 transition-transform duration-300 md:order-1">
              <Image src="https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=600&h=600&auto=format&fit=crop" alt="Corrente do COMBO Dominante Supreme" width={600} height={600} className="rounded-lg w-full" />
            </Card>
          </div>
        </section>

        {/* Gamified Section */}
        <section className="py-16 md:py-20 text-center">
            <h2 className="font-headline text-4xl md:text-5xl text-white">Sua Oportunidade Única</h2>
            <Card className="mt-8 max-w-2xl mx-auto bg-card border-2 border-dashed border-primary/50 p-6 md:p-8">
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
                       <Button onClick={handleRedirectToCheckout} size="lg" className="mt-8 font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
                           Finalizar Pedido com Desconto
                       </Button>
                    </div>
                )}
            </Card>
        </section>


        {/* Social Proof */}
        <section className="py-16 md:py-20">
          <h2 className="text-center font-headline text-4xl md:text-5xl text-white mb-12">Quem Comprou, Aprovou</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(item => (
              <Card key={item.name} className="bg-card border-primary/20 p-6 text-center">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-full mx-auto mb-4 border-2 border-primary"/>
                <p className="text-white/80 italic">"{item.text}"</p>
                <h4 className="mt-4 font-bold text-lg text-primary">{item.name}</h4>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Guarantee Section */}
        <section className="py-16 md:py-20">
            <Card className="bg-card border-primary/20 max-w-4xl mx-auto p-6 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="font-headline text-3xl md:text-4xl text-primary">Sua Satisfação ou seu Dinheiro de Volta.</h2>
                        <p className="text-lg text-white/80 mt-4">Temos tanta confiança na qualidade do COMBO Dominante Supreme que oferecemos uma garantia incondicional de 7 dias. Se você não ficar 100% satisfeito, devolvemos seu dinheiro. Sem perguntas, sem burocracia.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <ShieldCheck className="h-24 w-24 text-primary" />
                         <p className="text-center font-bold text-xl">Compra 100% Segura</p>
                    </div>
                </div>
            </Card>
        </section>

        {/* Final CTA */}
        <section className="text-center py-16 md:py-20">
            <h2 className="font-headline text-4xl md:text-5xl text-white">Não Deixe Para Depois</h2>
            <p className="text-lg md:text-xl text-white/80 mt-2">Seu novo status está a um clique de distância.</p>
            <Card className="max-w-xl mx-auto mt-8 p-6 md:p-8 bg-card border-primary/20 shadow-lg shadow-primary/20">
                 <p className="text-lg">Receba seu <span className="font-bold text-primary">COMBO Dominante Supreme</span> em casa em até 7 dias úteis.</p>
                 <div className="flex justify-center items-center gap-4 my-4">
                    <CreditCard className="h-8 w-8 text-white/70" />
                    <p className="font-bold text-2xl text-white">PIX</p>
                 </div>
                 <Button onClick={handleRedirectToCheckout} size="lg" className="w-full font-headline text-xl md:text-2xl tracking-widest px-10 py-7 md:px-12 md:py-8 animate-pulse-glow shadow-gold">
                   Finalizar Pedido com Desconto
                 </Button>
            </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 text-center text-white/50">
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
