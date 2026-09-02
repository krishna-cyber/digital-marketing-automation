import { DateTimePicker } from "@/components/date-picker"
import { ContentLifecycleTimeline } from "@/components/examples/content-lifecycle-timeline"
import { Button } from "@/components/ui/button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/lib/api"
import { CalendarEvent } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { enUS } from "date-fns/locale"
import {
  Ban,
  Calendar,
  CheckCircle,
  Eye,
  FileText,
  Globe,
  Loader2,
  ScanIcon,
  ThumbsUp,
  Upload,
  XCircle,
} from "lucide-react"
import React, { ReactElement } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
interface EventDetailsDrawerProps {
  open?: boolean
  setOpen?: (open: boolean) => void
  isMobile?: boolean
  eventId?: string | null
}
interface Item {
  label: string
  value: string | null
  icon: ReactElement | null
}

const status_items: Item[] = [
  {
    label: "Select an option",
    value: null,
    icon: <ScanIcon className="size-4 text-muted-foreground" />,
  },
  {
    label: "Draft",
    value: "draft",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    label: "Generating",
    value: "generating",
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
  },
  {
    label: "Ready",
    value: "ready",
    icon: <CheckCircle className="h-4 w-4" />,
  },
  {
    label: "Review",
    value: "review",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    label: "Approved",
    value: "approved",
    icon: <ThumbsUp className="h-4 w-4" />,
  },
  {
    label: "Scheduled",
    value: "scheduled",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    label: "Publishing",
    value: "publishing",
    icon: <Upload className="h-4 w-4" />,
  },
  {
    label: "Published",
    value: "published",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    label: "Failed",
    value: "failed",
    icon: <XCircle className="h-4 w-4" />,
  },
  {
    label: "Rejected",
    value: "rejected",
    icon: <Ban className="h-4 w-4" />,
  },
]

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  subtopics: z.array(z.string()).min(1, "At least one subtopic is required"),
  channel: z.string().min(1, "Channel is required"),
  pillar: z.string().min(1, "Pillar is required"),
  start: z.date(),
  end: z.date(),
  status: z
    .enum([
      "draft",
      "generating",
      "ready",
      "review",
      "approved",
      "scheduled",
      "publishing",
      "published",
      "failed",
      "rejected",
    ])
    .default("draft"),
  color: z.string().min(1, "Color is required"),
  keywords: z.array(z.string()).optional(),
  research_insight: z.string().min(1, "Research insight is required"),
})

type EventDetailsFormValues = z.input<typeof formSchema>

// const eventDetailsMockData: CalendarEvent = {
//   id: "40e99859-83a4-4782-a4f9-20bb673906c9",
//   topic:
//     "The Future of Enterprise Automation: How Palm Concierge AI is Revolutionizing Customer Experience in 2026",
//   channel: "social",
//   pillar: "Palm Concierge",
//   start: new Date("2026-07-27T16:00:00Z"),
//   end: new Date("2026-07-27T17:00:00Z"),
//   color: "#3186F5",
//   status: "draft",
//   subtopics: [
//     "Discover the AI-driven concierge trends reshaping hospitality in 2026 and beyond",
//     "How Palm Concierge AI knows your customers better than ever before",
//     "Breaking barriers: The fusion of enterprise AI and personal touch",
//   ],
//   keywords: [
//     "Palm Concierge AI",
//     "enterprise automation",
//     "customer experience",
//     "2026 trends",
//     "hospitality AI",
//   ],
//   research_insight:
//     "AI is becoming a major trend in hospitality, with a focus on preemptive customer knowledge.",
//   strapi_entry_id: null,
//   live_url: null,
// }

const EventDetailsDrawer = ({
  open = false,
  setOpen,
  isMobile = false,
  eventId = null,
}: EventDetailsDrawerProps) => {
  //usequery to fetch event details based on eventId
  const { data: eventDetails, isLoading } = useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/calendar/${eventId}`)
      return response.data as { data: CalendarEvent }
    },
    enabled: !!eventId, // Only run the query if eventId is not null
  })

  const form = useForm<EventDetailsFormValues>({
    resolver: zodResolver(formSchema),
    values: eventDetails?.data
      ? {
          topic: eventDetails.data.topic,
          subtopics: eventDetails.data.subtopics || [],
          channel: eventDetails.data.channel,
          pillar: eventDetails.data.pillar,
          start: eventDetails.data.start,
          end: eventDetails.data.end,
          status: eventDetails.data.status,
          color: eventDetails.data.color,
          keywords: eventDetails.data.keywords || [],
          research_insight: eventDetails.data.research_insight,
        }
      : undefined,
  })

  const anchor = useComboboxAnchor()
  return (
    <div className="flex items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {eventDetails?.data?.topic || "Event Details"}
            </DialogTitle>
            {/* <DialogDescription>
              {eventDetails?.data?.subtopics?.length &&
              eventDetails.data.subtopics.length > 0
                ? eventDetails?.data?.subtopics.map((subtopic, index) => (
                    <p key={index}>{subtopic}</p>
                  ))
                : "No subtopics available."}
            </DialogDescription> */}
            <DialogDescription>
              {eventDetails?.data?.research_insight
                ? `Research Insight: ${eventDetails.data.research_insight}`
                : "No research insight available."}
            </DialogDescription>
          </DialogHeader>
          {/* Scrollable content */}
          <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
            {/* hERE display form with event details and disabled section and editable section */}
            <form
              id="event-edit-form"
              onSubmit={form.handleSubmit((data) => {
                console.log("Form submitted", data)
              })}
            >
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="event-topic">
                    Topic <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="event-topic"
                    disabled
                    required
                    {...form.register("topic")}
                  />
                  {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                </Field>

                {/* Sub topics */}
                <Field>
                  <FieldLabel htmlFor="event-sub-topic">
                    Sub topic <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="event-sub-topic"
                    disabled
                    required
                    value={(
                      useWatch({ control: form.control, name: "subtopics" }) ??
                      []
                    )
                      .map((topic) => `• ${topic}`)
                      .join("\n")}
                    onChange={(e) =>
                      form.setValue(
                        "subtopics",
                        e.target.value
                          .split("\n")
                          .map((line) => line.replace(/^•\s*/, ""))
                          .filter(Boolean)
                      )
                    }
                  />
                  {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                </Field>

                <FieldGroup className="flex flex-row gap-4">
                  {/* Channel */}
                  <Field>
                    <FieldLabel htmlFor="event-channel">
                      Channel <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="event-channel"
                      disabled
                      required
                      {...form.register("channel")}
                    />
                    {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                  </Field>
                  {/* pillar */}
                  <Field>
                    <FieldLabel htmlFor="event-pillar">
                      Pillar <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      id="event-pillar"
                      required
                      disabled
                      {...form.register("pillar")}
                    />
                    {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                  </Field>
                </FieldGroup>

                {/* start end date */}
                <FieldGroup className="flex flex-row gap-4">
                  <Field>
                    <FieldLabel htmlFor="event-start">
                      Start <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="start"
                      render={({ field }) => (
                        <DateTimePicker
                          disabled
                          locale={enUS}
                          showOutsideDays
                          showWeekNumber={false}
                          weekStartsOn={0}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="event-end">
                      End <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Controller
                      control={form.control}
                      name="end"
                      render={({ field }) => (
                        <DateTimePicker
                          disabled
                          locale={enUS}
                          showOutsideDays
                          showWeekNumber={false}
                          weekStartsOn={0}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      )}
                    />
                  </Field>
                </FieldGroup>

                <FieldGroup className="flex flex-row gap-4">
                  {/* Status */}
                  <Field className="max-w-xs">
                    <FieldLabel>Status</FieldLabel>
                    <Controller
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled
                        >
                          <SelectTrigger className="w-50">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent alignItemWithTrigger={true}>
                            <SelectGroup>
                              {status_items.slice(1).map((item) => (
                                <SelectItem
                                  disabled
                                  key={item.value}
                                  value={item.value!}
                                >
                                  {item.icon}
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                  {/* keywords */}
                  <Field className="max-w-xs">
                    <FieldLabel htmlFor="event-channel">Keywords</FieldLabel>
                    <Controller
                      control={form.control}
                      name="keywords"
                      render={({ field }) => (
                        <Combobox
                          multiple
                          autoHighlight
                          items={field.value || []}
                          defaultValue={field.value || []}
                          disabled
                          onValueChange={field.onChange}
                        >
                          <ComboboxChips ref={anchor}>
                            <ComboboxValue>
                              {(values) => (
                                <>
                                  {values.map((value: string) => (
                                    <ComboboxChip key={value}>
                                      {value}
                                    </ComboboxChip>
                                  ))}
                                  <ComboboxChipsInput placeholder="Select keywords..." />
                                </>
                              )}
                            </ComboboxValue>
                          </ComboboxChips>
                          <ComboboxContent anchor={anchor}>
                            <ComboboxEmpty>No keywords found.</ComboboxEmpty>
                            <ComboboxList>
                              {(item) => (
                                <ComboboxItem key={item} value={item}>
                                  {item}
                                </ComboboxItem>
                              )}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      )}
                    />
                  </Field>
                </FieldGroup>

                {/* Research Insight */}
                <Field>
                  <FieldLabel htmlFor="research-insight">
                    Research Insight:{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="research-insight"
                    disabled
                    required
                    {...form.register("research_insight")}
                  />
                </Field>
              </FieldGroup>
              {/* Content lifecycle timeline */}
              {/* <FieldGroup className="mt-8">
                <ContentLifecycleTimeline />
              </FieldGroup> */}
            </form>
          </div>

          {/* <Separator className="my-4" /> */}
          <DialogFooter>
            <Button disabled={isLoading} type="submit" form="event-edit-form">
              Submit
            </Button>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EventDetailsDrawer
