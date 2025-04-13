
export type WeekDay = 'S' | 'M' | 'T' | 'W' | 'Th' | 'F' | 'Sa';

export type HabitColor = 'mint' | 'lavender' | 'peach' | 'coral' | 'yellow' | 'blue' | 'pink';

export type HabitFrequency = 'daily' | 'weekly' | 'custom';

export interface HabitFormData {
  name: string;
  icon: string;
  color: HabitColor;
  frequency: HabitFrequency;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: HabitColor;
  frequency: HabitFrequency;
  createdAt: string;
  completionDates: string[];
  streak: number;
  longestStreak: number;
  selectedDays?: WeekDay[];
  timeRange?: string;
  reminderTime?: string;
}
