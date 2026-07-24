import { Main } from "@/components/layout/main"

import TabsRender from "./tabs-render"

const page = () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">Content</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your content, including posts and media assets.
          </p>
        </span>
      </div>
      <TabsRender />
    </Main>
  )
}

export default page
