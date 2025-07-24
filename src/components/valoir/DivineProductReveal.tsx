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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
            key={i}
            className="ray"
            style={{
              transform: `translateX(-50%) rotate(${i * 30}deg)`,
              animation: `ray-fade 2s ease-out infinite`,
              animationDelay: `${i * 0.15}s`
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

       <style jsx>{`
        @keyframes ray-fade {
            0%, 100% { opacity: 0; transform: scaleY(0.5); }
            50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>

    </div>
  );
};

export default DivineProductReveal;
