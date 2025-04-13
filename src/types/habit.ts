
export type HabitColor = 'mint' | 'lavender' | 'peach' | 'coral' | 'yellow' | 'blue' | 'pink';
export type WeekDay = 'S' | 'M' | 'T' | 'W' | 'Th' | 'F' | 'Sa';

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: HabitColor;
  frequency: 'daily' | 'weekly' | 'custom';
  completed: boolean;
  streak: number;
  longestStreak: number;
  createdAt: string;
  completionDates: string[];
  reminderTime?: string;
  selectedDays?: WeekDay[];
}

export interface HabitFormData {
  name: string;
  icon: string;
  color: HabitColor;
  frequency: 'daily' | 'weekly' | 'custom';
  reminderTime?: string;
  selectedDays?: WeekDay[];
}
