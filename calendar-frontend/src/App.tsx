import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  // state to track current calendar view
  const [calendarView, setCalendarView] = useState("dayGridMonth");

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Header with two rows */}
      <Header calendarView={calendarView} setCalendarView={setCalendarView} />

      {/* Body layout with sidebar and calendar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <CalendarView view={calendarView} />
        </main>
      </div>
    </div>
  );
}

export default App;
