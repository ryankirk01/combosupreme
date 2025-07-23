'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Sparkles, Watch, Link2, Gem } from 'lucide-react';

type ArtisanWorkshopProps = {
  finalImage: string;
  finalImageHint?: string;
};

const stages = [
  { name: 'blueprint', duration: 3000, title: 'Analisando o Design...' },
  { name: 'forging', duration: 3000, title: 'Forjando os Metais...' },
  { name: 'polishing', duration: 3000, title: 'Polindo os Detalhes...' },
  { name: 'reveal', duration: 2000, title: 'Seu COMBO Supreme está quase pronto' },
];

export default function ArtisanWorkshop({
  finalImage,
  finalImageHint,
}: ArtisanWorkshopProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIndex(prevIndex => {
        if (prevIndex < stages.length - 1) {
          return prevIndex + 1;
        }
        clearInterval(interval);
        return prevIndex;
      });
    }, stages[currentStageIndex].duration);

    return () => clearInterval(interval);
  }, [currentStageIndex]);

  const currentStage = stages[currentStageIndex];

  const BlueprintStage = () => (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="60%" height="60%" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          </linearGradient>
          <style>
            {`
              .blueprint-path {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 2.5s ease-in-out forwards;
              }
              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}
          </style>
        </defs>
        {/* Watch */}
        <circle cx="100" cy="100" r="40" stroke="url(#goldGradient)" strokeWidth="3" fill="none" className="blueprint-path" style={{ animationDelay: '0s' }}/>
        <line x1="100" y1="60" x2="100" y2="50" stroke="url(#goldGradient)" strokeWidth="3" fill="none" className="blueprint-path" style={{ animationDelay: '0.2s' }} />
        <line x1="100" y1="140" x2="100" y2="150" stroke="url(#goldGradient)" strokeWidth="3" fill="none" className="blueprint-path" style={{ animationDelay: '0.2s' }} />

        {/* Chain */}
        <path d="M50 80 Q75 60 100 80" stroke="url(#goldGradient)" strokeWidth="3" fill="none" className="blueprint-path" style={{ animationDelay: '0.5s' }}/>
        <path d="M100 80 Q125 100 150 80" stroke="url(#goldGradient)" strokeWidth="3" fill="none" className="blueprint-path" style={{ animationDelay: '0.8s' }}/>
      </svg>
    </div>
  );

  const ForgingStage = () => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-24 h-24 bg-primary rounded-full animate-pulse blur-2xl"></div>
        <div className="absolute w-16 h-16 bg-primary/80 rounded-full animate-ping"></div>
         {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} 
                className="absolute bg-primary rounded-full"
                style={{
                    width: `${Math.random() * 5 + 2}px`,
                    height: `${Math.random() * 5 + 2}px`,
                    animation: `spark-fly ${Math.random() * 2 + 2}s ease-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    '--tx': `${(Math.random() - 0.5) * 400}px`,
                    '--ty': `${(Math.random() - 0.5) * 400}px`,
                    opacity: 0,
                }}
            ></div>
        ))}
    </div>
  );

  const PolishingStage = () => (
    <div className="w-full h-full flex items-center justify-center relative">
        <div className="absolute w-full h-full animate-shine-fast"></div>
        <Watch className="w-24 h-24 text-primary/30 animate-pulse" style={{ animationDelay: '0s' }} />
        <Link2 className="w-24 h-24 text-primary/30 animate-pulse" style={{ animationDelay: '0.3s' }}/>
        <Gem className="w-16 h-16 text-primary/50 absolute animate-ping opacity-50"/>
    </div>
  );

  const renderStage = () => {
    switch (currentStage.name) {
      case 'blueprint':
        return <BlueprintStage />;
      case 'forging':
        return <ForgingStage />;
      case 'polishing':
        return <PolishingStage />;
      case 'reveal':
      default:
        return null; // Reveal is handled by the main component opacity
    }
  };

  return (
    <div className="relative w-full aspect-video select-none overflow-hidden rounded-md bg-black">
      <Image
        src={finalImage}
        alt="Revealed content"
        layout="fill"
        objectFit="cover"
        className={cn(
          'pointer-events-none transition-opacity duration-1000',
          currentStage.name !== 'reveal' ? 'opacity-0' : 'opacity-100'
        )}
        data-ai-hint={finalImageHint}
        priority
      />

      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500',
          currentStage.name === 'reveal' ? 'opacity-0' : 'opacity-100'
        )}
      >
        <div className="flex-grow w-full">{renderStage()}</div>
        <p className="font-headline text-primary text-xl tracking-wider p-4 animate-fade-in-up">
            {currentStage.title}
        </p>
      </div>

       <style jsx>{`
        @keyframes spark-fly {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0;
          }
        }
        .animate-shine-fast {
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            110deg,
            transparent 40%,
            hsla(48, 96%, 59%, 0.2),
            transparent 60%
          );
          transform: skewX(-25deg);
          animation: shine 1.5s infinite linear;
        }
       `}</style>
    </div>
  );
}
