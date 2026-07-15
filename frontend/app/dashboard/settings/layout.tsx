import { Main } from "@/components/layout/main"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  ChartColumnStacked,
  ClipboardClock,
  Palette,
  Rss,
} from "lucide-react"
import React from "react"
import { SidebarNav } from "./sidebar-nav"

const sidebarNavItems = [
  {
    title: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: <Bell size={18} />,
  },
  {
    title: "Branding",
    href: "/dashboard/settings/brand-styles",
    icon: <Palette size={18} />,
  },
  {
    title: "Scheduling",
    href: "/dashboard/settings/scheduling-rules",
    icon: <ClipboardClock size={18} />,
  },
  {
    title: "Channels",
    href: "/dashboard/settings/channel-connections",
    icon: <Rss size={18} />,
  },
  {
    title: "Pillar Management",
    href: "/dashboard/settings/pillar-management",
    icon: <ChartColumnStacked size={18} />,
  },
]

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Main>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1">{children}</div>
      </div>
    </Main>
  )
}

export default layout
