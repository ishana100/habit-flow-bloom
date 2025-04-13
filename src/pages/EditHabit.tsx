
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Input } from '@/components/ui/input';
import { HabitFormData } from '@/types/habit';

const EditHabit = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  
  const [formData, setFormData] = useState<HabitFormData>({
    name: habit?.name || '',
    icon: habit?.icon || '🏃',
    color: habit?.color || 'mint',
    frequency: habit?.frequency || 'daily',
    reminderTime: habit?.reminderTime || '7:00 AM',
    selectedDays: habit?.selectedDays || ['M', 'T', 'W']
  });

  const [reminderEnabled, setReminderEnabled] = useState(!!habit?.reminderTime);

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
      const updatedData = {
        ...formData,
        reminderTime: reminderEnabled ? formData.reminderTime : undefined
      };
      editHabit(habitId, updatedData);
      navigate('/');
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Habit</h1>
          <div className="w-10" />
        </header>

        <div className="flex flex-col items-center mb-6">
          <div className="text-6xl mb-4">{habit.icon}</div>
          <h2 className="text-2xl font-bold">{habit.name}</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Repeat</span>
            <Button 
              variant="ghost" 
              className="flex items-center text-muted-foreground"
              onClick={() => navigate(`/select-days/${habitId}`)}
            >
              <span>Every Day</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Reminder</span>
            <Switch 
              checked={reminderEnabled} 
              onCheckedChange={setReminderEnabled}
              className={`${reminderEnabled ? 'bg-green-500' : 'bg-gray-200'}`}
            />
          </div>

          {reminderEnabled && (
            <div className="flex items-center justify-center">
              <Input
                type="time"
                value={formData.reminderTime?.split(' ')[0] || '07:00'}
                onChange={(e) => {
                  const time = e.target.value;
                  const [hours, minutes] = time.split(':');
                  const hour = parseInt(hours, 10);
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                  const timeString = `${displayHour}:${minutes} ${ampm}`;
                  setFormData({ ...formData, reminderTime: timeString });
                }}
                className="text-center text-xl p-2 w-40"
              />
            </div>
          )}

          <Button 
            className="w-full mt-8 py-3 bg-red-500 hover:bg-red-600 text-white"
            variant="destructive"
            onClick={() => navigate(`/habit/${habitId}`)}
          >
            Delete Habit
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default EditHabit;
