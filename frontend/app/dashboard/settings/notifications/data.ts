import { Notification } from "@/types/types"

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New team member joined",
    event_id: "event_1",
    event_type: "team_member_joined",
    message: "Sarah Connor has joined the Engineering workspace.",
    status: "unread",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    actions: [
      {
        id: "view",
        label: "View workspace",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "2",
    title: "New product added",
    event_id: "event_1",
    event_type: "team_member_joined",
    message: 'A new product "Dashboard Pro" has been added to the catalog.',
    status: "unread",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    actions: [
      {
        id: "view-product",
        label: "View products",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "3",
    title: "Billing cycle updated",
    event_id: "event_1",
    event_type: "team_member_joined",
    message: "Your Pro plan has been renewed. Next invoice on April 24, 2026.",
    status: "unread",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    actions: [
      {
        id: "billing",
        label: "View billing",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "4",
    title: "Task assigned to you",
    event_id: "event_1",
    event_type: "team_member_joined",
    message:
      'You have been assigned "Update dashboard analytics" on the Kanban board.',
    status: "read",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actions: [
      {
        id: "open",
        label: "Open kanban",
        type: "redirect",
        style: "primary",
      },
    ],
  },
  {
    id: "5",
    title: "New message from Alex",
    event_id: "event_1",
    event_type: "team_member_joined",
    message:
      'Alex sent you a message: "Hey, can we sync on the overview dashboard?"',
    status: "read",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    actions: [
      {
        id: "open-chat",
        label: "Open chat",
        type: "redirect",
        style: "primary",
      },
    ],
  },
]
