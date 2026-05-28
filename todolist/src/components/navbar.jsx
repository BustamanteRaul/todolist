const TABS = [
  { id: "all", label: "Todas", Icon: IconList },
  { id: "completed", label: "Completadas", Icon: IconCheckCircle },
  { id: "pending", label: "Pendientes", Icon: IconCircle },
];

function IconList({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function IconCheckCircle({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconCircle({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="todo-navbar" aria-label="Filtrar tareas">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`todo-navbar__tab ${activeTab === id ? "todo-navbar__tab--active" : ""}`}
          onClick={() => setActiveTab(id)}
          aria-current={activeTab === id ? "page" : undefined}
        >
          <Icon className="todo-navbar__icon" />
          <span className="todo-navbar__label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
