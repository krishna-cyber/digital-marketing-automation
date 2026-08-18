import { Badge } from "@/components/reui/badge"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"

import { cn } from "@/lib/utils"
import { CheckIcon, XIcon } from "lucide-react"

const contentLifecycleEvents = [
  {
    id: 1,
    title: "Draft",
    date: "2024-06-01",
    status: "success",
    description: "The content was created successfully.",
  },
  {
    id: 2,
    title: "Generating",
    date: "2024-06-01",
    status: "success",
    description: "The content is being generated.",
  },
  {
    id: 4,
    title: "Review",
    date: "2024-06-02",
    status: "success",
    description: "The content was submitted for review.",
  },

  {
    id: 6,
    title: "Scheduled",
    date: "2024-06-02",
    status: "success",
    description: "The content was scheduled successfully.",
  },
  {
    id: 8,
    title: "Published",
    date: "2024-06-03",
    status: "success",
    description: "The content was published successfully.",
  },
]

export function ContentLifecycleTimeline() {
  return (
    <div className="flex items-center justify-center *:w-full">
      <Timeline defaultValue={4} orientation="horizontal">
        {contentLifecycleEvents.map((event) => (
          <TimelineItem
            key={event.id}
            step={event.id}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="bg-input! group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <div className="flex items-center gap-2">
                <TimelineTitle className="text-sm">{event.title}</TimelineTitle>
                <Badge
                  variant={
                    event.status === "success"
                      ? "success-light"
                      : "destructive-light"
                  }
                  size="sm"
                >
                  {event.status}
                </Badge>
              </div>
              <TimelineIndicator
                className={cn(
                  "flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7",
                  event.status === "success"
                    ? "bg-emerald-500 text-white"
                    : "bg-destructive text-white"
                )}
              >
                {event.status === "success" ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  <XIcon className="size-3.5" />
                )}
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>
              <TimelineDate className="mt-1 mb-0">{event.date}</TimelineDate>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
