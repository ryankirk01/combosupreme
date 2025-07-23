'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

type ScratchCardProps = {
  foregroundImage: string;
  backgroundImage: string;
  backgroundHint?: string;
  width: number;
  height: number;
};

export default function ScratchCard({
  foregroundImage,
  backgroundImage,
  backgroundHint,
  width,
  height,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    const fgImage = new window.Image();
    fgImage.crossOrigin = 'anonymous';
    fgImage.src = foregroundImage;
    
    fgImage.onload = () => {
      context.drawImage(fgImage, 0, 0, canvas.width, canvas.height);
      setIsLoaded(true);
    };

  }, [foregroundImage]);

  const getBrushPos = (xRef: number, yRef: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(((xRef - rect.left) / rect.width) * canvas.width),
      y: Math.floor(((yRef - rect.top) / rect.height) * canvas.height),
    };
  };
  
  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching || !isLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const { x, y } = getBrushPos(clientX, clientY);

    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, 40, 0, 2 * Math.PI);
    context.fill();
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    draw(e);
  };

  const handleEnd = () => {
    setIsScratching(false);
  };

  return (
    <div
      className="relative w-full aspect-video select-none"
      style={{
        cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🪙</text></svg>") 16 16, auto`,
      }}
    >
      <Image
        src={backgroundImage}
        alt="Revealed content"
        layout="fill"
        objectFit="cover"
        className="pointer-events-none rounded-md"
        data-ai-hint={backgroundHint}
        priority
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute top-0 left-0 w-full h-full rounded-md"
        onMouseDown={handleStart}
        onMouseMove={draw}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={draw}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
    </div>
  );
}
