
import { useState } from 'react';
import { ArrowLeft, Clock, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useHabits } from '@/contexts/HabitContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { toast } from '@/hooks/use-toast';

const HabitDetail = () => {
  const { habitId } = useParams();
  const navigate = useNavigate();
  const { habits, deleteHabit } = useHabits();
  
  const habit = habits.find(h => h.id === habitId);
  
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

  const handleDelete = () => {
    deleteHabit(habit.id);
    toast({
      title: "Habit deleted",
      description: "Your habit has been deleted successfully",
      variant: "destructive",
    });
    navigate('/');
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
          <div className="text-xl font-bold flex items-center">
            <span className="text-2xl mr-2">{habit.icon}</span>
            {habit.name}
          </div>
          <ThemeToggle />
        </header>

        <Card className="p-6 mb-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">Daily</div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-muted-foreground"
                  onClick={() => navigate(`/habit/${habit.id}/frequency`)}
                >
                  <span>
                    {habit.frequency === 'daily' ? 'Every day' : 
                     habit.frequency === 'weekly' ? 'Once a week' : 
                     habit.selectedDays?.length === 7 ? 'Every day' : 
                     habit.selectedDays?.length === 0 ? 'No days selected' : 
                     `${habit.selectedDays?.length} days a week`}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">Time Range</div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-muted-foreground"
                  onClick={() => navigate(`/habit/${habit.id}/time`)}
                >
                  <span>{habit.timeRange || 'Anytime'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-lg font-medium">Reminder</div>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-muted-foreground"
                  onClick={() => navigate(`/habit/${habit.id}/reminder`)}
                >
                  <span>{habit.reminderTime || '9:00 AM'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Button 
          variant="destructive" 
          className="w-full flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 py-3 rounded-lg transition-colors"
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Delete Habit
        </Button>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Best time to {habit.name.toLowerCase()} is early morning</h3>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute left-0 top-0 h-full bg-habit-${habit.color} rounded-full`}
              style={{ width: '65%' }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HabitDetail;
