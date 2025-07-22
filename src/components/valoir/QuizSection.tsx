'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, ArrowLeft, ArrowRight, Ship, Briefcase, Crown } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { playPurchaseSound } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


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
    isCarouselQuestion: true,
    answers: [
      { text: 'O Navegador', points: 15, icon: Ship, description: 'Desbrava novos mares, confiante e imponente. Seu estilo é sobre liberdade e conquista.' },
      { text: 'O CEO', points: 15, icon: Briefcase, description: 'Comanda a sala de reuniões. Cada detalhe do seu visual comunica poder e decisão.' },
      { text: 'O Magnata', points: 20, icon: Crown, description: 'O topo da cadeia. Não segue tendências, ele as cria. Seu luxo é inquestionável.' },
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
  onComplete: (answers: string[]) => void;
};

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);

  const handleAnswer = (points: number, answerText: string) => {
    playPurchaseSound();
    setLastPoints(points);
    setShowPoints(true);
    setCollectedAnswers(prev => [...prev, answerText]);
    
    setTimeout(() => {
      const newScore = score + points;
      setScore(newScore);
      setShowPoints(false);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onComplete([...collectedAnswers, answerText]);
      }
    }, 800);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  
  return (
    <Card className="relative w-full max-w-4xl bg-card/80 backdrop-blur-sm border border-primary/20 animate-fade-in-up shadow-2xl shadow-primary/10">
       {showPoints && (
        <div className="absolute inset-0 z-20 flex items-center justify-center animate-fade-in-up">
          <span className="font-headline text-6xl md:text-9xl text-primary text-shadow-gold drop-shadow-lg">
            +{lastPoints} {currentQuestion.pointsLabel}!
          </span>
        </div>
      )}
      <div className={cn(showPoints && 'blur-sm pointer-events-none transition-all duration-300 bg-black/50')}>
        <CardHeader>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <p className="font-headline text-base md:text-lg text-primary tracking-wider">PERGUNTA {currentQuestionIndex + 1}/{quizQuestions.length}</p>
            <div className="flex items-center gap-2 text-primary font-bold text-lg md:text-xl bg-card/50 py-1 px-3 rounded-lg border border-primary/20">
              <Gem className="h-5 w-5" />
              <span>{score} {currentQuestion.pointsLabel}</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 shine-effect [&>div]:bg-primary" />
          <CardTitle className="font-headline text-2xl md:text-4xl text-center mt-6 min-h-[6rem] md:min-h-[4rem] flex items-center justify-center p-2 md:p-4">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.isCarouselQuestion ? (
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {currentQuestion.answers.map((answer, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card 
                        onClick={() => handleAnswer(answer.points, answer.text)}
                        className="bg-card/70 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all cursor-pointer group text-center p-6 md:p-8"
                      >
                         <answer.icon className="h-16 w-16 md:h-20 md:w-20 mx-auto text-primary group-hover:scale-110 transition-transform" />
                         <h3 className="font-headline text-2xl md:text-3xl mt-4 text-foreground">{answer.text}</h3>
                         <p className="text-foreground/80 mt-2 h-16">{answer.description}</p>
                         <p className="text-primary/80 mt-4">(+{answer.points} {currentQuestion.pointsLabel})</p>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-primary hover:text-primary-foreground border-primary hover:bg-primary" />
              <CarouselNext className="text-primary hover:text-primary-foreground border-primary hover:bg-primary" />
            </Carousel>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="font-headline text-lg md:text-xl h-20 md:h-24 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                  onClick={() => handleAnswer(answer.points, answer.text)}
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
