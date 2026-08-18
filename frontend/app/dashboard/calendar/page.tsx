import { Main } from "@/components/layout/main"
import StatCard, { StatCardProps } from "@/components/stat-card"
import {
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  Clock3,
} from "lucide-react"
import Calendar from "./calender"

const calendarStats: StatCardProps[] = [
  {
    title: "Scheduled",
    value: "10",
    description: "Upcoming content",
    icon: <CalendarClock color="blue" />,
  },
  {
    title: "Pending Review",
    value: "3",
    description: "Needs human attention",
    icon: <Clock3 color="orange" />,
  },
  {
    title: "Published",
    value: "3",
    description: "Already published",
    icon: <CheckCircle2 color="green" />,
  },
  {
    title: "This Week",
    value: "18",
    description: "Across all channels",
    icon: <CalendarRange color="teal" />,
  },
]

const page = async () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {""}
          <h1 className="text-2xl font-bold tracking-tight">Calendar Events</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your calendar events.
          </p>
        </span>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {calendarStats.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
      <Calendar />
    </Main>
  )
}

export default page
