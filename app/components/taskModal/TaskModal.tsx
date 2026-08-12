"use client";
import { useState } from "react";
import { X } from "lucide-react";
import styles from "./taskModal.module.css";
import { Task, TaskPriority, TaskStatus } from "@/app/lib/types";
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, "id" | "createdAt">) => void;
  editingTask?: Task | null;
}
const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  editingTask,
}: TaskModalProps) => {
  const [title, setTitle] = useState(editingTask?.title ?? "");
  const [description, setDescription] = useState(
    editingTask?.description ?? "",
  );
  const [status, setStatus] = useState<TaskStatus>(
    editingTask?.status ?? "To Do",
  );
  const [priority, setPriority] = useState<TaskPriority>(
    editingTask?.priority ?? "Medium",
  );
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ?? "");
  const [error, setError] = useState("");
  if (!isOpen) {
    return null;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }
    onSave({
      title: trimmedTitle,
      description: description.trim() || undefined,
      status,
      priority,
      dueDate: dueDate || undefined,
    });
    onClose();
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      {" "}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {" "}
        <div className={styles.header}>
          {" "}
          <h2 className={styles.title}>
            {" "}
            {editingTask ? "Edit Task" : "New Task"}{" "}
          </h2>{" "}
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            {" "}
            <X size={24} />{" "}
          </button>{" "}
        </div>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div className={styles.form}>
            {" "}
            {/* Title */}{" "}
            <div className={styles.formGroup}>
              {" "}
              <label htmlFor="title" className={styles.label}>
                {" "}
                Title{" "}
                <span style={{ color: "var(--destructive)" }}>*</span>{" "}
              </label>{" "}
              <input
                id="title"
                type="text"
                className={styles.input}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) {
                    setError("");
                  }
                }}
                placeholder="What needs to be done?"
                autoFocus
              />{" "}
              {error && <p className={styles.error}> {error} </p>}{" "}
            </div>{" "}
            {/* Description */}{" "}
            <div className={styles.formGroup}>
              {" "}
              <label htmlFor="description" className={styles.label}>
                {" "}
                Description{" "}
              </label>{" "}
              <textarea
                id="description"
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details..."
              />{" "}
            </div>{" "}
            {/* Status and Priority */}{" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {" "}
              {/* Status */}{" "}
              <div className={styles.formGroup}>
                {" "}
                <label htmlFor="status" className={styles.label}>
                  {" "}
                  Status{" "}
                </label>{" "}
                <select
                  id="status"
                  className={styles.select}
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="priority" className={styles.label}>
                  Priority
                </label>
                <select
                  id="priority"
                  className={styles.select}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dueDate" className={styles.label}>
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                className={styles.input}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.submitButton}`}
            >
              {editingTask ? "Save Changes" : "Create Task"}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default TaskModal;
