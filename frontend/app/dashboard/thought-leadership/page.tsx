import { Main } from "@/components/layout/main"
import React from "react"
import { PostsProvider } from "../content/components/leadership/components/leadership-provider"
import { PostsTable } from "../content/components/leadership/components/leadership-table"

const page = () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">
            Thought Leadership
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your thought leadership content. You can create,
            edit, and delete them.
          </p>
        </span>
      </div>
      <PostsProvider>
        <PostsTable setLinkedinPostsCount={null} />
      </PostsProvider>
    </Main>
  )
}

export default page
