import { Calendar, Edit2, Trash2 } from "lucide-react";
import styles from "./TaskCard.module.css";
import { Task } from "@/app/lib/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "To Do":
        return styles.statusTodo;
      case "In Progress":
        return styles.statusInProgress;
      case "Done":
        return styles.statusDone;
      default:
        return "";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "Low":
        return styles.priorityLow;
      case "Medium":
        return styles.priorityMedium;
      case "High":
        return styles.priorityHigh;
      default:
        return "";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{task.title}</h3>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}
        </div>
      </div>

      <div className={styles.badges}>
        <span className={`${styles.badge} ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
        <span className={`${styles.badge} ${getPriorityClass(task.priority)}`}>
          {task.priority} Priority
        </span>
      </div>

      <div className={styles.footer}>
        <div className={styles.date}>
          <Calendar size={14} />
          <span>
            {task.dueDate
              ? `Due: ${formatDate(task.dueDate)}`
              : `Added: ${formatDate(task.createdAt)}`}
          </span>
        </div>
        <div className={styles.actions}>
          <button
            onClick={() => onEdit(task)}
            className={styles.iconButton}
            aria-label="Edit task"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this task?")
              ) {
                onDelete(task.id);
              }
            }}
            className={`${styles.iconButton} ${styles.deleteButton}`}
            aria-label="Delete task"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskCard;
