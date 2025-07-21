'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductImage from './ProductImage';
import { Gem, ArrowRight, CheckCircle } from 'lucide-react';
import { playPurchaseSound } from '@/lib/utils';

type ShopSectionProps = {
  score: number;
  onProceed: () => void;
};

const items = [
  { id: 'watch', name: 'Relógio de Luxo VALOIR', cost: 16, image: 'https://placehold.co/400x400', hint: 'luxury watch' },
  { id: 'chain', name: 'Corrente Cubana VALOIR', cost: 16, image: 'https://placehold.co/400x400', hint: 'cuban chain' },
];

export default function ShopSection({ score, onProceed }: ShopSectionProps) {
  const [ambition, setAmbition] = useState(score);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const handlePurchase = (itemCost: number, itemId: string) => {
    if (ambition >= itemCost && !purchasedItems.includes(itemId)) {
      playPurchaseSound();
      setAmbition(ambition - itemCost);
      setPurchasedItems([...purchasedItems, itemId]);
    }
  };
  
  return (
    <Card className="w-full max-w-5xl bg-card/80 backdrop-blur-sm border border-primary/20 animate-fade-in-up">
      <CardHeader className="text-center">
        <h1 className="font-headline text-5xl md:text-6xl text-primary tracking-wider">
          ARSENAL DO DOMINANTE
        </h1>
        <p className="text-lg text-foreground/80 mt-2">Use sua ambição para forjar seu legado.</p>
        <div className="mt-4 inline-flex items-center justify-center gap-2 text-2xl font-bold text-primary bg-card/50 py-2 px-4 rounded-lg border border-primary/20">
          <Gem className="h-7 w-7" />
          <span>{ambition} Ambição</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {items.map((item) => {
            const isPurchased = purchasedItems.includes(item.id);
            const canAfford = ambition >= item.cost;
            return (
              <Card key={item.id} className="bg-card border-border overflow-hidden">
                <CardHeader>
                  <ProductImage src={item.image} alt={item.name} width={400} height={400} hint={item.hint} className="border-0" />
                  <CardTitle className="font-headline text-2xl text-center">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {isPurchased ? (
                    <Button size="lg" disabled className="w-full font-headline text-xl bg-green-600 hover:bg-green-600">
                      Adquirido <CheckCircle className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={() => handlePurchase(item.cost, item.id)}
                      disabled={!canAfford}
                      className="w-full font-headline text-xl"
                    >
                      <span>Adquirir por</span>
                      <Gem className="mx-2 h-5 w-5" />
                      <span>{item.cost} Ambição</span>
                    </Button>
                  )}
                  {!canAfford && !isPurchased && <p className="text-sm text-destructive mt-2">Ambição insuficiente</p>}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Button onClick={onProceed} size="lg" className="font-headline text-2xl tracking-widest">
            CONTINUAR PARA OFERTA FINAL <ArrowRight className="ml-2" />
          </Button>
          <p className="text-xs text-muted-foreground mt-2">Você terá uma chance única de finalizar sua coleção.</p>
        </div>
      </CardContent>
    </Card>
  );
}
