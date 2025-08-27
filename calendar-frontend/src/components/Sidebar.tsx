import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Sidebar() {
  // Value can be Date, Date[], or null, but here we’ll just allow Date | null
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <aside className="w-64 bg-gray-100 p-4 flex flex-col gap-4">
      {/* Small Calendar */}
      <div className="bg-white shadow rounded p-2">
        <Calendar value={date} onChange={(value) => setDate(value as Date)} />
      </div>

      {/* TODO list */}
      <div className="flex-1 bg-white shadow rounded p-4">
        <h2 className="font-bold mb-2">TODO LIST</h2>
        <ul className="list-disc pl-4">
          <li>Eggs</li>
          <li>Milk</li>
          <li>Carrots</li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
