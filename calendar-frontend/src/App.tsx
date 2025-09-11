import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CalendarView from "./components/CalendarView";
import "./App.css";


function App() {
  const [view, setView] = useState("dayGridMonth"); // default view
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Called only when user clicks a button in the Header.
  // We WANT to reset the sidebar todo-list to today in this case.
  const handleHeaderViewChange = (newView: string) => {
    setView(newView);
    setSelectedDate(new Date()); // reset to TODAY only for header button clicks
  };

  // Called by CalendarView when the calendar itself changes view programmatically
  // (e.g. when user clicked a date -> calendar changed to "timeGridDay",
  // or when internal calendar navigation fires). Do NOT reset selectedDate here.
  const handleCalendarViewChange = (newView: string) => {
    setView(newView);
    // intentionally do NOT call setSelectedDate(...) so the selected day remains
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Pass the header-only handler to Header (user clicks) */}
      <Header currentView={view} onChangeView={handleHeaderViewChange} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar gets the shared selectedDate and todos state */}
        <Sidebar
          selectedDate={selectedDate}
        />

        <main className="flex-1 p-2 bg-white overflow-auto">
          {/* Pass the calendar-only handler to CalendarView */}
          <CalendarView
            view={view}
            onViewChange={handleCalendarViewChange}
            onDateChange={setSelectedDate}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
