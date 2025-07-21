'use server';
/**
 * @fileOverview Simula a geração de um pagamento PIX.
 * 
 * - generatePix - Gera um QR Code e código Copia e Cola para pagamento PIX.
 * - GeneratePixInput - Tipo de entrada para a função.
 * - GeneratePixOutput - Tipo de saída da função.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GeneratePixInputSchema = z.object({
  value: z.number().describe('O valor do pagamento em BRL.'),
  customerName: z.string().describe('O nome do cliente.'),
});
export type GeneratePixInput = z.infer<typeof GeneratePixInputSchema>;

const GeneratePixOutputSchema = z.object({
  qrCodeUrl: z.string().url().describe('A URL de uma imagem do QR Code do PIX.'),
  pixCopyPaste: z.string().describe('O código PIX "Copia e Cola".'),
});
export type GeneratePixOutput = z.infer<typeof GeneratePixOutputSchema>;

// Função wrapper exportada para ser usada no frontend
export async function generatePix(input: GeneratePixInput): Promise<GeneratePixOutput> {
  return generatePixFlow(input);
}

// Simulação de uma chamada de API para um provedor de pagamento PIX (como a Freepix)
const generatePixFlow = ai.defineFlow(
  {
    name: 'generatePixFlow',
    inputSchema: GeneratePixInputSchema,
    outputSchema: GeneratePixOutputSchema,
  },
  async (input) => {
    // Em um cenário real, aqui você faria uma chamada para a API da Freepix
    // com o valor e dados do cliente para gerar o PIX.
    console.log(`Gerando PIX para ${input.customerName} no valor de R$${input.value.toFixed(2)}`);

    // Para este exemplo, vamos retornar dados mockados.
    const fakePixCopyPaste = '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Cliente Valoir6009SAO PAULO62070503***6304E1A1';
    
    // Usamos um serviço que gera um QR code a partir de um texto.
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(fakePixCopyPaste)}`;

    return {
      qrCodeUrl: qrCodeApiUrl,
      pixCopyPaste: fakePixCopyPaste,
    };
  }
);
