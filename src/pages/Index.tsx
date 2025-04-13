
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { HabitProvider, useHabits } from '@/contexts/HabitContext';
import { HabitCard } from '@/components/HabitCard';
import { MotivationalBanner } from '@/components/MotivationalBanner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HabitForm } from '@/components/HabitForm';
import { StreakCalendar } from '@/components/StreakCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Habit, HabitFormData } from '@/types/habit';

function DashboardContent() {
  const { habits, addHabit, editHabit } = useHabits();
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const handleAddHabit = (data: HabitFormData) => {
    addHabit(data);
    setIsAddHabitOpen(false);
  };

  const handleEditHabit = (data: HabitFormData) => {
    if (selectedHabit) {
      editHabit(selectedHabit.id, data);
      setSelectedHabit(null);
    }
  };

  const handleOpenEdit = (habit: Habit) => {
    setSelectedHabit(habit);
  };

  return (
    <div className="container max-w-md mx-auto p-4 animate-fade-in">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            HabitFlow
          </h1>
          <p className="text-sm text-muted-foreground">Build better habits, one day at a time</p>
        </div>
        <ThemeToggle />
      </header>
      
      <MotivationalBanner />
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Today's Habits</h2>
        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No habits yet. Add your first habit to get started!</p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard key={habit.id} habit={habit} onEdit={handleOpenEdit} />
            ))
          )}
        </div>
      </div>
      
      {habits.length > 0 && (
        <div className="mt-8">
          <Tabs defaultValue="streaks" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="streaks">Streaks</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            <TabsContent value="streaks" className="border rounded-md mt-2">
              {selectedTab === null ? (
                <div className="p-4 text-center">
                  <p className="text-muted-foreground mb-2">Select a habit to view streak details</p>
                  <div className="grid grid-cols-2 gap-2">
                    {habits.map((habit) => (
                      <Button
                        key={habit.id}
                        variant="outline"
                        className="flex items-center justify-center space-x-2 py-2 border-l-4"
                        style={{ borderLeftColor: `var(--habit-${habit.color})` }}
                        onClick={() => setSelectedTab(habit.id)}
                      >
                        <span>{habit.icon}</span>
                        <span className="truncate">{habit.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-sm mt-2 ml-2" 
                    onClick={() => setSelectedTab(null)}
                  >
                    ← Back
                  </Button>
                  <StreakCalendar habit={habits.find(h => h.id === selectedTab)!} />
                </>
              )}
            </TabsContent>
            <TabsContent value="insights" className="border rounded-md mt-2 p-4">
              <h3 className="font-semibold mb-3">Your Progress</h3>
              <div className="space-y-3">
                {habits.map((habit) => (
                  <div key={habit.id} className="flex items-center">
                    <div className="mr-2 text-xl">{habit.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{habit.name}</span>
                        <span className="font-medium">{habit.streak} days</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-habit-${habit.color}`}
                          style={{ 
                            width: `${(habit.streak / Math.max(habit.longestStreak, 30)) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Streak Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Current Streaks</p>
                    <p className="text-2xl font-bold mt-1">
                      {habits.reduce((total, habit) => total + habit.streak, 0)}
                    </p>
                  </div>
                  <div className="bg-secondary/50 p-3 rounded-md">
                    <p className="text-sm text-muted-foreground">Longest Streak</p>
                    <p className="text-2xl font-bold mt-1">
                      {Math.max(...habits.map(habit => habit.longestStreak), 0)}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg animate-pulse-scale"
        onClick={() => setIsAddHabitOpen(true)}
        aria-label="Add new habit"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
          </DialogHeader>
          <HabitForm 
            onSubmit={handleAddHabit} 
            onCancel={() => setIsAddHabitOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={selectedHabit !== null} onOpenChange={(open) => !open && setSelectedHabit(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          {selectedHabit && (
            <HabitForm 
              initialData={selectedHabit}
              onSubmit={handleEditHabit} 
              onCancel={() => setSelectedHabit(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <HabitProvider>
        <DashboardContent />
      </HabitProvider>
    </ThemeProvider>
  );
};

export default Index;
