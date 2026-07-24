"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadMedia from "@/components/upload-media"
import React from "react"
import { MediaProvider } from "./media/components/media-provider"
import { MediaTable } from "./media/components/media-table"

const TabsRender = () => {
  const [linkedinPostsCount, setLinkedinPostsCount] = React.useState(12)
  const [mediaAssetsCount, setMediaAssetsCount] = React.useState(0)
  return (
    <div className="mt-4 flex w-full flex-col gap-6">
      <Tabs defaultValue="linkedin-posts">
        <TabsList variant="line" className="mb-3.5 max-w-xl">
          <TabsTrigger value="linkedin-posts" className="gap-2">
            Linkedin Posts
            <Badge variant="primary-light" size="sm">
              {linkedinPostsCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="media-assets" className="gap-2">
            Media Assets
            <Badge variant="info-light" size="sm">
              {mediaAssetsCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="linkedin-posts">
          <Card>
            <CardContent>12 unread messages in your inbox.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="media-assets">
          <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
            <p className="text-muted-foreground">
              Manage your media assets here. You can upload, view, download and
              organize them.
            </p>

            <UploadMedia title="Upload Media" />
          </div>
          <MediaProvider>
            <MediaTable setMediaAssetsCount={setMediaAssetsCount} />
          </MediaProvider>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsRender
