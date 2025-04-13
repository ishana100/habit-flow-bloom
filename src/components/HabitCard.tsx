
import { useState } from 'react';
import { Check, MoreHorizontal, Trash2, Edit } from 'lucide-react';
import { Habit } from '@/types/habit';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHabits } from '@/contexts/HabitContext';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export function HabitCard({ habit, onEdit }: HabitCardProps) {
  const { toggleHabit, deleteHabit } = useHabits();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!habit.completed) {
      setIsAnimating(true);
      setTimeout(() => {
        toggleHabit(habit.id);
        setIsAnimating(false);
      }, 400);
    } else {
      toggleHabit(habit.id);
    }
  };

  return (
    <Card 
      className={cn(
        `habit-card-shadow habit-card-hover p-4 relative overflow-hidden transition-all`, 
        `border-l-4 border-habit-${habit.color}`,
        habit.completed && 'opacity-80'
      )}
      data-testid={`habit-card-${habit.id}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleToggle}
            variant="outline"
            size="icon"
            className={cn(
              `w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center`,
              `hover:bg-habit-${habit.color} hover:text-primary-foreground`,
              habit.completed && `bg-habit-${habit.color} border-habit-${habit.color}`,
              !habit.completed && `border-habit-${habit.color} text-primary`
            )}
            aria-label={`Mark ${habit.name} as ${habit.completed ? 'incomplete' : 'complete'}`}
          >
            {habit.completed && <Check className={cn("h-5 w-5", isAnimating && "animate-check-mark")} />}
          </Button>
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-2xl" aria-hidden="true">{habit.icon}</span>
              <h3 className="font-medium">{habit.name}</h3>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {habit.frequency === 'daily' ? 'Every day' : 'Once a week'} • {habit.streak} day streak
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(habit)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => deleteHabit(habit.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-3 bg-secondary h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full bg-habit-${habit.color}`} 
          style={{ width: `${(habit.streak / Math.max(habit.longestStreak, 7)) * 100}%` }}
        />
      </div>
    </Card>
  );
}
