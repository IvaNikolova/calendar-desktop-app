import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  const [view, setView] = useState("dayGridMonth"); // default to month view

  return (
    <div className="w-screen h-screen flex flex-col">
      <Header currentView={view} onChangeView={setView} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <CalendarView view={view} onViewChange={setView} />
        </main>
      </div>
    </div>
  );
}

export default App;
