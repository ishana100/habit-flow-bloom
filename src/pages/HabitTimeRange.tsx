
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { toast } from '@/hooks/use-toast';

const HabitTimeRange = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  const [timeRange, setTimeRange] = useState(habit?.timeRange || 'Anytime');
  
  if (!habit) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-xl font-semibold">Habit not found</h1>
        <Button className="mt-4" onClick={() => navigate('/')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    if (habitId) {
      editHabit(habitId, {
        ...habit,
        timeRange,
      });
      
      toast({
        title: "Time range updated",
        description: `Time range set to ${timeRange}`,
      });
      
      navigate(`/habit/${habitId}`);
    }
  };

  const timeOptions = [
    'Anytime',
    'Morning (6AM-12PM)',
    'Afternoon (12PM-5PM)',
    'Evening (5PM-9PM)',
    'Night (9PM-12AM)',
  ];

  return (
    <ThemeProvider defaultTheme="light">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/habit/${habitId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Time Range</h1>
          <div className="w-10"></div>
        </header>

        <div className="mb-8">
          <p className="text-muted-foreground text-center">When do you want to do this habit?</p>
        </div>

        <div className="space-y-4">
          <RadioGroup
            value={timeRange}
            onValueChange={setTimeRange}
            className="space-y-3"
          >
            {timeOptions.map((time) => (
              <div key={time} className="flex items-center space-x-2 border p-4 rounded-lg">
                <RadioGroupItem value={time} id={time} />
                <Label htmlFor={time} className="flex-1 cursor-pointer">
                  <div className="font-medium">{time}</div>
                </Label>
                {time !== 'Anytime' && <Clock className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </RadioGroup>
        </div>

        <Button 
          className="w-full mt-8 py-3"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default HabitTimeRange;
