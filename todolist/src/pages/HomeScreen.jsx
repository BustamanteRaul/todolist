import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CompletedChart from "../components/completed";
import Header from "../components/header";
import Navbar from "../components/navbar";
import { useTasks } from "../context/TaskContext";

export default function HomeScreen() {
  const { tasks, addTask, toggleTask, editTask, deleteTask } = useTasks();
  const [inputValue, setInputValue] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const navigate = useNavigate();

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    addTask(inputValue.trim());
    setInputValue("");
  };

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
      <button className="logout-button" onClick={() => navigate("/")}>
        Log-Out
      </button>
      <div className="todo-container">
        <CompletedChart tasks={tasks} />
        <form className="todo-input-section" onSubmit={addTaskHandler}>
          <input
            type="text"
            placeholder="Nueva tarea"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>

        <ul className="todo-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`todo-item ${task.completed ? "todo-item--completed" : ""}`}
            >
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
          ))}
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
                  {tasks.find((t) => t.id === activeTaskId)?.text}
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
                  {tasks.find((t) => t.id === activeTaskId)?.completed
                    ? "Reabrir"
                    : "Completada"}
                </button>
                <button
                  type="button"
                  className="action-sheet__btn"
                  onClick={() =>
                    startEditing(tasks.find((t) => t.id === activeTaskId))
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
