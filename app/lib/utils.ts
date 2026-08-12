import { Task } from "./types";

export function filterAndSortTasks(
  tasks: Task[],
  searchQuery: string,
  statusFilter: string,
  sortBy: string,
): Task[] {
  let result = tasks;

  if (statusFilter !== "All") {
    result = result.filter((t) => t.status === statusFilter);
  }

  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase();
    result = result.filter((t) => t.title.toLowerCase().includes(lowerQuery));
  }

  result = [...result].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "dueDate") {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortBy === "priority") {
      const priorityScore = { High: 3, Medium: 2, Low: 1 };
      return priorityScore[b.priority] - priorityScore[a.priority];
    }
    return 0;
  });

  return result;
}
