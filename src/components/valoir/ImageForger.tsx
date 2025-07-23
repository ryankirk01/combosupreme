'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { playPurchaseSound } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

type ImageForgerProps = {
  backgroundImage: string;
  backgroundHint?: string;
};

const Sparkle = ({ id, x, y }: { id: number; x: number; y: number }) => (
    <div
      key={id}
      className="sparkle"
      style={{
        top: `${y}%`,
        left: `${x}%`,
        // @ts-ignore
        '--x': `${(Math.random() - 0.5) * 80}px`,
        '--y': `${(Math.random() - 0.5) * 80}px`,
      }}
    />
);

export default function ImageForger({
  backgroundImage,
  backgroundHint,
}: ImageForgerProps) {
  const [isForging, setIsForging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sparkleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);
    };
  }, []);

  const startForging = () => {
    setIsForging(true);
    playPurchaseSound();

    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + 2;
        if (next >= 100) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          clearInterval(sparkleIntervalRef.current as NodeJS.Timeout);
          return 100;
        }
        return next;
      });
    }, 50);

    sparkleIntervalRef.current = setInterval(() => {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
        };
        setSparkles(prev => [...prev, newSparkle]);
        setTimeout(() => {
            setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 800);
    }, 100);

  };

  const stopForging = () => {
    setIsForging(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (sparkleIntervalRef.current) clearInterval(sparkleIntervalRef.current);

    if (progress < 100) {
        // Reset if not completed
        const resetInterval = setInterval(() => {
            setProgress(prev => {
                const next = prev - 5;
                if(next <= 0) {
                    clearInterval(resetInterval);
                    return 0;
                }
                return next;
            });
        }, 50);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="relative w-full aspect-video select-none overflow-hidden rounded-md border-2 border-primary/20 bg-black"
      >
        <Image
          src={backgroundImage}
          alt="Revealed content"
          layout="fill"
          objectFit="cover"
          className={cn(
              "pointer-events-none transition-opacity duration-1000",
              progress < 100 ? "opacity-0" : "opacity-100"
          )}
          data-ai-hint={backgroundHint}
          priority
        />
        <div
            className='absolute inset-0 bg-black/80 flex items-center justify-center transition-opacity duration-500'
            style={{ opacity: progress < 100 ? 1 : 0 }}
        >
            <div className='absolute inset-0' style={{ clipPath: `inset(${100 - progress}% 0 0 0)`}}>
                <Image
                    src={backgroundImage}
                    alt="Revealing content"
                    layout="fill"
                    objectFit="cover"
                    className="pointer-events-none"
                    priority
                />
            </div>
            <Sparkles className={cn("h-24 w-24 text-primary/30 transition-all duration-1000", isForging && "opacity-0 scale-150")} />
             {sparkles.map(s => <Sparkle key={s.id} {...s} />)}
        </div>
      </div>
      <Button
        onMouseDown={startForging}
        onMouseUp={stopForging}
        onMouseLeave={stopForging}
        onTouchStart={startForging}
        onTouchEnd={stopForging}
        size="lg"
        className={cn(
            "font-headline text-xl tracking-widest px-8 py-6 transition-all duration-300 shadow-lg",
            isForging ? "bg-primary/80 scale-95 shadow-inner" : "bg-primary shadow-primary/30",
            progress >= 100 && "bg-green-500 text-white pointer-events-none"
        )}
      >
        {progress >= 100 ? "IMAGEM FORJADA" : "FORJAR MINHA PRESENÇA"}
      </Button>
    </div>
  );
}
