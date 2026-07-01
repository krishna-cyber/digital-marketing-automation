export type ActionType = "redirect" | "api_call" | "workflow" | "modal"
export type ActionStyle = "primary" | "danger" | "default"
export interface NotificationAction {
  id: string
  label: string
  type: ActionType
  style?: ActionStyle
  executed?: boolean
}
export type NotificationStatus = "unread" | "read" | "archived"
export type Notification = {
  id: string
  title: string
  body: string
  status: NotificationStatus
  createdAt: string
  actions?: NotificationAction[]
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  backgroundColor?: string
  description: string
}
