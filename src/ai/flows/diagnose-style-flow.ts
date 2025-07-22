'use server';
/**
 * @fileOverview Gera um diagnóstico de estilo personalizado com base nas respostas do quiz.
 *
 * - diagnoseStyle - Gera um parágrafo de diagnóstico de estilo.
 * - DiagnoseStyleInput - Tipo de entrada para a função.
 * - DiagnoseStyleOutput - Tipo de saída da função.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const DiagnoseStyleInputSchema = z.object({
  answers: z.array(z.string()).describe('Uma lista de respostas do usuário no quiz de estilo.'),
});
export type DiagnoseStyleInput = z.infer<typeof DiagnoseStyleInputSchema>;

const DiagnoseStyleOutputSchema = z.object({
  diagnosis: z.string().describe('Um parágrafo curto e persuasivo de diagnóstico de estilo.'),
});
export type DiagnoseStyleOutput = z.infer<typeof DiagnoseStyleOutputSchema>;

export async function diagnoseStyle(input: DiagnoseStyleInput): Promise<DiagnoseStyleOutput> {
  return diagnoseStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnoseStylePrompt',
  input: { schema: DiagnoseStyleInputSchema },
  output: { schema: DiagnoseStyleOutputSchema },
  prompt: `Você é um especialista em moda e estilo de luxo, com foco em empoderamento e autoconfiança. Sua tarefa é criar um diagnóstico de estilo curto (2-3 frases), positivo e persuasivo para um cliente com base nas respostas de um quiz.

O objetivo é validar as escolhas do cliente e conectar sutilmente suas aspirações ao produto "COMBO Dominante Supreme".

As respostas do cliente foram:
{{#each answers}}
- {{{this}}}
{{/each}}

Seja direto, elogioso e use uma linguagem que inspire poder e status. Termine conectando as características do cliente à oferta.

Exemplo de tom: "Sua busca por presença e seu desejo de subir de nível mostram que você não se contenta com o comum. Você está destinado a ser uma referência, e o COMBO Dominante Supreme é a ferramenta que solidifica essa imagem."
`,
});

const diagnoseStyleFlow = ai.defineFlow(
  {
    name: 'diagnoseStyleFlow',
    inputSchema: DiagnoseStyleInputSchema,
    outputSchema: DiagnoseStyleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
