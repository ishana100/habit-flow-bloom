
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WeekDay } from '@/types/habit';

const SelectDays = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, editHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  const [selectedDays, setSelectedDays] = useState<WeekDay[]>(
    habit?.selectedDays || ['M', 'W', 'F']
  );

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

  const toggleDay = (day: WeekDay) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = () => {
    if (habitId) {
      editHabit(habitId, {
        ...habit,
        selectedDays,
        frequency: selectedDays.length < 7 ? 'custom' : 'daily'
      });
      navigate(`/edit-habit/${habitId}`);
    }
  };

  const allDays: WeekDay[] = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <ThemeProvider defaultTheme="light">
      <div className="container max-w-md mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(`/edit-habit/${habitId}`)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Select Days</h1>
          <div className="w-10" />
        </header>

        <div className="mb-6">
          <p className="text-muted-foreground text-center">Choose the days for this habit.</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {allDays.slice(0, 7).map((day, index) => (
            <Button
              key={day}
              onClick={() => toggleDay(day)}
              className={`rounded-full h-14 w-14 ${
                selectedDays.includes(day) 
                  ? `bg-green-500 hover:bg-green-600 text-white` 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              variant={selectedDays.includes(day) ? "default" : "outline"}
            >
              {day}
            </Button>
          ))}
        </div>

        <div className="space-y-3 mt-10">
          {dayNames.map((name, index) => (
            <Button
              key={name}
              onClick={() => toggleDay(allDays[index])}
              className={`w-full justify-start text-left p-4 ${
                selectedDays.includes(allDays[index]) 
                  ? 'bg-gray-100' 
                  : 'bg-transparent'
              }`}
              variant="ghost"
            >
              {name}
            </Button>
          ))}
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

export default SelectDays;
