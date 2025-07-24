'use client';
import React from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

type VideoPlayerProps = {
  src: string;
  className?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  return (
    <div className={cn("relative w-full max-w-2xl mx-auto aspect-video", className)}>
       <Card className="relative group overflow-hidden bg-card/50 border-primary/20 p-2 shadow-2xl shadow-primary/30 w-full h-full">
            <video
              className="w-full h-full object-cover rounded-md"
              src={src}
              autoPlay
              muted
              loop
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 opacity-30 group-hover:opacity-10 transition-opacity"></div>
      </Card>
    </div>
  );
};

export default VideoPlayer;
