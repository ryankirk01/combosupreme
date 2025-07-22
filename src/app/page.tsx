'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/valoir/HeroSection';
import QuizSection from '@/components/valoir/QuizSection';
import SalesPage from '@/components/valoir/SalesPage';
import { cn } from '@/lib/utils';
import CheckoutForm from '@/components/valoir/CheckoutForm';

type GameState = 'hero' | 'quiz' | 'sales' | 'checkout';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('hero');
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizScore, setQuizScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startQuiz = () => setGameState('quiz');
  
  const showSalesPage = (answers: string[], score: number) => {
    setQuizAnswers(answers);
    setQuizScore(score);
    setGameState('sales');
  };

  const showCheckout = () => {
    setGameState('checkout');
  }

  const renderGameState = () => {
    switch (gameState) {
      case 'hero':
        return <HeroSection onStart={startQuiz} />;
      case 'quiz':
        return <QuizSection onComplete={showSalesPage} />;
      case 'sales':
        return <SalesPage quizAnswers={quizAnswers} onCheckout={showCheckout}/>;
      case 'checkout':
        return <CheckoutForm score={quizScore} />;
      default:
        return <HeroSection onStart={startQuiz} />;
    }
  };

  if (!isClient) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
      </div>
    );
  }

  return (
    <main className={cn("relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden bg-background select-none", "animate-background-aurora")}>
      <div className="w-full max-w-7xl">
        {renderGameState()}
      </div>
    </main>
  );
}
