import { Calendar, ExternalLink } from "lucide-react"
import React from "react"
import { Card, CardContent } from "./card"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Linkedin } from "./brand-icons"
import { Button } from "./button"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const highlightedPost = {
  platform: "linkedin", // Options: twitter, instagram, linkedin
  pinned: true,
  featuredText: "Most Popular Tweet",
  user: {
    name: "Pal Mind AI",
    handle: "@alexmdev",
    avatar: "/logo.jpeg",
    verified: true,
  },
  content:
    "I'm thrilled to announce that my open-source project ReactiveDash has reached 1,000 stars on GitHub! 🎉 \n\nThank you to all contributors and users who've helped make this dashboard library even better. \n\nCheck it out if you're building React dashboards: github.com/alexmdev/reactive-dash",
  date: "June 15, 2023",
  hashtags: ["#React", "#Dashboard", "#OpenSource"],
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

const ThumbsUpFlippedIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="#000000"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(-1, 1)" // Cleaned up flip transformation
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path d="M19.017 31.992c-9.088 0-9.158-0.377-10.284-1.224-0.597-0.449-1.723-0.76-5.838-1.028-0.298-0.020-0.583-0.134-0.773-0.365-0.087-0.107-2.143-3.105-2.143-7.907 0-4.732 1.472-6.89 1.534-6.99 0.182-0.293 0.503-0.47 0.847-0.47 3.378 0 8.062-4.313 11.21-11.841 0.544-1.302 0.657-2.159 2.657-2.159 1.137 0 2.413 0.815 3.042 1.86 1.291 2.135 0.636 6.721 0.029 9.171 2.063-0.017 5.796-0.045 7.572-0.045 2.471 0 4.107 1.473 4.156 3.627 0.017 0.711-0.077 1.619-0.282 2.089 0.544 0.543 1.245 1.36 1.276 2.414 0.038 1.36-0.852 2.395-1.421 2.989 0.131 0.395 0.391 0.92 0.366 1.547-0.063 1.542-1.253 2.535-1.994 3.054 0.061 0.422 0.11 1.218-0.026 1.834-0.535 2.457-4.137 3.443-9.928 3.443zM3.426 27.712c3.584 0.297 5.5 0.698 6.51 1.459 0.782 0.589 0.662 0.822 9.081 0.822 2.568 0 7.59-0.107 7.976-1.87 0.153-0.705-0.59-1.398-0.593-1.403-0.203-0.501 0.023-1.089 0.518-1.305 0.008-0.004 2.005-0.719 2.050-1.835 0.030-0.713-0.46-1.142-0.471-1.16-0.291-0.452-0.185-1.072 0.257-1.38 0.005-0.004 1.299-0.788 1.267-1.857-0.024-0.849-1.143-1.447-1.177-1.466-0.25-0.143-0.432-0.39-0.489-0.674-0.056-0.282 0.007-0.579 0.183-0.808 0 0 0.509-0.808 0.49-1.566-0.037-1.623-1.782-1.674-2.156-1.674-2.523 0-9.001 0.025-9.001 0.025-0.349 0.002-0.652-0.164-0.84-0.443s-0.201-0.627-0.092-0.944c0.977-2.813 1.523-7.228 0.616-8.736-0.267-0.445-0.328-0.889-1.328-0.889-0.139 0-0.468 0.11-0.812 0.929-3.341 7.995-8.332 12.62-12.421 13.037-0.353 0.804-1.016 2.47-1.016 5.493 0 3.085 0.977 5.473 1.447 6.245z" />
      </g>
    </svg>
  )
}
const DocIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 -0.5 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M9.0001 8.517C8.58589 8.517 8.2501 8.85279 8.2501 9.267C8.2501 9.68121 8.58589 10.017 9.0001 10.017V8.517ZM16.0001 10.017C16.4143 10.017 16.7501 9.68121 16.7501 9.267C16.7501 8.85279 16.4143 8.517 16.0001 8.517V10.017ZM9.8751 11.076C9.46089 11.076 9.1251 11.4118 9.1251 11.826C9.1251 12.2402 9.46089 12.576 9.8751 12.576V11.076ZM15.1251 12.576C15.5393 12.576 15.8751 12.2402 15.8751 11.826C15.8751 11.4118 15.5393 11.076 15.1251 11.076V12.576ZM9.1631 5V4.24998L9.15763 4.25002L9.1631 5ZM15.8381 5L15.8438 4.25H15.8381V5ZM19.5001 8.717L18.7501 8.71149V8.717H19.5001ZM19.5001 13.23H18.7501L18.7501 13.2355L19.5001 13.23ZM18.4384 15.8472L17.9042 15.3207L17.9042 15.3207L18.4384 15.8472ZM15.8371 16.947V17.697L15.8426 17.697L15.8371 16.947ZM9.1631 16.947V16.197C9.03469 16.197 8.90843 16.23 8.79641 16.2928L9.1631 16.947ZM5.5001 19H4.7501C4.7501 19.2662 4.89125 19.5125 5.12097 19.6471C5.35068 19.7817 5.63454 19.7844 5.86679 19.6542L5.5001 19ZM5.5001 8.717H6.25012L6.25008 8.71149L5.5001 8.717ZM6.56175 6.09984L6.02756 5.5734H6.02756L6.56175 6.09984ZM9.0001 10.017H16.0001V8.517H9.0001V10.017ZM9.8751 12.576H15.1251V11.076H9.8751V12.576ZM9.1631 5.75H15.8381V4.25H9.1631V5.75ZM15.8324 5.74998C17.4559 5.76225 18.762 7.08806 18.7501 8.71149L20.2501 8.72251C20.2681 6.2708 18.2955 4.26856 15.8438 4.25002L15.8324 5.74998ZM18.7501 8.717V13.23H20.2501V8.717H18.7501ZM18.7501 13.2355C18.7558 14.0153 18.4516 14.7653 17.9042 15.3207L18.9726 16.3736C19.7992 15.5348 20.2587 14.4021 20.2501 13.2245L18.7501 13.2355ZM17.9042 15.3207C17.3569 15.8761 16.6114 16.1913 15.8316 16.197L15.8426 17.697C17.0201 17.6884 18.1461 17.2124 18.9726 16.3736L17.9042 15.3207ZM15.8371 16.197H9.1631V17.697H15.8371V16.197ZM8.79641 16.2928L5.13341 18.3458L5.86679 19.6542L9.52979 17.6012L8.79641 16.2928ZM6.2501 19V8.717H4.7501V19H6.2501ZM6.25008 8.71149C6.24435 7.93175 6.54862 7.18167 7.09595 6.62627L6.02756 5.5734C5.20098 6.41216 4.74147 7.54494 4.75012 8.72251L6.25008 8.71149ZM7.09595 6.62627C7.64328 6.07088 8.38882 5.75566 9.16857 5.74998L9.15763 4.25002C7.98006 4.2586 6.85413 4.73464 6.02756 5.5734L7.09595 6.62627Z"
          fill="#000000"
        />
      </g>
    </svg>
  )
}

const RepostIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="#000000"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      transform="none"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path d="M19 7a1 1 0 0 0-1-1h-8v2h7v5h-3l3.969 5L22 13h-3V7zM5 17a1 1 0 0 0 1 1h8v-2H7v-5h3L6 6l-4 5h3v6z" />
      </g>
    </svg>
  )
}

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      id="send-alt"
      className="icon glyph"
      fill="#000000"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M21.88,4.73,16.2,20.65A2,2,0,0,1,14.3,22h0a2,2,0,0,1-1.9-1.31l-2.12-5.52,1.54-1.54,2.49-2.49a1,1,0,1,0-1.42-1.42l-2.49,2.49L8.82,13.76,3.31,11.63a2,2,0,0,1,0-3.83L19.27,2.12a2,2,0,0,1,2.61,2.61Z"
          style={{ fill: "#231f20" }}
        />
      </g>
    </svg>
  )
}
const LinkedInPostCard = () => {
  return (
    <Card className="mx-auto max-w-2xl overflow-hidden border-2 border-blue-200 p-0 shadow-md dark:border-blue-800">
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
                  {highlightedPost.user.verified && <PremiumLinkedInIcon />}
                </div>
                <div className="text-sm text-muted-foreground">
                  {highlightedPost.user.handle}
                </div>
              </div>
            </div>
            {/* {platformInfo.icon} */}
            <Linkedin className="h-6 w-6" />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p className="text-base whitespace-pre-line">
            {highlightedPost.content}
            <br />
            {highlightedPost.hashtags?.map((hashtag) => (
              <span
                key={hashtag}
                className="mr-2 inline-block cursor-pointer bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
              >
                {hashtag}
              </span>
            ))}
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
          <div className="mt-6 flex items-center justify-between gap-6 border-t pt-4">
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-1.5">
                <ThumbsUpFlippedIcon className={`h-5 w-5 text-blue-600`} />
                <span className="text-sm font-medium">
                  {highlightedPost.metrics.likes}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <DocIcon className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {highlightedPost.metrics.comments}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <RepostIcon className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {highlightedPost.metrics.shares}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <SendIcon className="h-5 w-5" />
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
          <div className="mt-6">
            <Button
              className={`hover:bg-opacity-90 w-full gap-2 border border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-700/30 dark:bg-blue-950/30`}
              variant="outline"
              asChild
            >
              <a
                href={highlightedPost.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* {platformInfo.actionText} */}
                View Post
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LinkedInPostCard
