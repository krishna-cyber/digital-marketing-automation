import { EventInput } from "@fullcalendar/react"

const todayStr = new Date().toISOString().replace(/T.*$/, "") // YYYY-MM-DD of today
const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000)
  .toISOString()
  .replace(/T.*$/, "")
const dayAfterTomorrowStr = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  .toISOString()
  .replace(/T.*$/, "")

enum PillarType {
  THOUGHFUL_LEADERSHIP = "thoughtful_leadership",
  SOCIAL_CONTENT = "social_content",
  BLOG = "blog",
  LINKEDIN_ARTICLE = "linkedin_article",
  COMMENT_REPLIES = "comment_replies",
}

export type ExtendedEventInput = EventInput & {
  description?: string
  pillarType?: PillarType
}

export const INITIAL_EVENTS: ExtendedEventInput[] = [
  {
    id: "1",
    title: "Campaign kickoff workshop",
    start: todayStr,
    end: "2026-07-10",
    color: "#7c3aed",
    allDay: true,
    url: "https://www.google.com",
    description:
      "Align the team on goals, messaging, and the first content sprint.",
    pillarType: PillarType.THOUGHFUL_LEADERSHIP,
  },
  {
    id: "2",
    title: "LinkedIn article draft review",
    start: todayStr + "T10:00:00",
    end: todayStr + "T11:00:00",
    color: "#2563eb",
    allDay: false,
    description:
      "Review the draft, tighten the hook, and approve the publish version.",
    pillarType: PillarType.LINKEDIN_ARTICLE,
  },
  {
    id: "3",
    title: "Blog outline and SEO brief",
    start: todayStr + "T13:30:00",
    end: todayStr + "T15:00:00",
    color: "#f59e0b",
    allDay: false,
    description:
      "Map keywords, headings, and the conversion goal for the next post.",
    pillarType: PillarType.BLOG,
  },
  {
    id: "4",
    title: "Social content batch production",
    start: tomorrowStr + "T09:00:00",
    end: tomorrowStr + "T12:00:00",
    color: "#16a34a",
    allDay: false,
    description:
      "Prepare captions, export visuals, and queue the week’s posts.",
    pillarType: PillarType.SOCIAL_CONTENT,
  },
  {
    id: "5",
    title: "Audience engagement review",
    start: tomorrowStr,
    color: "#ec4899",
    allDay: true,
    description:
      "Review comments, capture common questions, and prioritize replies.",
    pillarType: PillarType.COMMENT_REPLIES,
  },
  {
    id: "6",
    title: "Campaign optimization sprint",
    start: tomorrowStr + "T14:00:00",
    end: tomorrowStr + "T15:30:00",
    color: "#ef4444",
    allDay: false,
    description:
      "Adjust creative, refresh copy, and compare engagement across channels.",
    pillarType: PillarType.THOUGHFUL_LEADERSHIP,
  },
  {
    id: "7",
    title: "Multi-day launch window",
    start: tomorrowStr,
    end: dayAfterTomorrowStr,
    color: "#0f766e",
    allDay: true,
    description:
      "A two-day launch window for rollout tasks, final approvals, and live monitoring.",
    pillarType: PillarType.SOCIAL_CONTENT,
  },
]
