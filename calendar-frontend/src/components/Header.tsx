type HeaderProps = {
  currentView: string;
  onChangeView: (view: string) => void;
};

function Header({ currentView, onChangeView }: HeaderProps) {
  const buttonClasses = (view: string) =>
    `px-4 py-1 rounded transition-colors border border-gray-300 shadow  ${
      currentView === view ? "bg-green-600 text-white " : ""
    }`;

  return (
    <header className="bg-white shadow p-2 flex flex-col">
      <h1 className="relative text-4xl mb-2 flex items-center justify-center gap-2 border-b-2 border-gray-300 pb-2 after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1 after:shadow-md after:rounded-sm">
        <img src="/logo.png" alt="Logo" className="h-10 w-10" />
        Calendar
      </h1>

      {/* Main button row */}
      <div className="flex items-center w-full mt-2">
        {/* Settings button on the left */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow hover:bg-gray-50">
          <span className="flex justify-between">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </span>
        </button>

        {/* View buttons + + button on the right */}
        <div className="ml-auto flex items-center gap-1">
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

          {/* + button */}
          <div className="ml-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow hover:bg-gray-50">
              <span className="flex gap-1 text-black font-bold text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
