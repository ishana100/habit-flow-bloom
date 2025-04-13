
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Habit } from '@/types/habit';
import { useHabits } from '@/contexts/HabitContext';
import { HabitCheckbox } from '@/components/HabitCheckbox';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export function HabitCard({ habit, onEdit }: HabitCardProps) {
  const navigate = useNavigate();
  const { toggleHabit, deleteHabit } = useHabits();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const today = format(new Date(), 'yyyy-MM-dd');
  const isCompletedToday = habit.completionDates.some(date => date.startsWith(today));

  const handleComplete = (completed: boolean) => {
    toggleHabit(habit.id);
    
    if (completed) {
      toast({
        title: "Habit completed! 🎉",
        description: `You've completed ${habit.name} for today!`,
        duration: 3000,
      });
    }
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    toast({
      title: "Habit deleted",
      description: `${habit.name} has been deleted`,
      variant: "destructive",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`
          p-3 habit-card-shadow habit-card-hover border-l-4 hover:border-l-4
          ${isCompletedToday ? 'bg-muted/30' : 'bg-card'}
        `}
        style={{ borderLeftColor: `var(--habit-${habit.color})` }}
      >
        <div className="flex items-center">
          <HabitCheckbox 
            checked={isCompletedToday}
            onCheckedChange={handleComplete}
            color={habit.color}
          />
          
          <div className="ml-3 flex-1 cursor-pointer" onClick={() => navigate(`/habit/${habit.id}`)}>
            <div className="flex items-center">
              <span className="text-xl mr-2">{habit.icon}</span>
              <h3 className="font-medium">{habit.name}</h3>
            </div>
            
            <div className="flex items-center mt-1">
              <div className="text-xs text-muted-foreground">
                {habit.frequency === 'daily' ? 'Every day' : 
                 habit.frequency === 'weekly' ? 'Once a week' : 
                 habit.selectedDays?.length === 7 ? 'Every day' : 
                 habit.selectedDays?.length === 0 ? 'No days selected' : 
                 `${habit.selectedDays?.length} days a week`}
              </div>
              
              {habit.streak > 0 && (
                <div className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center">
                  <span className="mr-1">🔥</span> {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
          
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(habit)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </motion.div>
  );
}
