"use client"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"

import LinkedInArticlesTable from "./linkedin-articles/components/linkedin-article-table"
import { LinkedInArticlesProvider } from "./linkedin-articles/components/linkedin-articles-provider"

const TabsRender = () => {
  const [linkedInArticlesCount, setlinkedInArticlesCount] = React.useState(5)
  const [blogsCount, setBlogsCount] = React.useState(10)
  return (
    <div className="mt-4 flex w-full flex-col gap-6">
      <Tabs defaultValue="linkedin-articles">
        <TabsList variant="line" className="mb-3.5 max-w-xl">
          <TabsTrigger value="linkedin-articles" className="gap-2">
            Linkedin Articles
            <Badge variant="primary-light" size="sm">
              {linkedInArticlesCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="blog-posts" className="gap-2">
            Blog Posts
            <Badge variant="info-light" size="sm">
              {blogsCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="linkedin-articles">
          <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
            <p className="text-muted-foreground">
              Manage your linkedin articles here. You can create, edit, and
              delete
            </p>
          </div>
          {/* Linkedin Articles tables */}
          <LinkedInArticlesProvider>
            <LinkedInArticlesTable />
          </LinkedInArticlesProvider>
        </TabsContent>
        <TabsContent value="blog-posts">
          <div className="mb-2.5 flex flex-wrap items-end justify-between gap-2">
            <p className="text-muted-foreground">
              Manage your blog posts here. You can create, edit, and delete
              them.
            </p>

            {/* Todo: Add blog posts table and functionality */}
            <p>Blogs related table and functionality should be added here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsRender
