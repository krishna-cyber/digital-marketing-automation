import { NotificationCard } from "@/components/notification-card"
import { Notification } from "@/types/types"
import { Bell } from "lucide-react"

export const renderList = (items: Notification[]) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Bell className="mb-3 h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No notifications</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((notification) => (
        <NotificationCard
          key={notification.id}
          id={notification.id}
          title={notification.title}
          body={notification.body}
          status={notification.status}
          createdAt={notification.createdAt}
          actions={notification.actions}
          //   onMarkAsRead={markAsRead}
          //   onAction={(notifId, actionId) => {
          //     const route = actionRoutes[actionId]
          //     if (route) {
          //       markAsRead(notifId)
          //       router.navigate({ to: route })
          //     }
          //   }}
        />
      ))}
    </div>
  )
}
