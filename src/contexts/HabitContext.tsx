
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit, HabitFormData, HabitColor } from '@/types/habit';
import { useToast } from '@/hooks/use-toast';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habitData: HabitFormData) => void;
  toggleHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  editHabit: (id: string, habitData: HabitFormData) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    icon: '🧘',
    color: 'mint',
    frequency: 'daily',
    completed: false,
    streak: 3,
    longestStreak: 7,
    createdAt: new Date().toISOString(),
    completionDates: [
      new Date(Date.now() - 86400000).toISOString(),
      new Date(Date.now() - 86400000 * 2).toISOString(),
      new Date(Date.now() - 86400000 * 3).toISOString(),
    ],
  },
  {
    id: '2',
    name: 'Read 20 Pages',
    icon: '📚',
    color: 'lavender',
    frequency: 'daily',
    completed: false,
    streak: 5,
    longestStreak: 14,
    createdAt: new Date().toISOString(),
    completionDates: [
      new Date(Date.now() - 86400000).toISOString(),
      new Date(Date.now() - 86400000 * 2).toISOString(),
      new Date(Date.now() - 86400000 * 3).toISOString(),
      new Date(Date.now() - 86400000 * 4).toISOString(),
      new Date(Date.now() - 86400000 * 5).toISOString(),
    ],
  },
  {
    id: '3',
    name: 'Drink 2L Water',
    icon: '💧',
    color: 'blue',
    frequency: 'daily',
    completed: false,
    streak: 2,
    longestStreak: 10,
    createdAt: new Date().toISOString(),
    completionDates: [
      new Date(Date.now() - 86400000).toISOString(),
      new Date(Date.now() - 86400000 * 2).toISOString(),
    ],
  },
  {
    id: '4',
    name: 'Exercise',
    icon: '🏋️',
    color: 'coral',
    frequency: 'weekly',
    completed: false,
    streak: 3,
    longestStreak: 8,
    createdAt: new Date().toISOString(),
    completionDates: [
      new Date(Date.now() - 86400000 * 7).toISOString(),
      new Date(Date.now() - 86400000 * 14).toISOString(),
      new Date(Date.now() - 86400000 * 21).toISOString(),
    ],
  },
];

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : defaultHabits;
  });
  
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: HabitFormData) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      ...habitData,
      completed: false,
      streak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      completionDates: [],
    };

    setHabits((prev) => [...prev, newHabit]);
    toast({
      title: "Habit created",
      description: `${habitData.name} has been added to your habits`,
    });
  };

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          const isCompleting = !habit.completed;
          const today = new Date().toISOString().split('T')[0];
          const hasCompletedToday = habit.completionDates.some(
            (date) => date.split('T')[0] === today
          );

          let newStreak = habit.streak;
          let newLongestStreak = habit.longestStreak;
          let newCompletionDates = [...habit.completionDates];

          if (isCompleting && !hasCompletedToday) {
            newStreak += 1;
            newCompletionDates.push(new Date().toISOString());
            
            if (newStreak > newLongestStreak) {
              newLongestStreak = newStreak;
            }

            if (newStreak === 7 || newStreak === 30) {
              toast({
                title: "Milestone reached! 🎉",
                description: `You've maintained your ${habit.name} habit for ${newStreak} days!`,
              });
            }
          } else if (!isCompleting && hasCompletedToday) {
            newStreak = Math.max(0, newStreak - 1);
            newCompletionDates = newCompletionDates.filter(
              (date) => date.split('T')[0] !== today
            );
          }

          return {
            ...habit,
            completed: isCompleting,
            streak: newStreak,
            longestStreak: newLongestStreak,
            completionDates: newCompletionDates,
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id: string) => {
    const habitToDelete = habits.find(h => h.id === id);
    if (habitToDelete) {
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
      toast({
        title: "Habit deleted",
        description: `${habitToDelete.name} has been removed from your habits`,
      });
    }
  };

  const editHabit = (id: string, habitData: HabitFormData) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            ...habitData,
          };
        }
        return habit;
      })
    );
    
    toast({
      title: "Habit updated",
      description: `${habitData.name} has been updated`,
    });
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit, editHabit }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
