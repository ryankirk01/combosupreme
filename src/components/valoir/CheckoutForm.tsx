
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Check, Loader2, Star } from 'lucide-react';
import { playPurchaseSound } from '@/lib/utils';
import { Badge } from '../ui/badge';
import ProductImage from './ProductImage';
import { cn } from '@/lib/utils';

type OfferType = 'standard' | 'vip';

const offers = {
  standard: {
    name: 'COMBO Dominante Supreme',
    price: 'R$ 67,00',
    checkoutUrl: 'https://app.freepaybr.com/payment/checkout/1bcd8078-318b-4ac6-bac4-93e8b519a39b',
    features: ['Relógio VALOIR™', 'Corrente VALOIR™'],
  },
  vip: {
    name: 'COMBO Dominante VIP',
    price: 'R$ 97,00',
    checkoutUrl: 'https://app.freepaybr.com/payment/checkout/d9e8c7f6-a5b4-4c3d-8e7f-1a2b3c4d5e6f', // Placeholder - a real link would be different
    features: ['Relógio VALOIR™', 'Corrente VALOIR™', 'Ebook "O Código do Estilo Supremo"'],
  },
};

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferType>('vip');

  const handleRedirectToCheckout = () => {
    setIsLoading(true);
    playPurchaseSound();
    
    setTimeout(() => {
      window.location.href = offers[selectedOffer].checkoutUrl;
    }, 300); 
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in-up bg-card/80 backdrop-blur-sm border border-primary/20">
      <CardHeader className="text-center">
        <Badge variant="outline" className="text-primary border-primary w-fit mx-auto mb-2">ÚLTIMA ETAPA</Badge>
        <CardTitle className="font-headline text-4xl text-primary">Escolha sua Oferta</CardTitle>
        <CardDescription>Você está a um passo de garantir seu novo status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 md:space-y-0 md:flex-row md:space-x-6 md:items-stretch p-6">
        
        {/* Standard Offer */}
        <Card 
            className={cn(
                "w-full md:w-1/2 flex flex-col justify-between transition-all duration-300 border-2",
                selectedOffer === 'standard' ? 'border-primary shadow-lg shadow-primary/30' : 'border-border hover:border-primary/50'
            )}
            onClick={() => setSelectedOffer('standard')}
        >
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">{offers.standard.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4">
            <ProductImage
                src="https://i.imgur.com/VJALsDQ.png"
                alt="Combo Dominante Supreme"
                width={200}
                height={200}
                hint="luxury watch gold chain"
                className="w-32 h-32"
            />
            <p className="font-headline text-4xl text-primary">{offers.standard.price}</p>
            <ul className="space-y-2 text-foreground/80">
              {offers.standard.features.map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" /> {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant={selectedOffer === 'standard' ? 'default' : 'outline'} className="w-full">
              {selectedOffer === 'standard' ? 'Selecionado' : 'Selecionar'}
            </Button>
          </CardFooter>
        </Card>

        {/* VIP Offer */}
        <Card 
            className={cn(
                "w-full md:w-1/2 flex flex-col justify-between transition-all duration-300 border-2 relative overflow-hidden",
                selectedOffer === 'vip' ? 'border-primary shadow-lg shadow-primary/30' : 'border-border hover:border-primary/50'
            )}
            onClick={() => setSelectedOffer('vip')}
        >
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 font-bold"><Star className="mr-1 h-4 w-4" /> MELHOR VALOR</Badge>
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">{offers.vip.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
                <ProductImage
                    src="https://i.imgur.com/VJALsDQ.png"
                    alt="Combo Dominante Supreme"
                    width={200}
                    height={200}
                    hint="luxury watch gold chain"
                    className="w-24 h-24"
                />
                <span className="text-3xl font-bold text-primary">+</span>
                <div className="flex flex-col items-center">
                    <BookOpen className="h-16 w-16 text-primary" />
                    <p className="text-xs font-bold text-primary mt-1">EBOOK BÔNUS</p>
                </div>
            </div>
            <p className="font-headline text-4xl text-primary">{offers.vip.price}</p>
            <ul className="space-y-2 text-foreground/80">
                {offers.vip.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2 font-bold">
                    <Check className="h-4 w-4 text-primary" /> {feature}
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant={selectedOffer === 'vip' ? 'default' : 'outline'} className="w-full">
              {selectedOffer === 'vip' ? 'Selecionado' : 'Selecionar'}
            </Button>
          </CardFooter>
        </Card>
        
      </CardContent>
      <CardFooter className="flex-col items-center justify-center space-y-4 pt-6">
        <p className="text-muted-foreground text-center text-sm">Clique no botão abaixo para ir para a página de pagamento seguro e finalizar sua compra via PIX.</p>
        <Button
            onClick={handleRedirectToCheckout}
            disabled={isLoading}
            size="lg"
            className="w-full max-w-lg font-headline text-xl tracking-wider py-7 transition-transform hover:scale-105 active:scale-100 shadow-gold"
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
      </CardFooter>
    </Card>
  );
}
