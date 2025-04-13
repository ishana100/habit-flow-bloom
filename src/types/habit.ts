
export type HabitColor = 'mint' | 'lavender' | 'peach' | 'coral' | 'yellow' | 'blue' | 'pink';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: HabitColor;
  frequency: 'daily' | 'weekly';
  completed: boolean;
  streak: number;
  longestStreak: number;
  createdAt: string;
  completionDates: string[];
}

export interface HabitFormData {
  name: string;
  icon: string;
  color: HabitColor;
  frequency: 'daily' | 'weekly';
}
