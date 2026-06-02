import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Navbar from "../components/navbar";

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState("");
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const addTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTask = inputValue.trim();
    setTasks([...tasks, newTask]);
    setInputValue("");
  };
  return (
    <>
      <Navbar />
      <Header />
      <button className="logout-button" onClick={() => navigate("/")}>
        Log-Out
      </button>
      <div className="todo-container">
        <form className="todo-input-section" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Nueva tarea"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>

        {/* Lista de tareas / To-Do List */}
        <ul className="todo-list">
          {tasks.map((task, index) => (
            <li key={index} className="todo-item">
              <span className="todo-item__text">{task}</span>
              <button
                type="button"
                className="todo-item__menu"
                aria-label="Opciones de la tarea"
                onClick={() => setActiveTaskIndex(index)}
              >
                ...
              </button>
            </li>
          ))}
        </ul>

        {activeTaskIndex !== null && (
          <div
            className="action-sheet-overlay"
            role="presentation"
            onClick={() => setActiveTaskIndex(null)}
          >
            <div
              className="action-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="action-sheet-title"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Panel acción / Action panel */}
              <div className="action-sheet__panel">
                <p id="action-sheet-title" className="action-sheet__title">
                  {tasks[activeTaskIndex]}
                </p>
                <div className="action-sheet__separator" />
                <button
                  type="button"
                  className="action-sheet__btn"
                  onClick={() => {
                    alert("Completada");
                    setActiveTaskIndex(null);
                  }}
                >
                  Completada
                </button>

                <button
                  type="button"
                  className="action-sheet__btn action-sheet__btn--cancel"
                  onClick={() => setActiveTaskIndex(null)}
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
