
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2, Shield, Sparkles } from 'lucide-react';
import { playPurchaseSound } from '@/lib/utils';
import { Badge } from '../ui/badge';
import ProductImage from './ProductImage';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

type ModelType = 'soberano' | 'executivo';

const models = {
  soberano: {
    name: 'Modelo Soberano',
    description: 'O clássico dourado para máxima imponência e destaque.',
    price: 'R$ 67,00',
    checkoutUrl: 'https://app.freepaybr.com/payment/checkout/1bcd8078-318b-4ac6-bac4-93e8b519a39b',
    image: 'https://i.imgur.com/VJALsDQ.png',
    hint: 'gold watch chain'
  },
  executivo: {
    name: 'Modelo Executivo',
    description: 'O elegante prateado para um visual sofisticado e moderno.',
    price: 'R$ 67,00',
    checkoutUrl: 'https://app.freepaybr.com/payment/checkout/530573f0-3d0d-47d5-81fd-9c5b539d4e82',
    image: 'https://i.imgur.com/PhXHR3F.png',
    hint: 'silver watch chain'
  },
};

type CheckoutFormProps = {
  score: number;
};

export default function CheckoutForm({ score }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>('soberano');
  const [usePointsForShipping, setUsePointsForShipping] = useState(false);

  const handleRedirectToCheckout = () => {
    setIsLoading(true);
    playPurchaseSound();
    
    setTimeout(() => {
      window.location.href = models[selectedModel].checkoutUrl;
    }, 300); 
  };

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in-up bg-card/80 backdrop-blur-sm border border-primary/20">
      <CardHeader className="text-center">
        <Badge variant="outline" className="text-primary border-primary w-fit mx-auto mb-2">ÚLTIMA ETAPA</Badge>
        <CardTitle className="font-headline text-4xl text-primary">Escolha seu Estilo</CardTitle>
        <CardDescription>Ambos pelo mesmo valor promocional. O poder está na sua decisão.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6 md:space-y-0 md:flex-row md:space-x-6 md:items-stretch p-6">
        
        {Object.entries(models).map(([key, model]) => (
          <Card 
              key={key}
              className={cn(
                  "w-full md:w-1/2 flex flex-col justify-between transition-all duration-300 border-2 cursor-pointer",
                  selectedModel === key as ModelType ? 'border-primary shadow-lg shadow-primary/30' : 'border-border hover:border-primary/50'
              )}
              onClick={() => setSelectedModel(key as ModelType)}
          >
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-2xl">{model.name}</CardTitle>
              <CardDescription>{model.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <ProductImage
                  src={model.image}
                  alt={model.name}
                  width={200}
                  height={200}
                  hint={model.hint}
                  className="w-40 h-40"
              />
              <p className="font-headline text-4xl text-primary">{model.price}</p>
            </CardContent>
            <CardFooter>
              <Button variant={selectedModel === key as ModelType ? 'default' : 'outline'} className="w-full">
                {selectedModel === key as ModelType ? <><Shield className="mr-2 h-4 w-4" /> Selecionado</> : 'Selecionar este Modelo'}
              </Button>
            </CardFooter>
          </Card>
        ))}
        
      </CardContent>

      <CardContent className="px-6 pb-6">
        <Card className="bg-card/90 border border-primary/20 p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className='text-center md:text-left'>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                       <Sparkles className="h-6 w-6 text-primary"/>
                       <h4 className="font-headline text-xl text-primary">Recompensa Exclusiva</h4>
                    </div>
                    <p className="text-muted-foreground mt-1">Use seus <strong className="text-primary font-bold">{score} pontos</strong> do desafio para uma vantagem única.</p>
                </div>
                <div className="flex items-center space-x-3 bg-background/50 border border-border p-3 rounded-lg">
                    <Checkbox id="express-shipping" checked={usePointsForShipping} onCheckedChange={(checked) => setUsePointsForShipping(checked as boolean)} />
                    <Label htmlFor="express-shipping" className="text-base cursor-pointer">
                        Quero <span className="font-bold text-primary">Frete Expresso Grátis</span> (1 dia útil)
                    </Label>
                </div>
            </div>
        </Card>
      </CardContent>

      <CardFooter className="flex-col items-center justify-center space-y-4 pt-0">
        <p className="text-muted-foreground text-center text-sm">Você será redirecionado para um ambiente de pagamento 100% seguro.</p>
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
