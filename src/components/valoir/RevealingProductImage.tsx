'use client';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

type RevealingProductImageProps = {
  src: string;
  hint?: string;
};

const RevealingProductImage: React.FC<RevealingProductImageProps> = ({ src, hint }) => {
  return (
    <Card className="relative w-64 h-64 md:w-80 md:h-80 group overflow-hidden bg-card/50 border-primary/20 p-2">
      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          background: hsl(var(--primary));
          opacity: 0;
          box-shadow: 0 0 10px hsl(var(--primary));
          animation: particle-burst 1.5s ease-out forwards;
        }

        @keyframes particle-burst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(var(--x), var(--y)) scale(0.5);
            opacity: 0;
          }
        }

        .image-reveal {
            animation: image-fade-in-scale 1.5s ease-out forwards;
            animation-delay: 0.3s;
            opacity: 0;
            transform: scale(0.8);
        }

        @keyframes image-fade-in-scale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
      `}</style>

      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={
            {
              '--x': `${(Math.random() - 0.5) * 400}px`,
              '--y': `${(Math.random() - 0.5) * 400}px`,
              width: `${Math.floor(Math.random() * 6) + 3}px`,
              height: `${Math.floor(Math.random() * 6) + 3}px`,
              top: '50%',
              left: '50%',
              animationDelay: `${Math.random() * 0.3}s`,
            } as React.CSSProperties
          }
        />
      ))}
      <Image
        src={src}
        alt="Imagem do Produto"
        width={320}
        height={320}
        className="object-cover w-full h-full rounded-md image-reveal"
        data-ai-hint={hint}
        priority
      />
    </Card>
  );
};

export default RevealingProductImage;
