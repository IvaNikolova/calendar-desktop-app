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
  onDateChange: (date: Date) => void;
};

export default function CalendarView({
  view,
  onViewChange,
  resetView,
  onDateChange,
}: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [clickedDate, setClickedDate] = useState<Date | null>(null);
  const [clickedMonth, setClickedMonth] = useState<Date | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  // sync view -> calendar. clickedDate only applies to Day view, clickedMonth only to Month view
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, resetView, clickedDate, clickedMonth]);

  // Helper: parse "October 2025" -> Date(2025, 9, 1)
  

  // Bind handlers + styling to month title elements inside the multimonth view container
  const bindMonthTitleButtons = () => {
    const monthEls = document.querySelectorAll<HTMLElement>(
      ".fc-multimonth-month .fc-multimonth-title"
    );

    monthEls.forEach((el) => {
      const parent = el.closest(".fc-multimonth-month") as HTMLElement | null;
      if (!parent) return;

      // FullCalendar gives parent like data-date="2025-10"
      const dataDate = parent.getAttribute("data-date"); // e.g. "2025-10"
      if (!dataDate) return;

      const [yearStr, monthStr] = dataDate.split("-");
      const year = parseInt(yearStr, 10);
      const monthIndex = parseInt(monthStr, 10) - 1; // zero-based

      const date = new Date(year, monthIndex, 1);

      // make label look clickable
      el.style.cursor = "pointer";
      el.style.padding = "2px 6px";
      el.style.borderRadius = "6px";
      el.style.fontWeight = "600";
      el.style.color = "#064e3b";
      el.style.background =
        clickedMonth && clickedMonth.getTime() === date.getTime()
          ? "#bbf7d0"
          : "#f0fdf4";

      // prevent duplicate bindings
      if (el.dataset.bindMonth === "1") return;
      el.dataset.bindMonth = "1";

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setClickedMonth(date);

        const api = calendarRef.current?.getApi();
        api?.changeView("dayGridMonth", date);
        onViewChange("dayGridMonth");
      });
    });
  };

  // Attach a MutationObserver so when FullCalendar re-renders the multimonth DOM (e.g. next/prev year),
  // we re-bind the buttons and re-style them.
  useEffect(() => {
    // cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    // only observe when year view is visible
    if (view !== "multiMonthYear") {
      // But still ensure titles styled if sidebar etc. changed
      // (no observer)
      bindMonthTitleButtons();
      return;
    }

    // Wait a tick so DOM exists (FullCalendar renders async)
    const tryBind = () => {
      bindMonthTitleButtons();
    };

    // initial bind (may need a short delay)
    setTimeout(tryBind, 0);

    // observe the container for changes (re-bind on DOM changes)
    const root = document.querySelector(".fc-multimonth") ?? document.querySelector(".fc");
    if (!root) return;

    const observer = new MutationObserver(() => {
      // re-bind and re-style when structure changes
      bindMonthTitleButtons();
    });
    observer.observe(root, { childList: true, subtree: true });
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, clickedMonth]);

  // Re-apply styling when clickedMonth changes (so highlight updates without DOM recreation)
  useEffect(() => {
    bindMonthTitleButtons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedMonth]);

  return (
    <div className="bg-white border border-gray-200 shadow rounded h-full">
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
          right: "prev,next",
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
            onDateChange(info.date);
          }
        }}
        viewDidMount={(arg) => {
          // keep header in sync
          onViewChange(arg.view.type);
          // initial bind on mount
          setTimeout(() => bindMonthTitleButtons(), 0);
        }}
        datesSet={(arg) => {
          if (arg.view.type === "timeGridDay") {
            onDateChange(arg.start);
          }
          // when date range changes (e.g. next/prev year), re-bind
          if (arg.view.type === "multiMonthYear") {
            setTimeout(() => bindMonthTitleButtons(), 0);
          }
        }}
      />
    </div>
  );
}
