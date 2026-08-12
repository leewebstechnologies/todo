"use client";

import { useState, useEffect } from "react";
import { Task } from "../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedTasks = window.localStorage.getItem("tasks");
      return savedTasks ? (JSON.parse(savedTasks) as Task[]) : [];
    } catch (error) {
      console.error("Failed to parse tasks from local storage", error);
      return [];
    }
  });

  // Save tasks whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to local storage", error);
      }
    }
  }, [tasks]);

  // Add a new task
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  // Update an existing task
  const updateTask = (
    id: string,
    updates: Partial<Omit<Task, "id" | "createdAt">>,
  ) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  };
}
