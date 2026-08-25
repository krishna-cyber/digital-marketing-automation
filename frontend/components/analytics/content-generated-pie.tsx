"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TrendingUpIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const chartData = [
  { status: "generated", count: 275, fill: "var(--color-generated)" },
  { status: "approved", count: 200, fill: "var(--color-approved)" },
  { status: "rejected", count: 87, fill: "var(--color-rejected)" },
  { status: "scheduled", count: 173, fill: "var(--color-scheduled)" },
  { status: "review", count: 120, fill: "var(--color-review)" },
]

const chartConfig = {
  count: {
    label: "Posts",
  },
  generated: {
    label: "Generated",
    color: "#3b82f6",
  },
  approved: {
    label: "Approved",
    color: "#16a34a",
  },
  rejected: {
    label: "Rejected",
    color: "#dc2626",
  },
  scheduled: {
    label: "Scheduled",
    color: "#8b5cf6",
  },
  review: {
    label: "In Review",
    color: "#f59e0b",
  },
} satisfies ChartConfig

export function ContentGeneratedPie({ className }: { className?: string }) {
  const totalPosts = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          Content Status Distribution
          <Badge variant="success-light" className="ml-2">
            <TrendingUpIcon aria-hidden="true" />
            +5.2%
          </Badge>
        </CardTitle>
        <CardDescription>Current state of generated content.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-square h-64 w-full"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2"
            />
            <Pie
              data={chartData}
              dataKey="count"
              innerRadius={60}
              nameKey="status"
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        dominantBaseline="middle"
                        textAnchor="middle"
                        x={viewBox.cx}
                        y={viewBox.cy}
                      >
                        <tspan
                          className="fill-foreground text-3xl font-bold"
                          x={viewBox.cx}
                          y={viewBox.cy}
                        >
                          {totalPosts.toLocaleString()}
                        </tspan>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                        >
                          Posts
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ContentGeneratedPie
