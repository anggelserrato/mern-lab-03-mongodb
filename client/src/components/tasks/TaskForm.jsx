import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addTask(title);
      setTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button type="submit">Add Task</Button>
    </form>
  );
}
