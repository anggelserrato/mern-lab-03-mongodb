import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import TaskForm from "@/components/tasks/TaskForm";
import TaskTable from "./components/tasks/TaskTable";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header />
      <TaskForm />
      <TaskTable />
      <Toaster position="top-center" richColors />
    </div>
  );
}
