import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

const TabsRender = () => {
  return (
    <div className="mt-4 flex w-full max-w-md flex-col gap-6">
      <Tabs defaultValue="linkedin-posts">
        <TabsList variant="line" className="mb-3.5 w-full">
          <TabsTrigger value="linkedin-posts" className="gap-2">
            Linkedin Posts
            <Badge variant="primary-light" size="sm">
              12
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="media-assets" className="gap-2">
            Media Assets
            <Badge variant="info-light" size="sm">
              3
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="linkedin-posts">
          <Card>
            <CardContent>12 unread messages in your inbox.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media-assets">
          <Card>
            <CardContent>3 drafts waiting to be sent.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsRender
