import { cn } from "@/lib/utils"
import {
  Calendar,
  ExternalLink,
  MessageCircleMore,
  Repeat2,
  Send,
  ThumbsUp,
} from "lucide-react"
import React, { useState } from "react"
import { Card, CardContent } from "./card"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Linkedin } from "./brand-icons"
import { Button } from "./button"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

export interface LinkedInPostUser {
  name: string
  handle: string
  avatar: string
  verified?: boolean
}

export interface LinkedInPostMetrics {
  likes: number
  comments: number
  shares: number
}

export interface LinkedInPostCardProps {
  platform?: string
  pinned?: boolean
  featuredText?: string
  user?: LinkedInPostUser
  content: string
  date: string
  hashtags?: string[]
  image?: string
  metrics?: LinkedInPostMetrics
  url?: string
  maxLines?: number // New prop for maximum lines before truncation
}

const linkedinReactions = [
  {
    src: "/linkedin/clap.png",
    fallback: "",
    name: "Clap",
  },
  {
    src: "/linkedin/thumbsup.png",
    fallback: "ML",
    name: "thumbs-up",
  },
  {
    src: "/linkedin/support.png",
    fallback: "ER",
    name: "heart",
  },
  {
    src: "/linkedin/funny.png",
    fallback: "JW",
    name: "funny",
  },
]

// New component for text expansion
const ExpandableText = ({
  text,
  maxLines = 5,
  hashtags = [],
}: {
  text: string
  maxLines?: number
  hashtags?: string[]
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const textRef = React.useRef<HTMLParagraphElement>(null)

  React.useEffect(() => {
    if (textRef.current) {
      const lineHeight =
        parseInt(getComputedStyle(textRef.current).lineHeight) || 20
      const maxHeight = lineHeight * maxLines
      const isOverflowing = textRef.current.scrollHeight > maxHeight
      setShowButton(isOverflowing)
    }
  }, [text, maxLines])

  return (
    <div>
      <p
        ref={textRef}
        className={cn(
          "text-base whitespace-pre-line",
          !isExpanded && showButton && `line-clamp-${maxLines}`
        )}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: !isExpanded && showButton ? maxLines : "unset",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
        <br />
        {hashtags?.map((hashtag) => (
          <span
            key={hashtag}
            className="mr-2 inline-block cursor-pointer bg-blue-100 text-sm text-blue-800 dark:bg-blue-800 dark:text-blue-200"
          >
            {hashtag}
          </span>
        ))}
      </p>

      {showButton && (
        <Button
          variant="link"
          type="button"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  )
}

function PremiumLinkedInIcon() {
  return (
    <svg
      height="15px"
      width="15px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 382 382"
      xmlSpace="preserve"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          style={{ fill: "#b86b00" }}
          d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
        />
      </g>
    </svg>
  )
}

const LinkedInPostCard = ({
  content,
  date = "June 15, 2023",
  metrics = {
    likes: 875,
    comments: 143,
    shares: 346,
  },
  platform = "linkedin",
  url = "#",
  user = {
    name: "Pal Mind AI",
    handle: "@alexmdev",
    avatar: "/logo.jpeg",
    verified: true,
  },
  featuredText = "Most Popular Tweet",
  hashtags = ["#React", "#Dashboard", "#OpenSource"],
  image,
  pinned = true,
  maxLines = 5, // Default to 5 lines
}: LinkedInPostCardProps) => {
  console.log("LinkedInPostCard props:", {
    content,
    date,
    metrics,
    platform,
    url,
    user,
    featuredText,
    hashtags,
    image,
    pinned,
    maxLines,
  })
  return (
    <Card
      className={cn(
        "mx-auto max-w-2xl overflow-hidden border-2 border-blue-200 p-0 shadow-md dark:border-blue-800"
      )}
    >
      <CardContent>
        {/* User info header */}
        <div className="border-b p-3 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="lg" className="bg-white ring-2 ring-background">
                <AvatarImage src={user.avatar} alt="User Avatar" />
                <AvatarFallback className="text-xs">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">{user.name}</span>
                  {user.verified && <PremiumLinkedInIcon />}
                </div>
                <div className="text-sm text-muted-foreground">
                  {user.handle}
                </div>
              </div>
            </div>
            <Linkedin className="h-6 w-6" />
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          {/* Replace the content paragraph with ExpandableText */}
          <ExpandableText
            text={content}
            maxLines={maxLines}
            hashtags={hashtags}
          />

          {/* Image if available */}
          {image && (
            <div className="mt-4 overflow-hidden rounded-xl">
              <div className="relative aspect-video w-full sm:aspect-auto sm:h-60">
                <img src={image} alt="Post image" className="object-cover" />
              </div>
            </div>
          )}

          {/* Date */}
          <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>

          {/* Metrics */}
          <div className="mt-2 flex items-center justify-between border-t pt-2">
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <ThumbsUp className={`h-5 w-5 text-blue-600`} />
                <span className="text-sm font-medium">{metrics.likes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircleMore className="h-5 w-5" />
                <span className="text-sm font-medium">{metrics.comments}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Repeat2 className="h-5 w-5" />
                <span className="text-sm font-medium">{metrics.shares}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Send className="h-5 w-5" />
              </div>
            </div>
            <div className="flex -space-x-1.5">
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
                  <TooltipContent sideOffset={10}>{avatar.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="mt-3">
            <Button
              className={`hover:bg-opacity-90 w-full gap-2 border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-700/30 dark:bg-blue-950/30`}
              variant="outline"
              render={
                <a href={url} target="_blank" rel="noopener noreferrer">
                  View Post
                  <ExternalLink className="h-4 w-4" />
                </a>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LinkedInPostCard
