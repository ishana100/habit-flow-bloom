
import { useState, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConfettiAnimation } from './ConfettiAnimation';

interface HabitCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  color?: string;
  disabled?: boolean;
}

export function HabitCheckbox({ 
  checked, 
  onCheckedChange, 
  color = 'mint',
  disabled = false 
}: HabitCheckboxProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const checkboxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  
  const handleChange = (value: boolean) => {
    if (value && !checked) {
      // Calculate position for confetti based on checkbox location
      if (checkboxRef.current) {
        const rect = checkboxRef.current.getBoundingClientRect();
        const x = rect.left / window.innerWidth;
        const y = rect.top / window.innerHeight;
        setPosition({ x, y });
      }
      
      setShowConfetti(true);
    }
    onCheckedChange(value);
  };
  
  return (
    <div className="relative" ref={checkboxRef}>
      <div className={`relative rounded-md p-0.5 transition-colors ${checked ? `bg-habit-${color}` : 'bg-transparent'}`}>
        <Checkbox
          checked={checked}
          onCheckedChange={handleChange}
          disabled={disabled}
          className={`
            ${checked ? `border-habit-${color} bg-habit-${color}` : 'border-gray-300 bg-white dark:bg-gray-800'}
            h-6 w-6 rounded-md transition-colors focus:ring-0 focus:ring-offset-0
          `}
        />
        
        {checked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Check className={`h-4 w-4 text-primary-foreground`} />
          </motion.div>
        )}
      </div>
      
      <ConfettiAnimation 
        trigger={showConfetti} 
        position={position}
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
}
