import { Main } from "@/components/layout/main"
import ScheduledToday from "@/components/scheduled-today"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ClipboardClock,
  ClockFading,
  MessageCircle,
  SquareCheckBig,
} from "lucide-react"
import React from "react"

const page = () => {
  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            {/* <Button>Download</Button> */}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Channels</CardTitle>
              <MessageCircle color="blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              {/* Todo: shows icons and links of all channels here */}
              <p className="text-xs text-muted-foreground">
                Publishing channels for your content.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Drafts Pending
              </CardTitle>
              <ClipboardClock color="gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                waiting for approval.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <ClockFading color="blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">
                Scheduled this week.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <SquareCheckBig color="green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+10</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-7">
          {/* Weekly calendar view */}
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                A quick overview of your scheduled posts for the week.
              </CardDescription>
            </CardHeader>
            <CardContent className="ps-2">{/* <Overview /> */}</CardContent>
          </Card>
          {/* Scheduled today card */}
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Scheduled Today</CardTitle>
              <CardDescription>
                5 posts are scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduledToday />
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}

export default page
