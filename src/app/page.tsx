'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/valoir/HeroSection';
import QuizSection from '@/components/valoir/QuizSection';
import RewardSection from '@/components/valoir/RewardSection';
import CheckoutSection from '@/components/valoir/CheckoutSection';

type GameState = 'hero' | 'quiz' | 'reward' | 'checkout';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('hero');
  const [score, setScore] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startQuiz = () => setGameState('quiz');
  
  const showReward = (finalScore: number) => {
    setScore(finalScore);
    setGameState('reward');
  };

  const showCheckout = () => setGameState('checkout');

  const renderGameState = () => {
    switch (gameState) {
      case 'hero':
        return <HeroSection onStart={startQuiz} />;
      case 'quiz':
        return <QuizSection onComplete={showReward} />;
      case 'reward':
        return <RewardSection score={score} onProceed={showCheckout} />;
      case 'checkout':
        return <CheckoutSection />;
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
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),rgba(255,255,255,0))]"></div>
      <div className="w-full max-w-7xl">
        {renderGameState()}
      </div>
    </main>
  );
}
