'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

type DivineProductRevealProps = {
  src: string;
  hint?: string;
};

const DivineProductReveal: React.FC<DivineProductRevealProps> = ({ src, hint }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      <style jsx>{`
        .rays-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          animation: spin 30s linear infinite;
        }

        .rays-container-2 {
          animation: spin-reverse 40s linear infinite;
        }

        .rays-container-3 {
          animation: spin 50s linear infinite;
        }

        .rays-container-4 {
          animation: spin-reverse 20s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
        }

        .ray {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 2px;
          height: 300px;
          background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.5), transparent);
          transform-origin: 0 0;
        }
        
        .rays-container-2 .ray {
          height: 280px;
          background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.3), transparent);
        }

        .rays-container-3 .ray {
          height: 320px;
          background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.4), transparent);
        }
        
        .rays-container-4 .ray {
          height: 260px;
          background: linear-gradient(to top, transparent, hsl(var(--primary) / 0.2), transparent);
        }

        .image-container {
            animation: pulse-scale-in 2s ease-out forwards;
            opacity: 0;
            transform: scale(0.9);
        }

        @keyframes pulse-scale-in {
            0% {
                opacity: 0;
                transform: scale(0.9);
            }
            50% {
                 opacity: 1;
                 transform: scale(1.05);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
      `}</style>
      
      <div className="rays-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`r1-${i}`}
            className="ray"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      <div className="rays-container rays-container-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`r2-${i}`}
            className="ray"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>
      
      <div className="rays-container rays-container-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`r3-${i}`}
            className="ray"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

       <div className="rays-container rays-container-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`r4-${i}`}
            className="ray"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
            }}
          />
        ))}
      </div>

      
      <div className="image-container">
        <Card className="relative w-64 h-64 md:w-80 md:h-80 group overflow-hidden bg-card/50 border-primary/20 p-2 shadow-2xl shadow-primary/30">
            <Image
                src={src}
                alt="Imagem do Produto"
                width={320}
                height={320}
                className="object-cover w-full h-full rounded-md"
                data-ai-hint={hint}
                priority
            />
             <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 opacity-30 group-hover:opacity-10 transition-opacity"></div>
        </Card>
      </div>

    </div>
  );
};

export default DivineProductReveal;
