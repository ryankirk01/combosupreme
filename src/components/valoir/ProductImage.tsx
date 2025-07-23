import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
  hint?: string;
};

export default function ProductImage({ src, alt, className, width, height, hint }: ProductImageProps) {
  return (
    <Card className={cn("shine-effect bg-card/50 border-primary/20 p-2 aspect-square", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full rounded-md"
        data-ai-hint={hint}
        priority
      />
    </Card>
  );
}
