import { DateTimePicker } from "@/components/date-picker"
import { Badge } from "@/components/ui/badge"
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
import { useQuery } from "@tanstack/react-query"
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

const eventDetailsMockData: CalendarEvent = {
  id: "40e99859-83a4-4782-a4f9-20bb673906c9",
  topic:
    "The Future of Enterprise Automation: How Palm Concierge AI is Revolutionizing Customer Experience in 2026",
  channel: "social",
  pillar: "Palm Concierge",
  start: new Date("2026-07-27T16:00:00Z"),
  end: new Date("2026-07-27T17:00:00Z"),
  color: "#3186F5",
  status: "draft",
  subtopics: [
    "Discover the AI-driven concierge trends reshaping hospitality in 2026 and beyond",
    "How Palm Concierge AI knows your customers better than ever before",
    "Breaking barriers: The fusion of enterprise AI and personal touch",
  ],
  keywords: [
    "Palm Concierge AI",
    "enterprise automation",
    "customer experience",
    "2026 trends",
    "hospitality AI",
  ],
  research_insight:
    "AI is becoming a major trend in hospitality, with a focus on preemptive customer knowledge.",
  strapi_entry_id: null,
  live_url: null,
}

const EventDetailsDrawer = ({
  open = false,
  setOpen,
  isMobile = false,
  eventId = null,
}: EventDetailsDrawerProps) => {
  //usequery to fetch event details based on eventId
  const {
    data: eventDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: async () => {
      const response = await api.get(`/api/v1/calendar/${eventId}`)
      return response.data
    },
    enabled: !!eventId, // Only run the query if eventId is not null
  })

  const anchor = useComboboxAnchor()
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>Event Details</DrawerTitle>
          <DrawerDescription>
            Here you can find all the details about the event.
          </DrawerDescription>
        </DrawerHeader>
        {/* <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] text-muted-foreground uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "var(--chart-1)",
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div> */}
        <div className="no-scrollbar overflow-y-auto p-4 px-4 pb-0">
          {/* hERE display form with event details and disabled section and editable section */}
          <form className="space-y-4">
            <div className="mb-4 no-scrollbar overflow-y-auto px-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="event-topic">
                    Topic <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="event-topic"
                    disabled
                    value={eventDetailsMockData.topic}
                    required
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
                    value={eventDetailsMockData.subtopics
                      .map((topic) => `• ${topic}`)
                      .join("\n")}
                    required
                  />
                  {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                </Field>
                {/* Channel */}
                <Field>
                  <FieldLabel htmlFor="event-channel">
                    Channel <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    id="event-channel"
                    value={eventDetailsMockData.channel}
                    disabled
                    required
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
                    value={eventDetailsMockData.pillar}
                  />
                  {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                </Field>
                {/* start end date */}
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="event-start">
                      Start <span className="text-destructive">*</span>
                    </FieldLabel>
                    <DateTimePicker
                      disabled
                      value={eventDetailsMockData.start}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="event-end">
                      End <span className="text-destructive">*</span>
                    </FieldLabel>
                    <DateTimePicker disabled value={eventDetailsMockData.end} />
                  </Field>
                </FieldGroup>
                {/* Color */}

                {/* Status */}
                <Field className="max-w-xs">
                  <FieldLabel>Status</FieldLabel>
                  <Select defaultValue={eventDetailsMockData.status}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent position="popper">
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
                </Field>
                {/* Color */}
                <Field>
                  <FieldLabel htmlFor="event-color">
                    Color <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="flex w-full flex-row items-center space-x-2 pl-2">
                    <div
                      className={`h-8 w-8 cursor-pointer`}
                      style={{ backgroundColor: eventDetailsMockData.color }}
                    ></div>
                    {/* <Input {...field} /> */}
                  </div>
                  {/* <FieldDescription>
                    This name will be displayed on your public profile.
                  </FieldDescription> */}
                </Field>
                {/* keywords */}
                <Field className="max-w-xs">
                  <FieldLabel htmlFor="event-channel">Keywords</FieldLabel>
                  <Combobox
                    multiple
                    autoHighlight
                    items={eventDetailsMockData.keywords}
                    defaultValue={eventDetailsMockData.keywords}
                    disabled
                  >
                    <ComboboxChips ref={anchor}>
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
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
                </Field>
                {/* Research Insight */}
                <Field>
                  <FieldLabel htmlFor="event-pillar">
                    Research Insight:{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Textarea
                    id="event-pillar"
                    disabled
                    required
                    value={eventDetailsMockData.research_insight || ""}
                  />
                </Field>
              </FieldGroup>
            </div>
          </form>
        </div>

        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default EventDetailsDrawer
