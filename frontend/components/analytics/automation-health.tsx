import { cn } from "@/lib/utils"

import { api } from "@/lib/api"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Separator } from "../ui/separator"
import { Status, StatusIndicator, StatusLabel } from "../ui/status"

const stats = [
  { label: "Frequency", value: "Every 3 days" },
  { label: "Last run", value: "Aug 13 - 08:00 AM" },
  { label: "Last result", value: "12 generated" },
  { label: "Failed runs", value: "0" },
]

const AutomationHealthStatus = async ({
  className,
}: {
  className?: string
}) => {
  const response = await api.get(`/api/v1/dashboard/automation-health`)
  const data = response.data?.data as typeof stats
  if (!data) {
    return <div className="text-red-500">Error loading automation health</div>
  }
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Automation Health</CardTitle>
        <CardDescription>Cron job and generation status</CardDescription>
        <CardAction>
          <Status status="online">
            <StatusIndicator />
            <StatusLabel>Automation Online</StatusLabel>
          </Status>
        </CardAction>
      </CardHeader>

      <Separator />
      <CardContent>
        {/* Status Rows */}
        <div className="w-full space-y-1 px-4 pb-6">
          {data.map((item, index) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5",
                index % 2 === 0 && "bg-muted/40"
              )}
            >
              <span className="text-sm font-medium text-foreground">
                {item.label}
              </span>
              <span className="text-sm text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}

          <Separator />
          <div className="text-xs text-muted-foreground">
            Next automation run:
            <span className="font-medium text-foreground tabular-nums">
              Aug 16 - 08:00 AM
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AutomationHealthStatus
