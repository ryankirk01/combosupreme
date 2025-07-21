import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle } from 'lucide-react';
import ProductImage from './ProductImage';
import TestimonialCard from './TestimonialCard';
import CheckoutForm from './CheckoutForm';

export default function CheckoutSection() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in-up">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl text-primary tracking-wider [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">QUASE LÁ, CAMPEÃO</h1>
        <p className="text-lg text-foreground/80 mt-2">Finalize sua conquista. Estoque limitado.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <Card className="bg-card border-primary/20 shadow-lg shadow-primary/5">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-center lg:text-left">Informações de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 shrink-0">
                  <ProductImage src="https://images.unsplash.com/photo-1620625634522-800c74291316?q=80&w=600&h=600&auto=format&fit=crop" alt="Combo Valoir" width={100} height={100} hint="watch chain" className="p-1" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Combo VALOIR</h3>
                  <p className="text-sm text-muted-foreground">Relógio de Luxo + Corrente Cubana</p>
                  <p className="font-bold text-primary text-xl mt-1">R$67,00</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <Label htmlFor="gift-wrap" className="text-base flex items-center gap-2">🎁 Embalagem de Presente Premium</Label>
                <Switch id="gift-wrap" defaultChecked />
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span className="text-primary">R$67,00</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-center font-bold text-destructive flex items-center justify-center gap-2"><AlertTriangle size={20} /> Restam apenas 17 combos no estoque!</p>
            <Progress value={17} className="h-2 [&>div]:bg-destructive" />
          </div>

          <TestimonialCard name="Marcos L." review="Chegou rápido e a qualidade é surreal. Todo mundo pergunta onde comprei." />
          
        </div>
      </div>
    </div>
  )
}
