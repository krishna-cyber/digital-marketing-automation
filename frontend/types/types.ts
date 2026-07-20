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
  | "review"
  | "approved"
  | "scheduled"
  | "publishing"
  | "published"
  | "failed"
  | "rejected"
