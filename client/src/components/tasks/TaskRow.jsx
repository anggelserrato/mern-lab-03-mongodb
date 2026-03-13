import { TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";

export default function TaskRow({ task }) {
  const { updateTask, removeTask } = useTasks();

  const handleToggleComplete = async () => {
    try {
      await updateTask(task._id, { completed: !task.completed });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>{task.title}</TableCell>
      <TableCell>
        <Checkbox
          checked={task.completed}
          onCheckedChange={handleToggleComplete}
        />
      </TableCell>
      <TableCell className="text-right">
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
