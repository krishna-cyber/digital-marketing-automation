"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

type chartDataItem = {
  month: string
  accepted: number
  rejected: number
}

//commented for data type preservation

// const chartData = [
//   { month: "January", accepted: 186, rejected: 80 },
//   { month: "February", accepted: 305, rejected: 200 },
//   { month: "March", accepted: 237, rejected: 120 },
//   { month: "April", accepted: 73, rejected: 190 },
//   { month: "May", accepted: 209, rejected: 130 },
//   { month: "June", accepted: 214, rejected: 140 },
// ]

const chartConfig = {
  accepted: {
    label: "Accepted",
    color: "#16a34a",
  },
  rejected: {
    label: "Rejected",
    color: "#dc2626",
  },
} satisfies ChartConfig

export function AcceptedVsRejectedTrend({ className }: { className?: string }) {
  const { data: chartData } = useQuery({
    queryKey: ["accepted-vs-rejected-trend"],
    queryFn: async () => {
      const response = await api.get("/api/v1/analytics/accept-reject-trend")
      return response.data.data as chartDataItem[]
    },
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          Approval vs Rejection Trend
          {/* <Badge variant="success-light" className="ml-2">
            <TrendingUpIcon aria-hidden="true" />
            +5.2%
          </Badge> */}
        </CardTitle>
        <CardDescription>
          Human review outcome across automation runs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-square h-62.5 w-full"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Line
              dataKey="accepted"
              dot={false}
              stroke="var(--color-accepted)"
              strokeWidth={2}
              type="monotone"
            />
            <Line
              dataKey="rejected"
              dot={false}
              stroke="var(--color-rejected)"
              strokeWidth={2}
              type="monotone"
            />
          </LineChart>
        </ChartContainer>

        {/* <div className="mt-4 flex flex-col gap-1 text-center text-sm">
          <div className="flex items-center justify-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-center gap-2 leading-none text-muted-foreground">
            Showing the number of posts accepted vs rejected by human reviewers
            across automation runs for the last 6 months.
          </div>
        </div> */}
      </CardContent>
    </Card>
  )
}

export default AcceptedVsRejectedTrend
