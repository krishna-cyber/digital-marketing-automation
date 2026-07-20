import { Main } from "@/components/layout/main"

import React from "react"
import Calendar from "./calender"

const page = async () => {
  //Fetch events and pass to the calender component for initial events
  // const response = await fetch(`${process.env.BACKEND_URL}/api/v1/calendar`, {
  //   method: "GET",
  // })

  // if (!response.ok) {
  //   throw new Error("Failed to fetch events")
  // }

  // const data = (await response.json()) as ExtendedEventInput[]
  // Log the fetched events for debugging

  // console.log("Calendar Fetched events:", data)

  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">Calendar Events</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your calendar events.
          </p>
        </span>
      </div>
      <Calendar />
    </Main>
  )
}

export default page
