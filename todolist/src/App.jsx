import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
  const [tasks, setTasks] = useState([]);
  const addTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const newTask = inputValue.trim();
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  return (
    <>
      <div className="todo-container">
        <header className="todo-header">
          <h1>Mis tareas</h1>
        </header>
      </div>

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
            <span className="todo-item_text">{task}</span>
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
    </>
  );
}

export default App;
