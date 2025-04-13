
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "A habit is a cable; we weave a thread each day, and at last we cannot break it.", author: "Horace Mann" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
  { text: "Small habits don't add up. They compound.", author: "James Clear" },
  { text: "Make it obvious. Make it attractive. Make it easy. Make it satisfying.", author: "James Clear" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear" },
  { text: "Don't break the chain. Keep showing up.", author: "Jerry Seinfeld" },
  { text: "It's not what we do once in a while that shapes our lives, but what we do consistently.", author: "Tony Robbins" },
  { text: "Success is the product of daily habits—not once-in-a-lifetime transformations.", author: "James Clear" },
];

export function MotivationalBanner() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setIsVisible(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`bg-primary/5 p-4 border-none overflow-hidden transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-start space-x-3">
        <Quote className="h-5 w-5 text-primary/60 mt-1 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-primary/90">"{currentQuote.text}"</p>
          <p className="text-xs text-muted-foreground mt-1">— {currentQuote.author}</p>
        </div>
      </div>
    </Card>
  );
}
