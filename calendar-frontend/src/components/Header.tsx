type HeaderProps = {
  calendarView: string;
  setCalendarView: (view: string) => void;
};

function Header({ calendarView, setCalendarView }: HeaderProps) {
  return (
    <div className="bg-white shadow p-4">
      {/* Row 1 - Title */}
      <div className="text-2xl font-bold text-center mb-2">📅 Calendar</div>

      {/* Row 2 - Controls */}
      <div className="flex justify-between items-center">
        {/* Left: settings button */}
        <button className="p-2 rounded bg-gray-100">⚙️</button>

        {/* Middle: view buttons */}
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              calendarView === "timeGridDay"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setCalendarView("timeGridDay")}
          >
            Day
          </button>
          <button
            className={`px-3 py-1 rounded ${
              calendarView === "timeGridWeek"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setCalendarView("timeGridWeek")}
          >
            Week
          </button>
          <button
            className={`px-3 py-1 rounded ${
              calendarView === "dayGridMonth"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setCalendarView("dayGridMonth")}
          >
            Month
          </button>
          <button
            className={`px-3 py-1 rounded ${
              calendarView === "multiMonthYear"
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setCalendarView("multiMonthYear")}>
            Year
            </button>
        </div>

        {/* Right: add new event */}
        <button className="p-2 rounded bg-green-500 text-white">+</button>
      </div>
    </div>
  );
}

export default Header;
