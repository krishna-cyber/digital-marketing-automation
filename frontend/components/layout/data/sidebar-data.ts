import {
  BookOpen,
  Calendar,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquareText,
  Newspaper,
  PenSquare,
  Settings,
  Sparkles,
} from "lucide-react"

export const sidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
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
          url: "/dashboard/settings",
          icon: Settings,
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
