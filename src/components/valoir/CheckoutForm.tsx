'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { playPurchaseSound } from '@/lib/utils';
import { Badge } from '../ui/badge';


const FREEPAY_CHECKOUT_URL = 'https://app.freepaybr.com/payment/checkout/1bcd8078-318b-4ac6-bac4-93e8b519a39b';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirectToCheckout = () => {
    setIsLoading(true);
    playPurchaseSound();
    
    // Adiciona um pequeno atraso para o som tocar antes do redirecionamento
    setTimeout(() => {
      window.location.href = FREEPAY_CHECKOUT_URL;
    }, 300); 
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in-up bg-card/80 backdrop-blur-sm border border-primary/20">
      <CardHeader className="text-center">
        <Badge variant="outline" className="text-primary border-primary w-fit mx-auto mb-2">ÚLTIMA ETAPA</Badge>
        <CardTitle className="font-headline text-4xl text-primary">Finalize seu Pedido</CardTitle>
        <CardDescription>Você está a um passo de garantir seu COMBO Dominante Supreme.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
        <div className="w-full text-center bg-card/50 p-4 rounded-lg border border-border">
            <p className="text-muted-foreground">Produto</p>
            <p className="font-bold text-lg text-foreground">COMBO Dominante Supreme</p>
            <p className="text-muted-foreground mt-2">Valor Total</p>
            <p className="font-headline text-3xl text-primary">R$ 67,00</p>
        </div>
        <h2 className="font-headline text-2xl text-center">Forma de Pagamento: PIX</h2>
        <p className="text-muted-foreground text-center text-sm">Clique no botão abaixo para ir para a página de pagamento seguro e finalizar sua compra.</p>
        
        <Button
            onClick={handleRedirectToCheckout}
            disabled={isLoading}
            size="lg"
            className="w-full font-headline text-xl tracking-wider py-7 transition-transform hover:scale-105 active:scale-100 shadow-gold animate-pulse-glow"
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
      </CardContent>
    </Card>
  );
}
