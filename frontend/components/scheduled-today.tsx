import {
  Check,
  CircleOff,
  EllipsisVertical,
  FilePenLine,
  Sparkles,
} from "lucide-react"
import React from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const actionsMenu = [
  {
    label: "Approve",
    icon: <Check color="green" />,
  },
  { label: "AI Refine", icon: <Sparkles color="purple" /> },
  { label: "Open Editor", icon: <FilePenLine /> },
  { label: "Reject", icon: <CircleOff color="red" /> },
]

const Actions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {actionsMenu.map((action) => (
            <DropdownMenuItem key={action.label}>
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TaskList = () => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="shrink-0 items-center font-mono text-sm font-medium text-muted-foreground">
          TSK_101
        </div>
        <div className="min-w-0 space-y-1 truncate">
          <p className="truncate text-sm leading-5 font-medium">
            A long title for the task that is scheduled for today.
          </p>
          <p className="text-sm text-muted-foreground">
            Scheduled for 10:00 AM on Instagram.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Scheduled
        </Badge>
        <Badge variant="secondary" className="hidden sm:inline-flex">
          Pillar
        </Badge>
        <Actions />
      </div>
    </div>
  )
}

const ScheduledToday = () => {
  return (
    <div className="space-y-2">
      <TaskList />
      <TaskList />
      <TaskList />
      <TaskList />
      <TaskList />
      <TaskList />
    </div>
  )
}

export default ScheduledToday
