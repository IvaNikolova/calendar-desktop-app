import { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import type { CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth"; 
import "./YearView.css";


type CalendarViewProps = {
  view: string;
};

function CalendarView({ view }: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    const api: CalendarApi | null = calendarRef.current
      ? calendarRef.current.getApi()
      : null;
    if (api) {
      api.changeView(view);
    }
  }, [view]);

  return (
    <div className="bg-white shadow rounded p-4 h-full">
      <FullCalendar
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin,
          multiMonthPlugin, 
        ]}
        initialView="dayGridMonth"
        height="100%"
        events={[
          { title: "Meeting", date: "2025-09-03" },
          { title: "Shopping", date: "2025-09-05" },
        ]}
        views={{
          multiMonthYear: {
            type: "multiMonth",
            duration: { years: 1 }, 
          },
        }}
      />
    </div>
  );
}

export default CalendarView;
