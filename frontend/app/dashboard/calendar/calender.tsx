"use client"
import FullCalendar, {
  DateSelectInfo,
  EventApi,
  EventClickInfo,
  EventDisplayInfo,
  formatDate,
} from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/react/daygrid"
import interactionPlugin from "@fullcalendar/react/interaction"
import themePlugin from "@fullcalendar/react/themes/classic"
import timeGridPlugin from "@fullcalendar/react/timegrid"
import React, { useState } from "react"
import { ExtendedEventInput, INITIAL_EVENTS } from "./data"

//Css of calender
import { EventAddForm, EventAddFormValues } from "@/components/event-add-form"
import { api } from "@/lib/api"
import "@fullcalendar/react/skeleton.css"
import "@fullcalendar/react/themes/classic/palette.css"
import "@fullcalendar/react/themes/classic/theme.css"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

console.log("initial events", INITIAL_EVENTS)

export const renderBadgeEventStatus = (status: string) => {
  switch (status) {
    case "draft":
      return (
        <span className="rounded bg-gray-500 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "generating":
      return (
        <span className="rounded bg-blue-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "ready":
      return (
        <span className="rounded bg-cyan-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "review":
      return (
        <span className="rounded bg-purple-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "approved":
      return (
        <span className="rounded bg-emerald-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "scheduled":
      return (
        <span className="rounded bg-indigo-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "publishing":
      return (
        <span className="rounded bg-yellow-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "published":
      return (
        <span className="rounded bg-green-700 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "failed":
      return (
        <span className="rounded bg-red-600 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    case "rejected":
      return (
        <span className="rounded bg-rose-700 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )

    default:
      return (
        <span className="rounded bg-gray-500 px-1 py-0.5 text-[10px] font-semibold tracking-wide text-white">
          {status}
        </span>
      )
  }
}

interface DateSelectInfor {
  isOpen: boolean
  allday: boolean
  start: Date
  end: Date
}
function handleDateSelect(selectInfo: DateSelectInfo) {
  const title = prompt("Please enter a new title for your event")
  const calendarApi = selectInfo.view.calendar

  calendarApi.unselect() // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: Math.random().toString(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    })
  }
}

const Calendar = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["calendar", "events"],
    queryFn: async () => {
      const response = await api.get("/api/v1/calendar")
      return response.data as ExtendedEventInput[]
    },
  })

  console.log("Calendar Fetched events:", data)

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [eventAddOpen, setEventAddOpen] = useState<DateSelectInfor | boolean>(
    false
  )

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function handleDateSelect(selectInfo: DateSelectInfo) {
    const eventClickInfo: DateSelectInfor = {
      isOpen: true,
      start: selectInfo.start,
      end: selectInfo.end,
      allday: selectInfo.allDay,
    }
    setEventAddOpen(eventClickInfo)
  }

  async function onSubmit(data: EventAddFormValues) {
    const newEvent = {
      id: String(currentEvents.length + 1),
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
      color: data.color,
    }

    console.log("newEvent", data)
    // setCurrentEvents((prevEvents) => [...prevEvents, newEvent])
    setEventAddOpen(false)
    toast("Event has been created", {
      description: "You can view your event in the calendar.",
      action: {
        label: "Dismiss",
        onClick: () => toast.dismiss(),
      },
    })
  }
  function handleEventClick(clickInfo: EventClickInfo) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove()
    }
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events)
  }
  return (
    <>
      <FullCalendar
        className="demo-app-calendar"
        plugins={[
          themePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        nowIndicator={true}
        buttonDisplay="auto"
        dayMaxEvents={true}
        weekends={weekendsVisible}
        events={data ?? []} // alternatively, use the `events` setting to fetch from a feed
        initialEvents={INITIAL_EVENTS}
        select={handleDateSelect} // called when a date is selected
        eventContent={renderEventContent} // custom render function
        eventClick={(eventInfo) => handleEventClick(eventInfo)}
        eventsSet={handleEvents} // called after events are initialized/added/changed/removed
        /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
      />

      <EventAddForm
        allday={typeof eventAddOpen === "boolean" ? false : eventAddOpen.allday}
        start={
          typeof eventAddOpen === "boolean" ? new Date() : eventAddOpen.start
        }
        end={typeof eventAddOpen === "boolean" ? new Date() : eventAddOpen.end}
        eventAddOpen={
          typeof eventAddOpen === "boolean" ? false : eventAddOpen.isOpen
        }
        setEventAddOpen={setEventAddOpen}
        handleSubmit={onSubmit}
      />
    </>
  )
}

function renderEventContent(eventInfo: EventDisplayInfo) {
  const { topic, channel, pillar, status, subtopics, keywords } = eventInfo
    .event.extendedProps as ExtendedEventInput
  console.log("eventInfo", eventInfo)

  // console.log("eventInfo", eventInfo.event.extendedProps)
  return (
    <div className="flex flex-col gap-0.5 overflow-hidden px-1 py-0.5">
      <b className="text-xs">{eventInfo.timeText}</b>
      <p className="truncate text-xs font-medium">{topic}</p>
      <div className="flex items-center gap-1 text-[10px]">
        <span
          className="rounded px-1 py-0.5 font-medium"
          style={{ backgroundColor: eventInfo.event.color }}
        >
          {pillar}
        </span>
        <span className="opacity-70">{channel.replace(/_/g, " ")}</span>
      </div>
      <div className="flex items-center gap-1">
        {renderBadgeEventStatus(status)}
      </div>
    </div>
  )
}
export default Calendar
