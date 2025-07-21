'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Copy, Loader2 } from 'lucide-react';
import { generatePix, GeneratePixOutput } from '@/ai/flows/generate-pix-flow';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function CheckoutForm() {
  const { toast } = useToast();
  const [pixData, setPixData] = useState<GeneratePixOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePix = async () => {
    setIsLoading(true);
    try {
      const data = await generatePix({ value: 67.00, customerName: 'Cliente Valoir' });
      setPixData(data);
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Erro ao gerar PIX',
        description: error.message || 'Não foi possível gerar o código PIX. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (pixData?.pixCopyPaste) {
      navigator.clipboard.writeText(pixData.pixCopyPaste);
      toast({
        title: 'Copiado!',
        description: 'Código PIX copiado para a área de transferência.',
        className: 'bg-primary text-primary-foreground border-primary',
      });
    }
  };

  if (pixData) {
    return (
      <div className="space-y-4 text-center animate-fade-in-up">
        <h2 className="font-headline text-2xl text-primary">Pague com PIX para Finalizar</h2>
        <p className="text-muted-foreground">Escaneie o QR Code com o app do seu banco.</p>
        <div className="flex justify-center">
            <Image
                src={pixData.qrCodeUrl}
                alt="PIX QR Code"
                width={256}
                height={256}
                className="rounded-lg border-4 border-primary p-1 bg-white"
                unoptimized // Necessário para fontes externas não configuradas
            />
        </div>
        <p className="text-muted-foreground">Ou copie o código abaixo:</p>
        <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-3">
                <div className="flex items-center gap-2">
                    <p className="text-sm font-mono break-all text-left flex-1">
                        {pixData.pixCopyPaste}
                    </p>
                    <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                        <Copy className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
        <p className="text-sm font-bold text-amber-300">Após o pagamento, o seu pedido será confirmado automaticamente.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
        <h2 className="font-headline text-2xl text-center">Forma de Pagamento: PIX</h2>
        <p className="text-muted-foreground text-center">Clique no botão abaixo para gerar seu código PIX e finalizar a compra com segurança.</p>
        
        <Button
            onClick={handleGeneratePix}
            disabled={isLoading}
            size="lg"
            className="w-full font-headline text-xl tracking-wider py-7 transition-transform hover:scale-105 active:scale-100"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    GERANDO...
                </>
            ) : (
                <>
                    GERAR CÓDIGO PIX <ArrowRight className="ml-2" />
                </>
            )}
        </Button>
    </div>
  );
}
