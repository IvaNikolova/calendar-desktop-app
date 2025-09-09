import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SmallCalendar.css";

type Todo = {
  text: string;
  done: boolean;
};

function Sidebar() {
  const [date, setDate] = useState<Date | null>(new Date());

  // todos stored as { "YYYY-MM-DD": [{ text, done }, ...] }
  const [todosByDate, setTodosByDate] = useState<Record<string, Todo[]>>({});
  const [newTodo, setNewTodo] = useState("");

  // helper: format date as YYYY-MM-DD
  const formatDate = (d: Date | null) =>
    d ? d.toISOString().split("T")[0] : "";

  const selectedDateKey = formatDate(date);
  const todos = todosByDate[selectedDateKey] || [];

  // add new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodosByDate((prev) => ({
      ...prev,
      [selectedDateKey]: [
        ...(prev[selectedDateKey] || []),
        { text: newTodo.trim(), done: false },
      ],
    }));
    setNewTodo(""); // reset input
  };

  // remove a todo by index
  const removeTodo = (index: number) => {
    setTodosByDate((prev) => {
      const updated = [...(prev[selectedDateKey] || [])];
      updated.splice(index, 1);
      return {
        ...prev,
        [selectedDateKey]: updated,
      };
    });
  };

  // toggle done/undone
  const toggleDone = (index: number) => {
    setTodosByDate((prev) => {
      const updated = [...(prev[selectedDateKey] || [])];
      updated[index] = { ...updated[index], done: !updated[index].done };
      return {
        ...prev,
        [selectedDateKey]: updated,
      };
    });
  };

  return (
    <aside className="w-64 bg-white p-2 flex flex-col gap-4">
      {/* Small Calendar */}
      <div className="bg-white border border-gray-300 shadow rounded p-2">
        <Calendar
          value={date}
          onChange={(value) => setDate(value as Date)}
          prev2Label={null}
          next2Label={null}
        />
      </div>

      {/* TODO list */}
      <div className="flex-1 bg-white border border-gray-300 shadow rounded p-4 flex flex-col">
        <h2 className="font-bold mb-2">
          TODO LIST for {selectedDateKey || "no date"}
        </h2>

        {/* Input (submit with Enter) */}
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTodo();
            }
          }}
          placeholder="New task..."
          className="mb-2 border border-gray-300 rounded px-2 py-1 text-sm"
        />

        {/* Scrollable list */}
        <ul className="list-none flex-1-fix pl-0 overflow-y-auto" >
          {todos.length === 0 ? (
            <li className="text-gray-500 italic">No tasks for this day</li>
          ) : (
            todos.map((todo, i) => (
              <li key={i} className="flex items-start justify-between py-1">
                {/* Left: checkbox + text */}
                <div className="flex items-start gap-2 flex-grow min-w-0">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleDone(i)}
                    className={`w-4 h-4 mt-1 border rounded flex-shrink-0 flex items-center justify-center ${
                      todo.done
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white border-gray-400"
                    }`}
                  >
                    {todo.done ? "✔" : ""}
                  </button>

                  {/* Text (wraps before delete button) */}
                  <span
                    className={`break-words whitespace-normal flex-grow min-w-0 ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                {/* Right: delete button (fixed width) */}
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
