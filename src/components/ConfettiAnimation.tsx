
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

type ConfettiPosition = {
  x: number;
  y: number;
}

interface ConfettiAnimationProps {
  trigger: boolean;
  position?: ConfettiPosition;
  onComplete?: () => void;
}

export const ConfettiAnimation = ({ 
  trigger, 
  position,
  onComplete 
}: ConfettiAnimationProps) => {
  const [played, setPlayed] = useState(false);
  
  useEffect(() => {
    if (trigger && !played) {
      const x = position?.x ?? 0.5;
      const y = position?.y ?? 0.5;
      
      const duration = 1000;
      const particleCount = 50;
      
      confetti({
        particleCount,
        spread: 70,
        origin: { x, y },
        gravity: 1.2,
        zIndex: 1000,
        colors: ['#FEC6A1', '#FEF7CD', '#D3E4FD', '#FFDEE2', '#E5DEFF', '#F2FCE2'],
        disableForReducedMotion: true
      });
      
      setPlayed(true);
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, duration);
    } else if (!trigger) {
      setPlayed(false);
    }
  }, [trigger, position, played, onComplete]);
  
  // This is a non-visible component, just for running the animation
  return null;
};
