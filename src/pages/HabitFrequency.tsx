
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { toast } from '@/hooks/use-toast';

const HabitFrequency = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  const [frequency, setFrequency] = useState(habit?.frequency || 'daily');
  
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
        frequency,
      });
      
      toast({
        title: "Frequency updated",
        description: `Frequency set to ${frequency === 'daily' ? 'every day' : 'weekly'}`,
      });
      
      navigate(`/habit/${habitId}`);
    }
  };
  
  const handleCustomDays = () => {
    navigate(`/select-days/${habitId}`);
  };

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
          <h1 className="text-xl font-bold">Set Frequency</h1>
          <div className="w-10"></div>
        </header>

        <div className="mb-8">
          <p className="text-muted-foreground text-center">How often do you want to do this habit?</p>
        </div>

        <div className="space-y-4">
          <RadioGroup
            value={frequency}
            onValueChange={(value) => setFrequency(value as 'daily' | 'weekly' | 'custom')}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="flex-1 cursor-pointer">
                <div className="font-medium">Every day</div>
                <div className="text-sm text-muted-foreground">Do this habit daily</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="flex-1 cursor-pointer">
                <div className="font-medium">Once a week</div>
                <div className="text-sm text-muted-foreground">Do this habit weekly</div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom" className="flex-1 cursor-pointer">
                <div className="font-medium">Custom days</div>
                <div className="text-sm text-muted-foreground">Select specific days</div>
              </Label>
            </div>
          </RadioGroup>
          
          {frequency === 'custom' && (
            <Button
              className="w-full mt-2"
              variant="outline"
              onClick={handleCustomDays}
            >
              Select days
            </Button>
          )}
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

export default HabitFrequency;
