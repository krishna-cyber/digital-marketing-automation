import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import React from "react"
import Calendar from "./calender"

const page = () => {
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

        <div className="flex items-center space-x-2">
          <Button variant={"ghost"}>Mark all as read</Button>
        </div>
      </div>
      <Calendar />
    </Main>
  )
}

export default page
