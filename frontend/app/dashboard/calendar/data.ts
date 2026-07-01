import { EventInput } from "@fullcalendar/react"

const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: "1",
    title: "All-day event",
    start: todayStr,
    color: "#f87171",
    allDay: true,
    url: "https://www.google.com",
  },
  {
    id: "2",
    title: "Timed event",
    start: todayStr + "T12:00:00",
    color: "#f87171",
    allDay: true,
  },
]
