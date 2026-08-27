import { AcceptedVsRejectedTrend } from "@/components/analytics/accepted-vs-rejection-trend";
import AutomationHealthStatus from "@/components/analytics/automation-health";
import { ContentByChannel } from "@/components/analytics/content-by-channel";
import { ContentGeneratedPie } from "@/components/analytics/content-generated-pie";
import { ReviewQueueItems } from "@/components/analytics/review-queue-items";
import { Main } from "@/components/layout/main";
import ScheduledToday from "@/components/scheduled-today";
import StatCard, { StatCardProps } from "@/components/stat-card";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import {
    CalendarClock,
    CheckCircle2,
    Clock,
    Sparkles,
    Workflow,
    XCircle,
} from "lucide-react";

const statCardIcons = {
  Generated: <Sparkles color="violet" />,
  "Pending Reviews": <Clock color="blue" />,
  Approved: <CheckCircle2 color="green" />,
  Rejected: <XCircle color="red" />,
  Scheduled: <CalendarClock color="blue" />,
  Automation: <Workflow color="teal" />,
}

const page = async () => {
  try {
    const response = await api.get(`/api/v1/dashboard/kpis?days=30`)
    const statCardsData = response.data?.data as StatCardProps[]
    // Map icons to the stat cards based on their titles
    const updatedStatCardsData = statCardsData.map((card) => {
      card.icon = statCardIcons[card.title as keyof typeof statCardIcons]
      return card
    })
    return (
      <Main>
        {/* ===== Main ===== */}
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            {" "}
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Monitor automated generation, review, approval and publishing.
            </p>
          </span>
          <div className="flex items-center space-x-2">
            {/* <Button>Download</Button> */}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {updatedStatCardsData.map((card) => (
            <StatCard
              key={card.title}
              title={card.title}
              value={card.value}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-7">
          {/* Weekly calendar view */}
          {/* <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>
                A quick overview of your scheduled posts for the week.
              </CardDescription> */}
            {/* </CardHeader> */}
            {/* <CardContent className="ps-2"><Overview /></CardContent> */}
          {/* </Card> */}
          {/* Scheduled today card */}
          {/* <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Scheduled Today</CardTitle>
              <CardDescription>
                5 posts are scheduled for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScheduledToday />
            </CardContent>
          </Card> */}

          {/* Accepted vs Rejected Trend */}
          <AcceptedVsRejectedTrend className="col-span-1 lg:col-span-4" />

          {/* Task status */}
          <ContentGeneratedPie className="col-span-1 lg:col-span-3" />

          {/* Review Queue  Items*/}
          {/* <ReviewQueueItems className="col-span-1 lg:col-span-4" /> */}

          {/* Content by Channel */}
          <ContentByChannel className="col-span-1 lg:col-span-4" />

          {/* Automation Health Status */}
          <AutomationHealthStatus className="col-span-1 lg:col-span-3" />
        </div>
      </Main>
    )
  } catch (error) {
    console.error("Error rendering dashboard page:", error)
    return (
      <Main>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            An error occurred while loading the dashboard.
          </p>
        </div>
      </Main>
    )
  }
}

export default page
