import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SmallCalendar.css";

type Todo = {
  text: string;
  done: boolean;
};

type SidebarProps = {
  selectedDate: Date;
};

function Sidebar({selectedDate,}: SidebarProps) {
  // 🔹 Local state for the small calendar
  const [miniDate, setMiniDate] = useState<Date | null>(new Date());

  // Load todos from localStorage when app starts
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>(() => {
    const saved = localStorage.getItem("todosByDate");
    return saved ? JSON.parse(saved) : {};
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todosByDate", JSON.stringify(todosByDate));
  }, [todosByDate]);
  const [newTodo, setNewTodo] = useState("");

  // Format helper (local, not UTC)
  const formatDate = (d: Date | null) => {
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateKey = formatDate(selectedDate);
  const todos = todosByDate[selectedDateKey] || [];

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodosByDate((prev) => ({
      ...prev,
      [selectedDateKey]: [...(prev[selectedDateKey] || []), { text: newTodo, done: false }],
    }));
    setNewTodo("");
  };

  const toggleDone = (i: number) => {
    setTodosByDate((prev) => {
      const updated = [...(prev[selectedDateKey] || [])];
      updated[i] = { ...updated[i], done: !updated[i].done };
      return { ...prev, [selectedDateKey]: updated };
    });
  };

  const removeTodo = (i: number) => {
    setTodosByDate((prev) => {
      const updated = [...(prev[selectedDateKey] || [])];
      updated.splice(i, 1);
      return { ...prev, [selectedDateKey]: updated };
    });
  };

  return (
    <aside className="w-64 bg-white p-2 flex flex-col gap-4">
      {/* Small Calendar (now independent) */}
      <div className="bg-white border border-gray-300 shadow rounded p-2">
        <Calendar
          value={miniDate}
          onChange={(value) => setMiniDate(value as Date)} // local only
          prev2Label={null}
          next2Label={null}
        />
      </div>

      {/* TODO LIST */}
      <div className="flex-1 bg-white border border-gray-300 shadow rounded p-4 flex flex-col">
        <div className="flex items-center justify-center">
          <h2 className="font-bold mb-2">TODO List</h2>
        </div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
          placeholder="New task..."
          className="mb-2 border border-gray-300 rounded px-2 py-1 text-sm"
        />

        <ul className="list-none flex-1-fix pl-0 overflow-y-auto">
          {todos.length === 0 ? (
            <li className="text-gray-500 italic">No tasks for this day</li>
          ) : (
            todos.map((todo, i) => (
              <li key={i} className="flex items-start justify-between py-1">
                <div className="flex items-start gap-2 flex-grow min-w-0">
                  <button
                    onClick={() => toggleDone(i)}
                    className={`w-5 h-5 mt-1 border rounded-full flex-shrink-0 flex items-center justify-center bg-white ${
                      todo.done ? "border-white" : "border-gray-400"
                    }`}
                  >
                    {todo.done && (
                      <svg
                        className="w-5 h-5 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <span
                    className={`break-words whitespace-normal flex-grow min-w-0 ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => removeTodo(i)}
                  className="text-red-500 text-xs mt-1 flex-shrink-0 w-5 text-center items-center justify-center"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
