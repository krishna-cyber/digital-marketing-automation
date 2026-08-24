"use client"
import { api } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import React from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Spinner } from "./ui/spinner"

const MarkAllAsRead = () => {
  const queryClient = useQueryClient()

  const markAllAsRead = useMutation({
    mutationKey: ["markAllAsRead"],
    mutationFn: async () => {
      await api.put("/api/v1/notifications/read-all")
    },
    onSuccess: async () => {
      toast.success("All notifications marked as read")
      //Refresh the unread count and notifications list
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["unreadCount"] }),
        queryClient.invalidateQueries({ queryKey: ["notifications"] }),
      ])
    },
    onError: (error) => {
      console.error("Error marking all notifications as read:", error)
      toast.error("Failed to mark all notifications as read")
    },
  })
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto px-2 py-1 text-xs text-muted-foreground"
      disabled={markAllAsRead.isPending}
      onClick={() => markAllAsRead.mutate()}
    >
      {markAllAsRead.isPending && <Spinner />} Mark all as read
    </Button>
  )
}

export default MarkAllAsRead
