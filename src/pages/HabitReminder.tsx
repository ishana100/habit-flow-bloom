
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HabitReminder = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  const [reminderTime, setReminderTime] = useState(habit?.reminderTime || '9:00 AM');
  
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
        reminderTime,
      });
      
      toast({
        title: "Reminder set",
        description: `You'll be reminded at ${reminderTime}`,
      });
      
      navigate(`/habit/${habitId}`);
    }
  };

  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ['00', '30']) {
        const h = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        times.push(`${h}:${minute} ${period}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

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
          <h1 className="text-xl font-bold">Set Reminder</h1>
          <div className="w-10"></div>
        </header>

        <div className="mb-8">
          <p className="text-muted-foreground text-center">When do you want to be reminded?</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <Bell className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="font-medium">Reminder time</p>
              <p className="text-sm text-muted-foreground">We'll remind you to do this habit</p>
            </div>
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              Reminders will appear as notifications. Make sure notifications are enabled on your device.
            </p>
          </div>
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

export default HabitReminder;
