'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ImageComparisonSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeHint?: string;
  afterHint?: string;
};

export default function ImageComparisonSlider({ 
    beforeImage, 
    afterImage,
    beforeHint,
    afterHint
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
      setIsDragging(true);
  }

  const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={imageContainerRef}
      className="relative w-full aspect-video select-none overflow-hidden rounded-md cursor-e-resize comparison-slider"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
        <Image
            src={afterImage}
            alt="After"
            layout="fill"
            objectFit="cover"
            className="pointer-events-none"
            data-ai-hint={afterHint}
            priority
        />
        <div
            className="absolute top-0 left-0 right-0 w-full aspect-video h-full select-none overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
            <Image
                src={beforeImage}
                alt="Before"
                layout="fill"
                objectFit="cover"
                data-ai-hint={beforeHint}
                priority
            />
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-primary/50 cursor-e-resize pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/70 backdrop-blur-sm border-2 border-primary handle flex items-center justify-center cursor-e-resize"
        style={{ left: `calc(${sliderPosition}% - 20px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
      </div>
    </div>
  );
}
