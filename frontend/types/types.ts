import type { RowData } from "@tanstack/react-table"

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
  event_id: string
  title: string
  message: string
  event_type: string
  actions?: NotificationAction[]
  status: NotificationStatus
  created_at: string
  updated_at?: string
}

// Notification Center API types
export type NotificationEventType =
  | "generated"
  | "review"
  | "approved"
  | "rejected"
  | "published"
  | "failed"
  | "sync_error"

export interface NotificationActionItem {
  label: string
  type: "button" | "link"
  value: string
}

export interface NotificationsApiResponse {
  data: Notification[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export interface CalendarEvent {
  id: string
  title?: string
  description?: string
  topic: string
  channel: string
  pillar: string
  status: CalendarEventStatus
  subtopics: string[]
  keywords: string[]
  research_insight: string
  strapi_entry_id?: number | null
  live_url?: string | null
  color: string
  start: Date
  end: Date
}

export interface ExtendedEventInput {
  id: string
  title: string
  topic: string
  channel: string
  pillar: string
  status: CalendarEventStatus
  subtopics: string[]
  keywords: string[]
  research_insight: string
  strapi_entry_id?: number | null
  live_url?: string | null
  color: string
  start: Date
  end: Date
}

export interface EventDisplayInfo {
  id: string
  title: string
  topic: string
  channel: string
  pillar: string
  status: CalendarEventStatus
  subtopics: string[]
  keywords: string[]
  research_insight: string
  strapi_entry_id?: string | null
  live_url?: string | null
  color: string
  start: Date
  end: Date
  backgroundColor?: string
  description: string
}

export interface AICompletionProvider {
  complete: (prompt: string, options?: Record<string, unknown>) => Promise<void>
  completion: string
  isLoading: boolean
}

export interface AIAutocompleteOptions {
  /**
   * Whether autocomplete is enabled
   */
  enabled?: boolean

  /**
   * Keys that trigger suggestion acceptance
   */
  acceptKeys?: string[]

  /**
   * Key that dismisses suggestions
   */
  dismissKey?: string

  /**
   * Key that requests new suggestions
   */
  requestKey?: string

  /**
   * Maximum tokens for completion
   */
  maxTokens?: number

  /**
   * Temperature for AI completion
   */
  temperature?: number

  /**
   * Stop sequences for completion
   */
  stopSequences?: string[]

  /**
   * Custom prompt template function
   */
  promptTemplate?: (text: string) => string

  /**
   * Post-processing function for completions
   */
  postProcess?: (completion: string) => string

  /**
   * AI model to use
   */
  model?: string
}

export interface GhostTextPosition {
  top: number
  left: number
}

export interface AIAutocompleteState {
  pendingCompletion: string
  ghostPosition: GhostTextPosition | null
  isEnabled: boolean
}

export type PillarCategory =
  "thought_leadership" | "social" | "blog" | "linkedin_article"

export type PillarContent =
  | "Education"
  | "Case Studies"
  | "Behind the Build"
  | "AI Adoption"
  | "Founder's Journey & Vision"
  | "Thought Leadership"
  | "AI Receptionist"
  | "Customer Service Automation"
  | "AI Staff Augmentation"
  | "Palm Concierge"
  | "Custom AI Solutions"

export const PILLARS: Record<PillarCategory, PillarContent[]> = {
  thought_leadership: [
    "Education",
    "Case Studies",
    "Behind the Build",
    "AI Adoption",
    "Founder's Journey & Vision",
    "Thought Leadership",
  ],
  social: [
    "AI Receptionist",
    "Customer Service Automation",
    "AI Staff Augmentation",
    "Palm Concierge",
    "Custom AI Solutions",
  ],
  blog: [
    "AI Receptionist",
    "Customer Service Automation",
    "AI Staff Augmentation",
    "Palm Concierge",
    "Custom AI Solutions",
  ],
  linkedin_article: [
    "AI Receptionist",
    "Customer Service Automation",
    "AI Staff Augmentation",
    "Palm Concierge",
    "Custom AI Solutions",
  ],
}

export type CalendarEventStatus =
  | "draft"
  | "generating"
  | "ready"
  | "review" //strapi ready
  | "approved" //strapi ready
  | "scheduled" //strapi ready
  | "publishing" //strapi ready
  | "published" //strapi ready
  | "failed"
  | "rejected"

// Required fields only
export interface MediaFile {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  focalPoint: { x: number; y: number } | null

  formats: {
    [key: string]: {
      url: string
      ext: string
      hash: string
      mime: string
      name: string
      path: string | null
      size: number
      width: number
      height: number
      sizeInBytes: number
    }
  }
  width: number
  height: number
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
  createdAt: string
  publishedAt: string
  updatedAt: string
  isUrlSigned?: boolean
  duration?: number //only for video files
}

export type MediaApiResponse = {
  data: MediaFile[]
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}

// Engagement metrics type
interface EngagementMetrics {
  likes: number
  comments: number
  shares: number
  impressions: number
  clickRate: number
  updatedAt: string // ISO date string
}
export type MediaType = "text" | "image" | "document"
// Main Social Post type based on your actual schema
export interface SocialPost {
  id: number
  documentId: string
  title: string | null
  content: string | null // Rich text
  linkedin_post_id?: string | null
  linkedin_post_url?: string | null
  facebook_post_id?: string | null
  facebook_post_url?: string | null
  instagram_post_id?: string | null
  instagram_post_url?: string | null
  post_status: CalendarEventStatus
  media_files: MediaFile[] | null
  thumbnail: MediaFile | null
  media_type: MediaType | null
  hashtags?: string | null
  visibility: string | null
  post_type: string | null
  event_id: string | null
  image_alt_text?: string | null
  image_prompt?: string | null
  start_date: string | null // ISO Date String
  end_date: string | null // ISO Date String
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

// API Response types
export interface SocialPostsResponse {
  data: SocialPost[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export interface SingleSocialPostResponse {
  data: SocialPost
}

// Main Thought Leadership Post type
export interface ThoughtLeadershipPost {
  id: number
  documentId: string
  title: string
  content: string | null // Rich text
  event_id: string | null
  start_date: string | null // ISO Date String
  end_date: string | null // ISO Date String
  post_status: CalendarEventStatus
  visibility: string | null
  post_type: string | null
  linkedin_post_id?: string | null
  linkedin_post_url?: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

// API Response types
export interface ThoughtLeadershipPostsResponse {
  data: ThoughtLeadershipPost[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export interface SingleThoughtLeadershipPostResponse {
  data: ThoughtLeadershipPost
}

export interface LinkedInArticle {
  id: number
  documentId: string
  title: string
  content: string | null // Rich text
  linkedin_post_id?: string | null
  linkedin_post_url?: string | null
  post_status: CalendarEventStatus
  media_files: MediaFile[] | null
  thumbnail: MediaFile | null
  media_type: MediaType
  visibility: string | null
  post_type: string | null
  event_id: string | null
  image_alt_text?: string | null
  image_prompt?: string | null
  start_date: string | null // ISO Date String
  end_date: string | null // ISO Date String
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
}

export interface LinkedInArticlesResponse {
  data: LinkedInArticle[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export interface SingleLinkedInArticleResponse {
  data: LinkedInArticle
}

// Main Blog Post type
export interface BlogPost {
  id: number
  documentId: string
  start_date: string | null // ISO Date String
  end_date: string | null // ISO Date String
  title: string
  content: string | null // Rich text
  blog_post_id?: string | null
  blog_post_url?: string | null
  post_status: CalendarEventStatus
  media_type: MediaType
  visibility: string | null
  image_alt_text?: string | null
  image_prompt?: string | null
  slug: string
  seo_keywords: string | null
  meta_description: string | null
  open_graph_description: string | null
  cta_profile: string | null
  cta_top: string | null
  cta_bottom: string | null
  general_description: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  event_id: string | null
  media_files: MediaFile[] | null
  thumbnail: MediaFile | null
}

// API Response types
export interface BlogPostsResponse {
  data: BlogPost[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      total: number
      pageCount: number
    }
  }
}

export interface SingleBlogPostResponse {
  data: BlogPost
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    thClassName?: string
    tdClassName?: string
  }
}
