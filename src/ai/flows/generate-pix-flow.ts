'use server';
/**
 * @fileOverview Gera um pagamento PIX utilizando a API da Freepix.
 * 
 * - generatePix - Gera um QR Code e código Copia e Cola para pagamento PIX.
 * - GeneratePixInput - Tipo de entrada para a função.
 * - GeneratePixOutput - Tipo de saída da função.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import "dotenv/config";

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

// Implementação da chamada de API para a Freepix
const generatePixFlow = ai.defineFlow(
  {
    name: 'generatePixFlow',
    inputSchema: GeneratePixInputSchema,
    outputSchema: GeneratePixOutputSchema,
  },
  async (input) => {
    const secretKey = process.env.FREEPIX_SECRET_KEY;
    const companyId = process.env.FREEPIX_COMPANY_ID;

    if (!secretKey || !companyId) {
      throw new Error('Credenciais da Freepix não configuradas no ambiente.');
    }

    try {
      const response = await fetch('https://api.freepix.com.br/v1/charge/static', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Secret-Key': secretKey,
        },
        body: JSON.stringify({
          companyId: companyId,
          type: 'dynamic',
          value: input.value,
          customer: {
            name: input.customerName,
            taxId: '00000000000' // Tax ID é obrigatório, mas pode ser genérico
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro da API Freepix:', errorData);
        throw new Error(`Erro ao gerar PIX: ${errorData.message || response.statusText}`);
      }
      
      const data = await response.json();

      if (!data.qrCodeImage || !data.brCode) {
         throw new Error('Resposta da API Freepix inválida. Faltando qrCodeImage ou brCode.');
      }

      return {
        qrCodeUrl: data.qrCodeImage,
        pixCopyPaste: data.brCode,
      };

    } catch (error) {
      console.error("Falha ao comunicar com a Freepix: ", error);
      throw new Error('Não foi possível conectar ao serviço de pagamento. Tente novamente mais tarde.');
    }
  }
);
