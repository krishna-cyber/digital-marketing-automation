import { Main } from "@/components/layout/main"

import MarkAllAsRead from "@/components/mark-all-as-read"
import NotificationRender from "./notificationRender"

const Page = async () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your notifications.
          </p>
        </span>

        <div className="flex items-center space-x-2">
          <MarkAllAsRead />
        </div>
      </div>
      <NotificationRender />
    </Main>
  )
}

export default Page
