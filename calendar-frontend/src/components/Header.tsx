type HeaderProps = {
  currentView: string;
  onChangeView: (view: string) => void;
};

function Header({ currentView, onChangeView }: HeaderProps) {
  const buttonClasses = (view: string) =>
    `px-4 py-1 rounded transition-colors ${
      currentView === view
        ? "bg-green-500 text-white"
        : "bg-gray-200 hover:bg-gray-300"
    }`;

  return (
    <header className="bg-white shadow p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">📅 Calendar</h1>

      {/* Main button row */}
      <div className="relative w-full flex items-center">
        {/* Settings button on the left */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
          <span className="">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </span>
        </button>

        {/* Centered view buttons */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-2">
          <button
            className={buttonClasses("timeGridDay")}
            onClick={() => onChangeView("timeGridDay")}
          >
            Day
          </button>
          <button
            className={buttonClasses("timeGridWeek")}
            onClick={() => onChangeView("timeGridWeek")}
          >
            Week
          </button>
          <button
            className={buttonClasses("dayGridMonth")}
            onClick={() => onChangeView("dayGridMonth")}
          >
            Month
          </button>
          <button
            className={buttonClasses("multiMonthYear")}
            onClick={() => onChangeView("multiMonthYear")}
          >
            Year
          </button>
        </div>

        {/* + button on the right */}
        <div className="ml-auto">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300">
            <span className="flex gap-1 text-black font-bold text-lg">
              <span>+</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
