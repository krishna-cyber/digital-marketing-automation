import { Main } from "@/components/layout/main"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const pillars = [
  "Thoughtful Leadership",
  "Social Content",
  "Blog",
  "LinkedIn Article",
  "Comment Replies",
]

export default function Page() {
  return (
    <Main>
      <div className="mb-6 flex flex-col gap-2">
        <Badge className="w-fit" variant="secondary">
          Settings
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">Pillar Management</h1>
        <p className="text-sm text-muted-foreground">
          Organize the content pillars that power your calendar and automation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Pillars</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar}
              className="rounded-lg border bg-background px-4 py-3 text-sm font-medium"
            >
              {pillar}
            </div>
          ))}
        </CardContent>
      </Card>
    </Main>
  )
}
