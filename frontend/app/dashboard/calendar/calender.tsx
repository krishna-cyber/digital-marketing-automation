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
import { INITIAL_EVENTS } from "./data"

//Css of calender
import { EventAddForm, EventAddFormValues } from "@/components/event-add-form"
import "@fullcalendar/react/skeleton.css"
import "@fullcalendar/react/themes/classic/palette.css"
import "@fullcalendar/react/themes/classic/theme.css"
import { toast } from "sonner"

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
        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
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
  console.log("eventInfo", eventInfo)
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
export default Calendar
