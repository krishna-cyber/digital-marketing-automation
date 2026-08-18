import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

export type StatCardProps = {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => {
  return (
    <Card className="gap-2 py-2">
      <CardHeader className="flex items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

export default StatCard
