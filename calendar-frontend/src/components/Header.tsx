interface HeaderProps {
  setCalendarView: (view: string) => void;
}

function Header({ setCalendarView }: HeaderProps) {
  return (
    <header className="bg-gray-200 p-4 flex flex-col gap-2">
      {/* Row 1: Logo */}
      <div className="flex justify-center">
        <div className="text-xl font-bold">Calendar</div>
      </div>

      {/* Row 2: Controls */}
      <div className="flex items-center justify-between">
        {/* Left: Settings button */}
        <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
          ⚙️
        </button>

        {/* Right: View buttons + Add button */}
        <div className="flex items-center gap-2">
          <button onClick={() => setCalendarView("timeGridDay")} className="px-3 py-1 rounded bg-gray-300">Day</button>
          <button onClick={() => setCalendarView("timeGridWeek")} className="px-3 py-1 rounded bg-gray-300">Week</button>
          <button onClick={() => setCalendarView("dayGridMonth")} className="px-3 py-1 rounded bg-gray-300">Month</button>
          <button onClick={() => setCalendarView("dayGridYear")} className="px-3 py-1 rounded bg-gray-300">Year</button>
          <button className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
            ＋
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
