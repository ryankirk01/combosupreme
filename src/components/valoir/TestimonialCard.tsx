import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

type TestimonialCardProps = {
    name: string;
    review: string;
}

export default function TestimonialCard({ name, review }: TestimonialCardProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 p-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <CardContent className="p-2">
            <div className="flex text-amber-400 mb-2">
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
                <Star className="fill-current h-5 w-5" />
            </div>
            <p className="text-foreground/90 italic">"{review}"</p>
            <p className="text-right font-bold mt-2 text-primary/80">- {name}</p>
        </CardContent>
    </Card>
  )
}
