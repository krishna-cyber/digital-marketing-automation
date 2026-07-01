import { Main } from "@/components/layout/main"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const channels = ["LinkedIn", "Instagram", "X / Twitter", "Facebook", "YouTube"]

export default function Page() {
  return (
    <Main>
      <div className="mb-6 flex flex-col gap-2">
        <Badge className="w-fit" variant="secondary">
          Settings
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">
          Channel Connections
        </h1>
        <p className="text-sm text-muted-foreground">
          Connect and manage the social channels used to publish content.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <div
                key={channel}
                className="rounded-lg border bg-muted/40 px-4 py-3 text-sm font-medium"
              >
                {channel}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Main>
  )
}
