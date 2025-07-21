import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

type TestimonialCardProps = {
    name: string;
    review: string;
}

export default function TestimonialCard({ name, review }: TestimonialCardProps) {
  return (
    <Card className="bg-card border-border animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <CardContent className="p-6">
            <div className="flex text-primary mb-2">
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
