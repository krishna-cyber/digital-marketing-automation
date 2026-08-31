"use client"
import FullCalendar, {
  DateSelectInfo,
  EventApi,
  EventClickInfo,
  EventDisplayInfo,
} from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/react/daygrid"
import interactionPlugin from "@fullcalendar/react/interaction"
import themePlugin from "@fullcalendar/react/themes/classic"
import timeGridPlugin from "@fullcalendar/react/timegrid"
import React, { useState } from "react"

//Css of calender
import { EventAddFormValues } from "@/components/event-add-form"

import { api } from "@/lib/api"
import { ExtendedEventInput } from "@/types/types"
import "@fullcalendar/react/skeleton.css"
import "@fullcalendar/react/themes/classic/palette.css"
import "@fullcalendar/react/themes/classic/theme.css"
import { useQuery } from "@tanstack/react-query"

import { parseAsString, useQueryStates } from "nuqs"
import { toast } from "sonner"

import { CalendarEventFilters } from "./calendar-event-filters"
import EventDetailsDrawer from "./event-details-drawer"

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

const searchParams = {
  channels: parseAsString.withDefault(""),
  pillar: parseAsString.withDefault(""), // 0-indexed, table-internal
  status: parseAsString.withDefault(""),
}

const Calendar = ({
  events: providedEvents = [],
}: {
  events?: ExtendedEventInput[]
}) => {
  //nuqs query states for filters
  const [{ channels, pillar, status }, setSearchFilters] =
    useQueryStates(searchParams)

  const { data: fetchedEvents, isFetching } = useQuery({
    queryKey: ["calendar", "events", { channels, pillar, status }],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "50", offset: "0" })
      if (channels) params.set("channels", channels)
      if (pillar) params.set("pillar", pillar)
      if (status) params.set("status", status)
      const response = await api.get(`/api/v1/calendar?${params.toString()}`)
      return (response.data.data as ExtendedEventInput[]) || []
    },
    enabled: providedEvents.length === 0,
    placeholderData: (previousData) => previousData,
  })

  const data = providedEvents.length > 0 ? providedEvents : fetchedEvents

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
  const [eventAddOpen, setEventAddOpen] = useState<DateSelectInfor | boolean>(
    false
  )
  const [eventDetailsOpen, setEventDetailsOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

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
    console.log("newEvent", newEvent)

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
    console.log("Event clicked:", clickInfo.event.id)
    setSelectedEventId(clickInfo.event.id)
    setEventDetailsOpen(true)
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events)
  }
  return (
    <>
      {/* Filters for calendar page goes here */}{" "}
      <CalendarEventFilters
        pillar={pillar}
        status={status}
        onPillarChange={(value) => setSearchFilters({ pillar: value })}
        onStatusChange={(value) => setSearchFilters({ status: value })}
      />
      {isFetching ? (
        <div className="flex h-100 w-full items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-foreground"
            style={{ animation: "spin 0.8s steps(8, end) infinite" }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="11"
                y="2.5"
                width="2"
                height="5"
                rx="1"
                fill="currentColor"
                fillOpacity={+(1 - (i / 8) * 0.85).toFixed(2)}
                transform={`rotate(${i * 45} 12 12)`}
              />
            ))}
          </svg>
        </div>
      ) : (
        <FullCalendar
          className="demo-app-calendar mt-6"
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
          dayMaxEvents={2}
          weekends={weekendsVisible}

          events={data && data.length > 0 ? data : undefined} // alternatively, use the `events` setting to fetch from a feed
          initialEvents={[]} // alternatively, use the `events` setting to fetch from a feed}
          select={handleDateSelect} // called when a date is selected
          eventContent={renderEventContent} // custom render function
          noEventsContent={() => (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No events to display
              </p>
            </div>
          )}
          noEventsText="fdsfasdfdasf"
          eventClick={(eventInfo) => handleEventClick(eventInfo)}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      )}
      {/* <EventAddForm
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
      /> */}
      <EventDetailsDrawer
        open={eventDetailsOpen}
        eventId={selectedEventId}
        setOpen={setEventDetailsOpen}
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
        <span className="opacity-70">{channel.replaceAll("_", " ")}</span>
      </div>
      <div className="flex items-center gap-1">
        {renderBadgeEventStatus(status)}
      </div>
    </div>
  )
}
export default Calendar
