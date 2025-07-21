'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';
import Image from 'next/image';

const quizQuestions = [
  {
    question: 'Você tem coragem de ser notado onde passa?',
    answers: [
      { text: 'Sim', points: 10 },
      { text: 'Sempre', points: 15 },
      { text: 'Estou pronto pra isso', points: 12 },
    ],
    pointsLabel: 'Presença'
  },
  {
    question: 'Qual seu estilo ideal de presença?',
    isImageQuestion: true,
    answers: [
      { text: 'Luxo agressivo', points: 15, image: 'https://placehold.co/200x300', hint: 'aggressive luxury' },
      { text: 'Autoridade silenciosa', points: 15, image: 'https://placehold.co/200x300', hint: 'quiet authority' },
      { text: 'Presença de respeito', points: 15, image: 'https://placehold.co/200x300', hint: 'respectful presence' },
      { text: 'Todas acima', points: 20, image: 'https://placehold.co/200x300', hint: 'all styles' },
    ],
    pointsLabel: 'Estilo'
  },
  {
    question: 'O que mais te representa hoje?',
    answers: [
      { text: 'Subir de nível', points: 15 },
      { text: 'Ser referência', points: 15 },
      { text: 'Impor respeito', points: 15 },
      { text: 'Ter o que ninguém tem', points: 20 },
    ],
    pointsLabel: 'Ambição'
  },
];
const totalPoints = quizQuestions.reduce((total, q) => total + Math.max(...q.answers.map(a => a.points)), 0);

type QuizSectionProps = {
  onComplete: (score: number) => void;
};

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (points: number) => {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = Math.round((newScore / totalPoints) * 100);
      onComplete(finalScore);
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  return (
    <Card className="w-full max-w-4xl bg-card/80 backdrop-blur-sm border border-primary/20 animate-fade-in-up">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <p className="font-headline text-lg text-primary">PERGUNTA {currentQuestionIndex + 1}/{quizQuestions.length}</p>
          <div className="flex items-center gap-2 text-primary font-bold">
            <Gem className="h-5 w-5" />
            <span>{score} {currentQuestion.pointsLabel}</span>
          </div>
        </div>
        <Progress value={progress} className="h-2 [&>div]:bg-primary" />
        <CardTitle className="font-headline text-3xl md:text-4xl text-center mt-6 min-h-[8rem] flex items-center justify-center p-4">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentQuestion.isImageQuestion ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswer(answer.points)} className="group text-left relative overflow-hidden rounded-lg border-2 border-primary/20 hover:border-primary focus:border-primary focus:outline-none transition-all">
                <Image src={answer.image!} alt={answer.text} width={200} height={300} className="w-full h-auto object-cover transition-transform group-hover:scale-105" data-ai-hint={answer.hint} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-0 left-0 p-4 font-headline text-xl text-white">{answer.text}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentQuestion.answers.map((answer, index) => (
              <Button
                key={index}
                variant="outline"
                className="font-headline text-xl h-24 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                onClick={() => handleAnswer(answer.points)}
              >
                <div>
                  <p>{answer.text}</p>
                  <p className="text-sm text-primary/80">(+{answer.points} {currentQuestion.pointsLabel})</p>
                </div>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
