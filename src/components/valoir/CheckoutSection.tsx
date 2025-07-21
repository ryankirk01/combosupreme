import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ProductImage from './ProductImage';
import TestimonialCard from './TestimonialCard';
import CheckoutForm from './CheckoutForm';

export default function CheckoutSection() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="font-headline text-5xl text-primary">QUASE LÁ, CAMPEÃO</h1>
        <p className="text-lg text-foreground/80 mt-2">Finalize sua conquista. Estoque limitado.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Informações de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <CheckoutForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Seu Combo Supremo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <ProductImage src="https://placehold.co/100x100" alt="Combo Valoir" width={100} height={100} hint="watch chain" />
                <div>
                  <h3 className="font-bold text-lg">Combo VALOIR</h3>
                  <p className="text-sm text-muted-foreground">Relógio de Luxo + Corrente Cubana</p>
                  <p className="font-bold text-primary text-xl mt-1">R$67,00</p>
                </div>
              </div>
              <Separator className="my-4 bg-primary/20" />
              <div className="flex items-center justify-between">
                <Label htmlFor="gift-wrap" className="text-base flex items-center gap-2">🎁 Embalagem de Presente Premium</Label>
                <Switch id="gift-wrap" defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              <Separator className="my-4 bg-primary/20" />
              <div className="flex justify-between font-bold text-xl">
                <span>Total:</span>
                <span className="text-primary">R$67,00</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-4">
             <video className="w-full rounded-lg" autoPlay loop muted playsInline>
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="text-center mt-2 font-headline text-lg text-primary">VEJA O UNBOXING</p>
          </Card>
          
          <div className="space-y-2">
            <p className="text-center font-bold text-amber-400">Restam apenas 17 combos no estoque!</p>
            <Progress value={17} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-destructive [&>div]:to-amber-500" />
          </div>

          <TestimonialCard name="Marcos L." review="Chegou rápido e a qualidade é surreal. Todo mundo pergunta onde comprei." />
          
          <Button variant="outline" className="w-full h-12 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-colors">
            <MessageCircle className="mr-2 h-5 w-5" />
            Falar com Consultor VIP via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
