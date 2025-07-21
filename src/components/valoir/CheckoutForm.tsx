'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Email inválido.' }),
  cardNumber: z.string().min(13, { message: 'Número do cartão inválido.' }).max(19, { message: 'Número do cartão inválido.' }).regex(/^\d+$/, { message: 'Apenas números são permitidos.'}),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, { message: 'Data inválida (MM/AA).' }),
  cvc: z.string().min(3, { message: 'CVC inválido.' }).max(4, { message: 'CVC inválido.' }).regex(/^\d+$/, { message: 'Apenas números são permitidos.'}),
});

export default function CheckoutForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "🏆 Compra Realizada com Sucesso!",
        description: "Seu Combo VALOIR está a caminho. Você receberá os detalhes no seu e-mail.",
        className: "bg-primary text-primary-foreground border-primary",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome no cartão" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu.email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número do Cartão</FormLabel>
              <FormControl>
                <Input placeholder="0000 0000 0000 0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Validade</FormLabel>
                <FormControl>
                  <Input placeholder="MM/AA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size="lg" className="w-full font-headline text-xl tracking-wider py-7 transition-transform hover:scale-105 active:scale-100">
          FINALIZAR COMPRA <ArrowRight className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
