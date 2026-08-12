"use client";
import { Plus, Search, ClipboardList } from "lucide-react";
import styles from "./taskBoard.module.css";
import { useTasks } from "@/app/lib/hooks/useTasks";
import { useMemo, useState } from "react";
import { Task } from "@/app/lib/types";
import { filterAndSortTasks } from "@/app/lib/utils";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";

const TaskBoard = () => {
   const { tasks, addTask, updateTask, deleteTask } = useTasks();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [editingTask, setEditingTask] = useState<Task | null>(null);

   const [searchQuery, setSearchQuery] = useState("");
   const [statusFilter, setStatusFilter] = useState<string>("All");
   const [sortBy, setSortBy] = useState<string>("newest");

   const handleOpenNew = () => {
     setEditingTask(null);
     setIsModalOpen(true);
   };

   const handleOpenEdit = (task: Task) => {
     setEditingTask(task);
     setIsModalOpen(true);
   };

   const handleSave = (taskData: Omit<Task, "id" | "createdAt">) => {
     if (editingTask) {
       updateTask(editingTask.id, taskData);
     } else {
       addTask(taskData);
     }
   };

   // Filter and sort tasks using utility function
   const filteredTasks = useMemo(() => {
     return filterAndSortTasks(tasks, searchQuery, statusFilter, sortBy);
   }, [tasks, searchQuery, statusFilter, sortBy]);

  return (
    <div className={styles.board}>
      <div className={styles.controls}>
        <div className={styles.searchFilter}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.select}
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="newest">Newest First</option>
            <option value="priority">Highest Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        <button onClick={handleOpenNew} className={styles.addButton}>
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {filteredTasks.length > 0 ? (
        <div className={styles.grid}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleOpenEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <ClipboardList size={48} className="opacity-50" />
          <h3>No tasks found</h3>
          <p>
            {tasks.length === 0
              ? "You haven't created any tasks yet. Get started by adding one!"
              : "No tasks match your current filters. Try adjusting them."}
          </p>
          {tasks.length === 0 && (
            <button onClick={handleOpenNew} className={styles.addButton}>
              <Plus size={18} />
              Add Your First Task
            </button>
          )}
        </div>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
      />
    </div>
  );
};
export default TaskBoard;
