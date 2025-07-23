'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gem, Ship, Briefcase, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { playPurchaseSound } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";


const quizQuestions = [
  {
    question: 'Qual seu nível de presença?',
    isHoldingQuestion: true,
    answers: [ // Based on hold duration
      { text: 'Discreto', points: 8 },
      { text: 'Notado', points: 12 },
      { text: 'Dominante', points: 15 },
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
    question: 'Qual a sua fome de sucesso?',
    isTapQuestion: true,
    answers: [ // Based on tap speed
        { text: 'Ambicioso', points: 10 },
        { text: 'Implacável', points: 15 },
        { text: 'Lendário', points: 20 },
    ],
    pointsLabel: 'Ambição'
  },
];

const HoldButton = ({ onComplete }: { onComplete: (points: number, text: string) => void }) => {
    const [holdLevel, setHoldLevel] = useState(0); // 0, 1, 2
    const [isHolding, setIsHolding] = useState(false);
    const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
    const levels = [
      { text: 'Discreto', points: 8, duration: 0 },
      { text: 'Notado', points: 12, duration: 700 },
      { text: 'Dominante', points: 15, duration: 1500 },
    ];
  
    const handleMouseDown = () => {
      setIsHolding(true);
      holdTimeoutRef.current = setTimeout(() => {
        // Not really used, interval drives level changes
      }, levels[levels.length - 1].duration + 100);
  
      holdIntervalRef.current = setInterval(() => {
        setHoldLevel(prev => (prev < levels.length - 1 ? prev + 1 : prev));
      }, levels[1].duration);
    };
  
    const handleMouseUp = () => {
      setIsHolding(false);
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current);
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      
      const finalLevel = levels[holdLevel];
      onComplete(finalLevel.points, finalLevel.text);
    };
    
    return (
      <div className="flex flex-col items-center justify-center text-center select-none">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56 rounded-full bg-card/80 border-4 border-primary/20 transition-all duration-300 transform active:scale-95 focus:outline-none shine-effect"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary transition-all duration-500" style={{ transform: `scale(${0.8 + holdLevel * 0.1})`, opacity: isHolding ? 1 : 0 }}></div>
          <div 
            className="absolute inset-0 rounded-full border-t-4 border-t-primary animate-spin"
            style={{ animationDuration: `${2 - holdLevel}s`, opacity: isHolding ? 0.5 + holdLevel * 0.25 : 0 }}
          ></div>
          
          <div className="z-10 text-center">
            <div className="font-headline text-2xl md:text-3xl text-primary transition-all duration-300">
              {levels[holdLevel].text}
            </div>
            <div className="text-sm text-foreground/70 mt-1">Segure para confirmar</div>
          </div>
        </button>
      </div>
    );
};

const TapChallenge = ({ onComplete, answers }: { onComplete: (points: number, text: string) => void; answers: { text: string; points: number }[] }) => {
    const [taps, setTaps] = useState(0);
    const [isTapping, setIsTapping] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const maxTaps = 30;

    useEffect(() => {
        if (isTapping && timeLeft > 0) {
            timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            endChallenge();
        }
        return () => { if (timerRef.current) clearTimeout(timerRef.current) };
    }, [isTapping, timeLeft]);

    const startChallenge = () => {
        setTaps(0);
        setTimeLeft(5);
        setIsTapping(true);
    };

    const handleTap = () => {
        if (!isTapping) {
            startChallenge();
        }
        if (timeLeft > 0) {
            setTaps(prev => Math.min(prev + 1, maxTaps));
        }
    };
    
    const endChallenge = () => {
        if (!isTapping) return;
        setIsTapping(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        
        let result;
        if (taps < maxTaps * 0.5) { // < 15 taps
            result = answers[0];
        } else if (taps < maxTaps * 0.8) { // < 24 taps
            result = answers[1];
        } else { // >= 24 taps
            result = answers[2];
        }
        onComplete(result.points, result.text);
    };

    const progress = (taps / maxTaps) * 100;

    return (
        <div className="flex flex-col items-center justify-center text-center w-full max-w-sm mx-auto">
            {!isTapping && taps === 0 ? (
                <Button
                    onClick={handleTap}
                    className="w-48 h-48 md:w-56 md:h-56 rounded-full font-headline text-2xl md:text-3xl text-primary-foreground bg-primary shadow-gold animate-pulse-glow"
                >
                    Atingir o Topo
                </Button>
            ) : (
                <>
                    <p className="font-mono text-5xl md:text-6xl text-primary font-bold mb-4">{timeLeft}</p>
                    <Progress value={progress} className="h-4 w-full mb-4 shine-effect [&>div]:bg-primary" />
                    <Button
                        onClick={handleTap}
                        onMouseUp={timeLeft === 0 ? endChallenge : undefined}
                        className="w-48 h-48 md:w-56 md:h-56 rounded-full font-headline text-primary-foreground bg-primary shadow-gold active:scale-95 flex flex-col justify-center items-center text-xl md:text-2xl shine-effect"
                    >
                       <span>Toque Rápido!</span>
                       <span className="text-5xl font-bold opacity-80 mt-2">{taps}</span>
                    </Button>
                </>
            )}
        </div>
    );
};

type QuizSectionProps = {
  onComplete: (answers: string[], score: number) => void;
};

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lastPoints, setLastPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [collectedAnswers, setCollectedAnswers] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (points: number, answerText: string) => {
    playPurchaseSound();
    setLastPoints(points);
    setShowPoints(true);
    setCollectedAnswers(prev => [...prev, answerText]);
    const newScore = score + points;
    
    setTimeout(() => {
      setScore(newScore);
      setShowPoints(false);
      setIsTransitioning(true);

      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setIsTransitioning(false);
        } else {
          onComplete([...collectedAnswers, answerText], newScore);
        }
      }, 300); // Duration of fade-out animation
    }, 1200); // Duration points are shown
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  
  return (
    <Card className="relative w-full max-w-4xl bg-card/80 backdrop-blur-sm border border-primary/20 animate-fade-in-up shadow-2xl shadow-primary/10 overflow-hidden">
       {showPoints && (
         <div className="absolute inset-0 z-20 flex flex-col items-center justify-center animate-fade-in-up">
            <Gem className="h-16 w-16 text-primary drop-shadow-lg animate-ping absolute" />
            <span className="font-headline text-6xl md:text-9xl text-primary text-shadow-gold drop-shadow-lg">
                +{lastPoints} {currentQuestion.pointsLabel}!
            </span>
         </div>
      )}
      <div className={cn(
          "transition-all duration-300",
          (showPoints || isTransitioning) && 'opacity-0 blur-sm pointer-events-none',
           isTransitioning && 'transform -translate-y-4'
        )}>
        <CardHeader>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <p className="font-headline text-base md:text-lg text-primary tracking-wider">PERGUNTA {currentQuestionIndex + 1}/{quizQuestions.length}</p>
            <div className="flex items-center gap-2 text-primary font-bold text-lg md:text-xl bg-card/50 py-1 px-3 rounded-lg border border-primary/20">
              <Gem className="h-5 w-5" />
              <span>{score} PTS</span>
            </div>
          </div>
          <Progress value={progress} className="h-2 shine-effect [&>div]:bg-primary" />
          <CardTitle className="font-headline text-2xl md:text-4xl text-center mt-6 min-h-[6rem] md:min-h-[4rem] flex items-center justify-center p-2 md:p-4">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px] flex items-center justify-center">
          {currentQuestion.isHoldingQuestion ? (
            <HoldButton onComplete={handleAnswer} />
          ) : currentQuestion.isCarouselQuestion ? (
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
          ) : currentQuestion.isTapQuestion ? (
            <TapChallenge onComplete={handleAnswer} answers={currentQuestion.answers} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="font-headline text-lg md:text-xl h-24 md:h-32 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20 flex flex-col"
                  onClick={() => handleAnswer(answer.points, answer.text)}
                >
                  <span className="text-2xl">{answer.text}</span>
                  <span className="text-base text-primary/80 mt-1">(+{answer.points} {currentQuestion.pointsLabel})</span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
}
