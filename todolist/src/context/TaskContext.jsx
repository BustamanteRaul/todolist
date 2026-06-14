import { createContext, useContext, useState } from "react";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const syncTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = (text) => {
    const newTask = { id: crypto.randomUUID(), text, completed: false };
    syncTasks([...tasks, newTask]);
  };

  const toggleTask = (id) =>
    syncTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );

  const editTask = (id, newText) =>
    syncTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));

  const deleteTask = (id) => syncTasks(tasks.filter((t) => t.id !== id));

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, editTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}
