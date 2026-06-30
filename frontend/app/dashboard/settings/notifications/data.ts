import { Notification } from "@/types/types"

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New team member joined",
    body: "Sarah Connor has joined the Engineering workspace.",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
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
    body: 'A new product "Dashboard Pro" has been added to the catalog.',
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
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
    body: "Your Pro plan has been renewed. Next invoice on April 24, 2026.",
    status: "unread",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
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
    body: 'You have been assigned "Update dashboard analytics" on the Kanban board.',
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
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
    body: 'Alex sent you a message: "Hey, can we sync on the overview dashboard?"',
    status: "read",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
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
