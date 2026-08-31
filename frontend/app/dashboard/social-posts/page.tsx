import { Main } from "@/components/layout/main"
import React from "react"
import { PostsProvider } from "../content/components/leadership/components/leadership-provider"
import { PostsTable } from "../content/components/leadership/components/leadership-table"
import { SocialsTable } from "../content/components/socials/components/social-table"
import { SocialsProvider } from "../content/components/socials/components/socials-provider"

const page = () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">Social Posts</h1>
          <p className="text-sm text-muted-foreground">
            Social posts among different platforms can be managed here. You can
            create, edit, and delete them.
          </p>
        </span>
      </div>
      <SocialsProvider>
        <SocialsTable setSocialsCount={null} />
      </SocialsProvider>
    </Main>
  )
}

export default page
