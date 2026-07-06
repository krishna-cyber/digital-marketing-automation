import {
  Bell,
  BookOpen,
  Calendar,
  ChartColumnStacked,
  ClipboardClock,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  Palette,
  PenSquare,
  Rss,
  Settings,
  Sparkles,
  User,
} from "lucide-react"

export const sidebarData = {
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Calendar",
          url: "/dashboard/calendar",
          icon: Calendar,
        },
        {
          title: "Generate",
          url: "/dashboard/generate",
          icon: Sparkles,
        },
        {
          title: "Comments",
          url: "/dashboard/comments",
          badge: "3",
          icon: MessageSquareText,
        },
        {
          title: "Content",
          url: "/dashboard/content",
          icon: FileText,
        },
      ],
    },
    {
      title: "Content Library",
      items: [
        {
          title: "Blogs & Articles",
          url: "/dashboard/blogs",
          icon: Newspaper,
        },
        {
          title: "Thought Leadership",
          url: "/dashboard/thought-leadership",
          icon: BookOpen,
        },
        {
          title: "Social Posts",
          url: "/dashboard/social-posts",
          icon: PenSquare,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Account",
              url: "/dashboard/settings/account",
              icon: User,
            },
            {
              title: "Notifications",
              url: "/dashboard/settings/notifications",
              icon: Bell,
            },
            {
              title: "Branding",
              url: "/dashboard/settings/brand-styles",
              icon: Palette,
            },
            {
              title: "Scheduling",
              url: "/dashboard/settings/scheduling-rules",
              icon: ClipboardClock,
            },
            {
              title: "Channels",
              url: "/dashboard/settings/channel-connections",
              icon: Rss,
            },
            {
              title: "Pillar Management",
              url: "/dashboard/settings/pillar-management",
              icon: ChartColumnStacked,
            },
          ],
        },
        {
          title: "Help",
          url: "/dashboard/help",
          icon: HelpCircle,
        },
      ],
    },
  ],
}
