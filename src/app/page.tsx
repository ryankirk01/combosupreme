'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader2 } from 'lucide-react';

const HeroSection = dynamic(() => import('@/components/valoir/HeroSection'), {
  loading: () => <div className="flex h-screen w-full items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});
const QuizSection = dynamic(() => import('@/components/valoir/QuizSection'), {
  loading: () => <div className="flex h-screen w-full items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});
const SalesPage = dynamic(() => import('@/components/valoir/SalesPage'), {
  loading: () => <div className="flex h-screen w-full items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});
const CheckoutForm = dynamic(() => import('@/components/valoir/CheckoutForm'), {
  loading: () => <div className="flex h-screen w-full items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>,
});


type GameState = 'hero' | 'quiz' | 'sales' | 'checkout';

const purchaseNotifications = [
  'Carlos de SP',
  'Lucas de RJ',
  'Fernando de MG',
  'Ricardo de BA',
  'Jorge de SC',
  'André de RS',
];

const NotificationPopup = () => {
  const [notification, setNotification] = useState<{ text: string, key: number } | null>(null);

  useEffect(() => {
    const showRandomNotification = () => {
      const randomName = purchaseNotifications[Math.floor(Math.random() * purchaseNotifications.length)];
      const text = `${randomName} acabou de desbloquear o Combo Supreme.`;
      setNotification({ text, key: Date.now() });
    };

    const initialTimeout = setTimeout(showRandomNotification, 5000);
    const intervalId = setInterval(showRandomNotification, Math.random() * (12000 - 8000) + 8000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <div
      key={notification.key}
      className="fixed bottom-4 left-4 z-50 bg-card border border-primary/30 p-3 rounded-lg shadow-lg shadow-primary/20 flex items-center gap-3 animate-notification-float"
    >
      <CheckCircle className="text-primary h-5 w-5" />
      <p className="text-sm text-foreground/80">{notification.text}</p>
    </div>
  );
};


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
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className={cn("relative flex min-h-screen flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden bg-background", "animate-background-aurora", "select-none")}>
      <div className="w-full max-w-7xl">
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-background"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
          {renderGameState()}
        </Suspense>
      </div>
      {gameState === 'hero' && isClient && <NotificationPopup />}
    </main>
  );
}
