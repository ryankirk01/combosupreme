'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { playPurchaseSound } from '@/lib/utils';

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
      { text: 'Luxo agressivo', points: 15, image: 'https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=400&h=600&auto=format&fit=crop', hint: 'cuban chain' },
      { text: 'Autoridade silenciosa', points: 15, image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31c?q=80&w=400&h=600&auto=format&fit=crop', hint: 'luxury watch' },
      { text: 'Presença de respeito', points: 15, image: 'https://images.unsplash.com/photo-1619119159385-d6d91544cea2?q=80&w=400&h=600&auto=format&fit=crop', hint: 'man suit' },
      { text: 'Todas acima', points: 20, image: 'https://images.unsplash.com/photo-1620625634522-800c74291316?q=80&w=400&h=600&auto=format&fit=crop', hint: 'watch chain' },
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

type QuizSectionProps = {
  onComplete: (score: number) => void;
};

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);

  const handleAnswer = (points: number) => {
    playPurchaseSound();
    setLastPoints(points);
    setShowPoints(true);
    
    setTimeout(() => {
      const newScore = score + points;
      setScore(newScore);
      setShowPoints(false);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onComplete(newScore);
      }
    }, 800);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  
  return (
    <Card className="relative w-full max-w-4xl bg-card/80 backdrop-blur-sm border border-primary/20 animate-fade-in-up shadow-2xl shadow-primary/10">
       {showPoints && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center animate-fade-in-up">
          <span className="font-headline text-6xl md:text-8xl text-primary [text-shadow:0_0_25px_hsl(var(--primary)/0.8),0_0_50px_hsl(var(--primary)/0.5)]">
            +{lastPoints} {currentQuestion.pointsLabel}!
          </span>
        </div>
      )}
      <div className={cn(showPoints && 'blur-sm pointer-events-none transition-all duration-300')}>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="font-headline text-lg text-primary tracking-wider">PERGUNTA {currentQuestionIndex + 1}/{quizQuestions.length}</p>
            <div className="flex items-center gap-2 text-primary font-bold text-xl bg-card/50 py-1 px-3 rounded-lg border border-primary/20">
              <Gem className="h-5 w-5" />
              <span>{score} {currentQuestion.pointsLabel}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 shine-effect [&>div]:bg-primary" />
          <CardTitle className="font-headline text-3xl md:text-4xl text-center mt-6 min-h-[8rem] flex items-center justify-center p-4">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.isImageQuestion ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {currentQuestion.answers.map((answer, index) => (
                <button key={index} onClick={() => handleAnswer(answer.points)} className="group text-left relative overflow-hidden rounded-lg border-2 border-primary/20 hover:border-primary hover:scale-105 focus:border-primary focus:outline-none transition-all transform-gpu">
                  <Image src={answer.image!} alt={answer.text} width={200} height={300} className="w-full h-full object-cover transition-transform group-hover:scale-110" data-ai-hint={answer.hint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <p className="absolute bottom-0 left-0 p-4 font-headline text-xl text-white [text-shadow:1px_1px_3px_black]">{answer.text}</p>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="font-headline text-xl h-24 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
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
      </div>
    </Card>
  );
}
