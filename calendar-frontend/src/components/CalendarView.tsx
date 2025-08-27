import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

interface CalendarViewProps {
  view: string;
}

function CalendarView({ view }: CalendarViewProps) {
  const options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: view,
    headerToolbar: false,
    height: "100%",
    events: [
      { title: "Meeting", date: "2025-08-27" },
      { title: "Shopping", date: "2025-08-28" },
    ],
  };

  return (
    <div className="h-full bg-white shadow rounded p-4">
      <FullCalendar {...options} />
    </div>
  );
}

export default CalendarView;
