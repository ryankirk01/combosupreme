'use client';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

const FREEPAY_CHECKOUT_URL = 'https://app.freepaybr.com/payment/checkout/1bcd8078-318b-4ac6-bac4-93e8b519a39b';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Garante que o objeto Audio seja criado apenas no lado do cliente
    audioRef.current = new Audio('/sounds/purchase.mp3');
    audioRef.current.preload = 'auto';
  }, []);

  const handleRedirectToCheckout = () => {
    setIsLoading(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    // Adiciona um pequeno atraso para o som tocar antes do redirecionamento
    setTimeout(() => {
      window.location.href = FREEPAY_CHECKOUT_URL;
    }, 300); 
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="font-headline text-2xl text-center">Forma de Pagamento: PIX</h2>
        <p className="text-muted-foreground text-center">Clique no botão abaixo para ir para a página de pagamento seguro e finalizar sua compra.</p>
        
        <Button
            onClick={handleRedirectToCheckout}
            disabled={isLoading}
            size="lg"
            className="w-full font-headline text-xl tracking-wider py-7 transition-transform hover:scale-105 active:scale-100"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    REDIRECIONANDO...
                </>
            ) : (
                <>
                    PAGAR COM PIX <ArrowRight className="ml-2" />
                </>
            )}
        </Button>
    </div>
  );
}
