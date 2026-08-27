"use client"
import { Badge } from "@/components/reui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { TrendingDownIcon } from "lucide-react"
import { CSSProperties } from "react"
import { Bar, BarChart, XAxis } from "recharts"

type ChartData = {
  month: string
  linkedinCompany: number
  instagram: number
  facebook: number
  linkedinTL: number
  blog: number
}

const chartData: ChartData[] = [
  {
    month: "Jan",
    linkedinCompany: 42,
    instagram: 68,
    facebook: 51,
    linkedinTL: 35,
    blog: 24,
  },
  {
    month: "Feb",
    linkedinCompany: 56,
    instagram: 82,
    facebook: 63,
    linkedinTL: 41,
    blog: 31,
  },
  {
    month: "Mar",
    linkedinCompany: 48,
    instagram: 74,
    facebook: 58,
    linkedinTL: 39,
    blog: 28,
  },
  {
    month: "Apr",
    linkedinCompany: 71,
    instagram: 91,
    facebook: 67,
    linkedinTL: 52,
    blog: 36,
  },
  {
    month: "May",
    linkedinCompany: 63,
    instagram: 86,
    facebook: 72,
    linkedinTL: 47,
    blog: 42,
  },
  {
    month: "Jun",
    linkedinCompany: 78,
    instagram: 104,
    facebook: 81,
    linkedinTL: 59,
    blog: 48,
  },
]

const chartConfig = {
  linkedinCompany: {
    label: "LinkedIn Company",
    color: "#0A66C2",
  },
  instagram: {
    label: "Instagram",
    color: "#E1306C",
  },
  facebook: {
    label: "Facebook",
    color: "#1877F2",
  },
  linkedinTL: {
    label: "LinkedIn TL",
    color: "#5B8DEF",
  },
  blog: {
    label: "Blog",
    color: "#F59E0B",
  },
} satisfies ChartConfig
export function ContentByChannel({ className }: { className?: string }) {
  const { data: chartData } = useQuery({
    queryKey: ["content-by-channel"],
    queryFn: async () => {
      const response = await api.get("/api/v1/analytics/content-by-channel")
      return response.data?.data as ChartData[]
    },
  })

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>
          Content by Channel
          <Badge variant="destructive-light" className="ml-2">
            <TrendingDownIcon aria-hidden="true" />
            -15%
          </Badge>
        </CardTitle>
        <CardDescription>Monthly content publishing by channel</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          className="aspect-square h-62.5 w-full"
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              right: 12,
              bottom: 12,
              left: 12,
            }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="min-w-44 gap-2.5"
                  labelFormatter={(value) => (
                    <div className="mb-0.5 flex flex-col gap-0.5 border-b border-border/50 pb-2">
                      <span className="text-xs font-medium">{value} 2024</span>
                    </div>
                  )}
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-xs bg-(--color-bg)"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as CSSProperties
                          }
                        />
                        <span className="text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                        </span>
                      </div>

                      <span className="font-semibold text-foreground">
                        {Number(value).toLocaleString()}
                      </span>
                    </div>
                  )}
                />
              }
            />

            <Bar
              dataKey="linkedinCompany"
              fill="var(--color-linkedinCompany)"
              stroke="var(--color-linkedinCompany)"
              strokeWidth={1}
              radius={[4, 4, 4, 4]}
            />

            <Bar
              dataKey="instagram"
              fill="var(--color-instagram)"
              stroke="var(--color-instagram)"
              strokeWidth={1}
              radius={[4, 4, 4, 4]}
            />

            <Bar
              dataKey="facebook"
              fill="var(--color-facebook)"
              stroke="var(--color-facebook)"
              strokeWidth={1}
              radius={[4, 4, 4, 4]}
            />

            <Bar
              dataKey="linkedinTL"
              fill="var(--color-linkedinTL)"
              stroke="var(--color-linkedinTL)"
              strokeWidth={1}
              radius={[4, 4, 4, 4]}
            />

            <Bar
              dataKey="blog"
              fill="var(--color-blog)"
              stroke="var(--color-blog)"
              strokeWidth={1}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
