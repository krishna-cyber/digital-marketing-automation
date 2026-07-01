import { Main } from "@/components/layout/main"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

export default function page() {
  return (
    <Main>
      <div className="mb-6 flex flex-col gap-2">
        <Badge className="w-fit" variant="secondary">
          Settings
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight">Brand Styles</h1>
        <p className="text-sm text-muted-foreground">
          Define your visual identity for posts, campaigns, and generated
          assets.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Color System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Primary: brand accent, CTA highlights, and key labels.</p>
            <p>Secondary: supporting UI states and softer content blocks.</p>
            <p>Neutral: backgrounds, surfaces, and readable body copy.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Heading scale for articles, social graphics, and landing pages.
            </p>
            <p>Body scale for captions, descriptions, and reusable snippets.</p>
            <p>Tone and hierarchy for every generated marketing asset.</p>
          </CardContent>
        </Card>
      </div>
    </Main>
  )
}
