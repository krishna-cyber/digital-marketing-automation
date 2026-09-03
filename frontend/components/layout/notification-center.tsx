import { Button } from "@/components/ui/button"
import { Notification } from "@/types/types"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Bell, ChevronRight } from "lucide-react"
import Link from "next/link"
import { EmptyNotifications } from "../examples/empty-notifications"
import MarkAllAsRead from "../mark-all-as-read"
import { NotificationCard } from "../notification-card"
// import { useNotificationStore } from "../utils/store"

const MAX_VISIBLE = 5

const actionRoutes: Record<string, string> = {
  view: "/dashboard/overview",
  "view-product": "/dashboard/product",
  billing: "/dashboard/overview",
  open: "/dashboard/kanban",
  "open-chat": "/dashboard/chat",
}
interface UnreadCountResponse {
  data: { unread: number }
}
export function NotificationCenter() {
  const queryClient = useQueryClient()

  const { data: unreadCount, error } = useQuery({
    queryKey: ["unreadCount"],
    queryFn: async () => {
      const response = await api.get("/api/v1/notifications/unread-count")
      return response.data as UnreadCountResponse
    },
  })

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/api/v1/notifications?limit=10&offset=0")
      return response.data
    },
  })

  const unreadCountValue = unreadCount?.data?.unread ?? 0

  const notificationItems: Notification[] = notifications?.data ?? []
  const visibleNotifications = notificationItems.slice(0, MAX_VISIBLE)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="h-4 w-4" />
            {error && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-white">
                Error
              </span>
            )}
            {unreadCountValue > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-white">
                {unreadCountValue > 9 ? "9+" : unreadCountValue}
              </span>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
        }
      />
      <PopoverContent
        align="end"
        className="w-[calc(100vw-3rem)] p-0 sm:w-95"
        sideOffset={8}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/dashboard/settings/notifications"
            className="group flex items-center gap-1"
          >
            <h4 className="text-sm font-semibold group-hover:underline">
              Notifications
            </h4>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="flex items-center gap-2">
            {unreadCountValue > 0 && (
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {unreadCountValue} new
              </span>
            )}
            {unreadCountValue > 0 && <MarkAllAsRead />}
          </div>
        </div>
        <Separator />

        <ScrollArea className="h-100">
          {notificationItems.length === 0 ? (
            <EmptyNotifications />
          ) : (
            <div className="flex flex-col gap-1 p-2">
              {visibleNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  body={notification.message}
                  status={notification.status}
                  createdAt={notification.created_at}
                  actions={notification.actions}
                  // onMarkAsRead={markAsRead}
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
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
