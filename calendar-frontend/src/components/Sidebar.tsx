import { useState } from "react";
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

  // todos stored as { "YYYY-MM-DD": [...] }
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});
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
        <h2 className="font-bold mb-2">TODO LIST for {selectedDateKey}</h2>

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
                    className={`w-4 h-4 mt-1 border rounded flex-shrink-0 flex items-center justify-center ${
                      todo.done ? "bg-green-500 text-white border-green-500" : "bg-white border-gray-400"
                    }`}
                  >
                    {todo.done ? "✔" : ""}
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
                  className="text-red-500 text-xs ml-2 flex-shrink-0 w-5 text-center"
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
