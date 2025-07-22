'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/valoir/HeroSection';
import QuizSection from '@/components/valoir/QuizSection';
import SalesPage from '@/components/valoir/SalesPage';

type GameState = 'hero' | 'quiz' | 'sales';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('hero');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startQuiz = () => setGameState('quiz');
  
  const showSalesPage = () => {
    setGameState('sales');
  };

  const renderGameState = () => {
    switch (gameState) {
      case 'hero':
        return <HeroSection onStart={startQuiz} />;
      case 'quiz':
        return <QuizSection onComplete={showSalesPage} />;
      case 'sales':
        return <SalesPage />;
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
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden bg-black">
      <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsl(var(--primary)/0.1),rgba(255,255,255,0))]"></div>
      <div className="w-full">
        {renderGameState()}
      </div>
    </main>
  );
}
