"use client"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadMedia from "@/components/upload-media"
import React from "react"
import { MediaProvider } from "./media/components/media-provider"
import { MediaTable } from "./media/components/media-table"
import { PostsProvider } from "./leadership/components/leadership-provider"
import { PostsTable } from "./leadership/components/leadership-table"
import { SocialsProvider } from "./socials/components/socials-provider"
import { SocialsTable } from "./socials/components/social-table"

const TabsRender = () => {
  const [socialsCount, setSocialsCount] = React.useState(0)
  const [mediaAssetsCount, setMediaAssetsCount] = React.useState(0)
  const [thoughtLeadershipCount, setThoughtLeadershipCount] = React.useState(0)
  return (
    <div className="mt-4 flex w-full flex-col gap-6">
      <Tabs defaultValue="social-posts">
        <TabsList variant="line" className="mb-3.5 max-w-xl">
          <TabsTrigger value="social-posts" className="gap-2">
            Social Posts
            <Badge variant="primary-light" size="sm">
              {socialsCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="thought-leadership" className="gap-2">
            Thought Leadership
            <Badge variant="success-light" size="sm">
              {thoughtLeadershipCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="media-assets" className="gap-2">
            Media Assets
            <Badge variant="info-light" size="sm">
              {mediaAssetsCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="social-posts">
          <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
            <p className="text-muted-foreground">
              Manage your social posts here. You can create, edit, and delete
              them.
            </p>
            {/* <UploadMedia title="Upload Media" /> */}
          </div>
          <SocialsProvider>
            <SocialsTable setSocialsCount={setSocialsCount} />
          </SocialsProvider>
        </TabsContent>
        <TabsContent className="w-full" value="thought-leadership">
          <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
            <p className="text-muted-foreground">
              Manage your thought leadership content here. You can create, edit,
              and delete them.
            </p>
          </div>
          <PostsProvider>
            <PostsTable setLinkedinPostsCount={setThoughtLeadershipCount} />
          </PostsProvider>
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
