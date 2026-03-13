import { useState, useEffect } from "react";
import { toast } from "sonner";
import * as taskService from "@/services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      setError(error.message);
      toast.error("Error fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await taskService.createTask(title, false);
      setTasks([...tasks, response.data]);
      toast.success("Task added successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding task");
      throw error;
    }
  };

  const updateTask = async (id, data) => {
    try {
      const response = await taskService.updateTask(id, data);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success("Task updated successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating task");
      throw error;
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task removed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing task");
      throw error;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,
  };
};
