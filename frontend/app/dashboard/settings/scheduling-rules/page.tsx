import { Main } from "@/components/layout/main"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const rules = [
  "Avoid back-to-back publishing windows for the same channel.",
  "Prioritize weekday mornings for thought leadership posts.",
  "Reserve Fridays for lighter social content and recaps.",
]

export default function Page() {
  return (
    <Main>
      <div className="mb-6 flex flex-col gap-2">
        <Badge className="w-fit" variant="secondary">
          Settings
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">Scheduling Rules</h1>
        <p className="text-sm text-muted-foreground">
          Set guardrails that keep publishing windows consistent and
          predictable.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {rules.map((rule) => (
            <div key={rule} className="rounded-lg border bg-muted/40 px-4 py-3">
              {rule}
            </div>
          ))}
        </CardContent>
      </Card>
    </Main>
  )
}
