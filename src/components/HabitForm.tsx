
import { useState } from 'react';
import { Habit, HabitFormData, HabitColor } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const EMOJIS = ['🏃', '💧', '📚', '🧘', '🏋️', '🥗', '💤', '🧠', '🎨', '🎮', '🎸', '💻', '🌱', '✍️', '📝', '🧹', '💊', '🍎', '🥦', '🚶'];

interface HabitFormProps {
  onSubmit: (data: HabitFormData) => void;
  onCancel: () => void;
  initialData?: Habit;
}

export function HabitForm({ onSubmit, onCancel, initialData }: HabitFormProps) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: initialData?.name || '',
    icon: initialData?.icon || '🏃',
    color: initialData?.color || 'mint',
    frequency: initialData?.frequency || 'daily',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  const colorOptions: { value: HabitColor; label: string }[] = [
    { value: 'mint', label: 'Mint' },
    { value: 'lavender', label: 'Lavender' },
    { value: 'peach', label: 'Peach' },
    { value: 'coral', label: 'Coral' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'blue', label: 'Blue' },
    { value: 'pink', label: 'Pink' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="habit-name">Habit Name</Label>
          <Input
            id="habit-name"
            placeholder="Enter habit name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Select an Icon</Label>
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map((emoji) => (
              <Button
                key={emoji}
                type="button"
                variant="outline"
                className={`h-12 text-xl ${formData.icon === emoji ? 'border-primary bg-primary/10' : ''}`}
                onClick={() => setFormData({ ...formData, icon: emoji })}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="habit-color">Color Theme</Label>
          <div className="grid grid-cols-7 gap-4 mt-2">
            {colorOptions.map((color) => (
              <div key={color.value} className="flex flex-col items-center">
                <button
                  type="button"
                  className={`h-12 w-12 rounded-full border-2 transition-all duration-200 ${
                    formData.color === color.value 
                      ? 'border-primary ring-2 ring-primary ring-offset-2' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: `var(--habit-${color.value})` }}
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  aria-label={`Select ${color.label} color`}
                />
                <span className="text-xs mt-1 text-muted-foreground">{color.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Frequency</Label>
          <RadioGroup
            value={formData.frequency}
            onValueChange={(value) => setFormData({ ...formData, frequency: value as 'daily' | 'weekly' })}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="cursor-pointer">Daily</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="weekly" id="weekly" />
              <Label htmlFor="weekly" className="cursor-pointer">Weekly</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex space-x-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Habit' : 'Create Habit'}
        </Button>
      </div>
    </form>
  );
}
