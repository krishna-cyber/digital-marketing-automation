import { Badge } from "@/components/ui/badge"
import { Instagram, Linkedin, Twitter } from "@/components/ui/brand-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Calendar,
  ExternalLink,
  Heart,
  MessageCircle,
  Share2,
  VerifiedIcon,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "../ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

// Sample highlighted post (can be from any platform)
// In this example, we're using a "pinned tweet"
const highlightedPost = {
  platform: "linkedin", // Options: twitter, instagram, linkedin
  pinned: true,
  featuredText: "Most Popular Tweet",
  user: {
    name: "Alex Morgan",
    handle: "@alexmdev",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop",
    verified: true,
  },
  content:
    "I'm thrilled to announce that my open-source project ReactiveDash has reached 1,000 stars on GitHub! 🎉 \n\nThank you to all contributors and users who've helped make this dashboard library even better. \n\nCheck it out if you're building React dashboards: github.com/alexmdev/reactive-dash",
  date: "June 15, 2023",
  image:
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1170&auto=format&fit=crop",
  metrics: {
    likes: 875,
    comments: 143,
    shares: 346,
  },
  url: "#",
}

const linkedinReactions = [
  {
    src: "/linkedin-reactions/clap.png",
    fallback: "",
    name: "Clap",
  },
  {
    src: "/linkedin-reactions/thumbsup.png",
    fallback: "ML",
    name: "thumbs-up",
  },
  {
    src: "/linkedin-reactions/support.png",
    fallback: "ER",
    name: "heart",
  },
  {
    src: "/linkedin-reactions/funny.png",
    fallback: "JW",
    name: "funny",
  },
]

// Function to get platform-specific styling and icons
function getPlatformInfo(platform: string) {
  switch (platform) {
    case "twitter":
      return {
        icon: <Twitter className="h-6 w-6" />,
        color: "text-sky-500",
        bgColor: "bg-sky-50 dark:bg-sky-950/30",
        borderColor: "border-sky-200 dark:border-sky-700/30",
        hoverBg: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
        name: "Twitter",
        actionText: "View Tweet",
      }
    case "instagram":
      return {
        icon: <Instagram className="h-6 w-6" />,
        color: "text-pink-500",
        bgColor: "bg-pink-50 dark:bg-pink-950/30",
        borderColor: "border-pink-200 dark:border-pink-700/30",
        hoverBg: "hover:bg-pink-50 dark:hover:bg-pink-950/30",
        name: "Instagram",
        actionText: "View Post",
      }
    case "linkedin":
      return {
        icon: <Linkedin className="h-6 w-6" />,
        color: "text-blue-600",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
        borderColor: "border-blue-200 dark:border-blue-700/30",
        hoverBg: "hover:bg-blue-50 dark:hover:bg-blue-950/30",
        name: "LinkedIn",
        actionText: "View Post",
      }
    default:
      return {
        icon: <Twitter className="h-6 w-6" />,
        color: "text-sky-500",
        bgColor: "bg-sky-50 dark:bg-sky-950/30",
        borderColor: "border-sky-200 dark:border-sky-700/30",
        hoverBg: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
        name: "Twitter",
        actionText: "View Post",
      }
  }
}

export default function SocialFeedCard() {
  const platformInfo = getPlatformInfo(highlightedPost.platform)

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2">
            {platformInfo.icon}
            <Badge
              variant="outline"
              className={`border-${highlightedPost.platform === "linkedin" ? "blue" : highlightedPost.platform === "instagram" ? "pink" : "sky"}-200 ${platformInfo.bgColor} px-3 py-1 text-xs font-medium tracking-wide uppercase ${platformInfo.color}`}
            >
              Featured {platformInfo.name} Post
            </Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Social Highlight
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Check out this popular post that showcases my work and engagement
            with the tech community
          </p>
        </div>

        {/* Highlighted Post Card */}
        <Card
          className={`mx-auto max-w-2xl overflow-hidden border-2 p-0 ${platformInfo.borderColor} shadow-md`}
        >
          <CardContent>
            {/* User info header */}
            <div className="border-b p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border">
                    <img
                      src={highlightedPost.user.avatar}
                      alt={highlightedPost.user.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">
                        {highlightedPost.user.name}
                      </span>
                      {highlightedPost.user.verified && (
                        <VerifiedIcon
                          className={`h-4 w-4 ${platformInfo.color}`}
                          fill="currentColor"
                        />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {highlightedPost.user.handle}
                    </div>
                  </div>
                </div>
                {platformInfo.icon}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <p className="text-base whitespace-pre-line">
                {highlightedPost.content}
              </p>

              {/* Image if available */}
              {highlightedPost.image && (
                <div className="mt-4 overflow-hidden rounded-xl">
                  <div className="relative aspect-video w-full sm:aspect-auto sm:h-64">
                    <img
                      src={highlightedPost.image}
                      alt="Post image"
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{highlightedPost.date}</span>
              </div>

              {/* Metrics */}
              <div className="mt-6 flex items-center justify-around gap-6 border-t pt-4">
                <div></div>
                <div className="flex items-center gap-1.5">
                  <Heart
                    className={`h-5 w-5 ${platformInfo.color}`}
                    fill="currentColor"
                  />
                  <span className="text-sm font-medium">
                    {highlightedPost.metrics.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {highlightedPost.metrics.comments}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {highlightedPost.metrics.shares}
                  </span>
                </div>
                <div className="flex -space-x-2">
                  {linkedinReactions.map((avatar, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <Avatar
                          size="sm"
                          className="bg-white ring-2 ring-background transition-all duration-300 ease-in-out hover:z-1 hover:-translate-y-1 hover:shadow-md"
                        >
                          <AvatarImage src={avatar.src} alt={avatar.name} />
                          <AvatarFallback className="text-xs">
                            {avatar.fallback}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={10}>
                        {avatar.name}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <div className="mt-6">
                <Button
                  className={`w-full gap-2 ${platformInfo.bgColor} ${platformInfo.color} border ${platformInfo.borderColor} hover:bg-opacity-90`}
                  variant="outline"
                  asChild
                >
                  <a
                    href={highlightedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {platformInfo.actionText}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer - Follow Button */}
        <div className="mt-8 flex justify-center">
          <Button variant="default" className={`gap-2`} asChild>
            <a
              href={highlightedPost.url.split("/").slice(0, 3).join("/")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Follow me on {platformInfo.name}</span>
              {platformInfo.icon}
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
