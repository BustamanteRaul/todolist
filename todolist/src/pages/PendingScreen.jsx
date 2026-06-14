import { useState } from "react";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useTasks } from "../context/TaskContext";

export default function PendingScreen() {
  const { tasks, toggleTask, editTask, deleteTask } = useTasks();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const pendingTasks = tasks.filter((t) => !t.completed);

  const startEditing = (task) => {
    setEditValue(task.text);
    setEditingTaskId(task.id);
    setActiveTaskId(null);
  };

  const saveEdit = () => {
    if (editValue.trim() === "") return;
    editTask(editingTaskId, editValue.trim());
    setEditingTaskId(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditValue("");
  };

  return (
    <>
      <Navbar />
      <Header />
      <div className="todo-container">
        <h2>Tareas Pendientes</h2>
        <ul className="todo-list">
          {pendingTasks.length === 0 ? (
            <li className="todo-empty">No hay tareas pendientes</li>
          ) : (
            pendingTasks.map((task) => (
              <li key={task.id} className="todo-item">
                {editingTaskId === task.id ? (
                  <input
                    className="todo-item__edit-input"
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                      if (e.key === "Escape") cancelEdit();
                    }}
                    onBlur={saveEdit}
                    autoFocus
                  />
                ) : (
                  <span className="todo-item__text">{task.text}</span>
                )}
                <button
                  type="button"
                  className="todo-item__menu"
                  aria-label="Opciones de la tarea"
                  onClick={() => setActiveTaskId(task.id)}
                >
                  ...
                </button>
              </li>
            ))
          )}
        </ul>

        {activeTaskId !== null && (
          <div
            className="action-sheet-overlay"
            role="presentation"
            onClick={() => setActiveTaskId(null)}
          >
            <div
              className="action-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="action-sheet-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="action-sheet__panel">
                <p id="action-sheet-title" className="action-sheet__title">
                  {pendingTasks.find((t) => t.id === activeTaskId)?.text}
                </p>
                <div className="action-sheet__separator" />
                <button
                  type="button"
                  className="action-sheet__btn"
                  onClick={() => {
                    toggleTask(activeTaskId);
                    setActiveTaskId(null);
                  }}
                >
                  Completada
                </button>
                <button
                  type="button"
                  className="action-sheet__btn"
                  onClick={() =>
                    startEditing(
                      pendingTasks.find((t) => t.id === activeTaskId),
                    )
                  }
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="action-sheet__btn action-sheet__btn--destructive"
                  onClick={() => {
                    deleteTask(activeTaskId);
                    setActiveTaskId(null);
                  }}
                >
                  Eliminar
                </button>
                <div className="action-sheet__separator" />
                <button
                  type="button"
                  className="action-sheet__btn action-sheet__btn--cancel"
                  onClick={() => setActiveTaskId(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
