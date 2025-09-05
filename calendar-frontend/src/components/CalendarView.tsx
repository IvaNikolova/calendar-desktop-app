import { useEffect, useRef, useState } from "react";
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
  onViewChange: (view: string) => void;
  resetView?: boolean;
};

function CalendarView({ view, onViewChange, resetView }: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [clickedMonth, setClickedMonth] = useState<Date | null>(null);

  useEffect(() => {
    const api: CalendarApi | null = calendarRef.current?.getApi() ?? null;
    if (!api) return;

    if (view === "timeGridDay") {
      if (clickedDate && !resetView) {
        api.changeView("timeGridDay", clickedDate);
      } else {
        api.changeView("timeGridDay", new Date());
        setClickedDate(null);
      }
    } else if (view === "dayGridMonth") {
      if (clickedMonth && !resetView) {
        api.changeView("dayGridMonth", clickedMonth);
      } else {
        api.changeView("dayGridMonth", new Date());
        setClickedMonth(null);
      }
    } else {
      api.changeView(view, new Date());
      if (view !== "timeGridDay") setClickedDate(null);
      if (view !== "dayGridMonth") setClickedMonth(null);
    }

    onViewChange(view);
  }, [view, resetView, clickedDate, clickedMonth, onViewChange]);

  return (
    <div className="bg-white border border-gray-200 shadow rounded  h-full">
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
        headerToolbar={{
          left: "title",
          center: "", 
          right: "prev,next"
        }}
        views={{
          multiMonthYear: {
            type: "multiMonth",
            duration: { years: 1 },
          },
        }}
        dateClick={(info) => {
          const api = calendarRef.current?.getApi();
          if (!api) return;

          if (
            api.view.type === "dayGridMonth" ||
            api.view.type === "timeGridWeek" ||
            api.view.type === "multiMonthYear"
          ) {
            setClickedDate(info.date);
            api.changeView("timeGridDay", info.date);
            onViewChange("timeGridDay");
          }
        }}
        dayCellDidMount={(arg) => {
          if (arg.view.type === "multiMonthYear" && arg.date.getDate() === 1) {
            arg.el.style.cursor = "pointer";
            arg.el.style.fontWeight = "bold";
            arg.el.style.color = "#166534";
            arg.el.style.backgroundColor = "#f0fdf4";
            arg.el.style.borderRadius = "6px";
            arg.el.style.padding = "2px 4px";

            arg.el.addEventListener("click", () => {
              const api = calendarRef.current?.getApi();
              if (api) {
                setClickedMonth(arg.date);
                api.changeView("dayGridMonth", arg.date);
                onViewChange("dayGridMonth");
              }
            });
          }
        }}
        viewDidMount={(arg) => {
          onViewChange(arg.view.type);
        }}
      />
    </div>
  );
}

export default CalendarView;
