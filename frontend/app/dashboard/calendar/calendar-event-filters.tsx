"use client"

import { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PILLARS, type CalendarEventStatus } from "@/types/types"
import {
  BadgeCheck,
  Ban,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  FileText,
  FilterX,
  Globe,
  LayoutGrid,
  LoaderCircle,
  Send,
  Tags,
  X,
  XCircle,
} from "lucide-react"

interface Item {
  label: string
  value: string | null
  icon: ReactElement
}

// Icon for each CalendarEventStatus value
const STATUS_ICONS: Record<CalendarEventStatus, ReactElement> = {
  draft: <FileText className="size-4 text-muted-foreground" />,
  generating: <LoaderCircle className="size-4 text-muted-foreground" />,
  ready: <CheckCircle2 className="size-4 text-muted-foreground" />,
  review: <ClipboardList className="size-4 text-muted-foreground" />,
  approved: <BadgeCheck className="size-4 text-muted-foreground" />,
  scheduled: <CalendarClock className="size-4 text-muted-foreground" />,
  publishing: <Send className="size-4 text-muted-foreground" />,
  published: <Globe className="size-4 text-muted-foreground" />,
  failed: <XCircle className="size-4 text-muted-foreground" />,
  rejected: <Ban className="size-4 text-muted-foreground" />,
}

// Select items derived from the CalendarEventStatus type.
// The first item (value: null) is the placeholder / "all" option.
export const STATUS_FILTER_ITEMS: Item[] = [
  {
    label: "All statuses",
    value: null,
    icon: <LayoutGrid className="size-4 text-muted-foreground" />,
  },
  ...(Object.keys(STATUS_ICONS) as CalendarEventStatus[]).map((status) => ({
    label: status.charAt(0).toUpperCase() + status.slice(1),
    value: status,
    icon: STATUS_ICONS[status],
  })),
]

// Select items derived from the PillarContent type.
// The first item (value: null) is the placeholder / "all" option.
export const PILLAR_FILTER_ITEMS: Item[] = [
  {
    label: "All pillars",
    value: null,
    icon: <LayoutGrid className="size-4 text-muted-foreground" />,
  },
  ...[...new Set(Object.values(PILLARS).flat())].map((pillar) => ({
    label: pillar,
    value: pillar,
    icon: <Tags className="size-4 text-muted-foreground" />,
  })),
]

// Controlled select that follows the filters-with-icon pattern.
// Shows a small clear (X) button to remove just this filter.
function FilterSelect({
  label,
  items,
  value,
  onValueChange,
}: Readonly<{
  label: string
  items: Item[]
  value: Item | null
  onValueChange: (item: Item | null) => void
}>) {
  // A filter is "active" when a specific (non-"all") item is selected
  const isActive = value?.value != null

  console.log("FilterSelect", { label, value, isActive })

  return (
    <Field className="w-fit">
      <div className="flex items-center">
        <Select
          value={value ?? undefined}
          onValueChange={onValueChange}
          items={items}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue>
              {(item: Item | null) => (
                <span className="flex items-center gap-2">
                  {item?.icon && item.icon}
                  <span>{item?.label}</span>
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {items.slice(1).map((item) => (
                <SelectItem key={item.value} value={item}>
                  {item.icon}
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isActive && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Clear ${label} filter`}
            onClick={() => onValueChange(items[0])}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </Field>
  )
}

export function CalendarEventFilters({
  pillar,
  status,
  onPillarChange,
  onStatusChange,
}: Readonly<{
  pillar: string
  status: string
  onPillarChange: (value: string) => void
  onStatusChange: (value: string) => void
}>) {
  // Resolve the current URL/query values to their matching select items
  const pillarItem =
    PILLAR_FILTER_ITEMS.find((item) => item.value === pillar) ??
    PILLAR_FILTER_ITEMS[0]
  const statusItem =
    STATUS_FILTER_ITEMS.find((item) => item.value === status) ??
    STATUS_FILTER_ITEMS[0]

  // Reset every filter back to its "all" (placeholder) item
  function resetAllFilters() {
    onPillarChange("")
    onStatusChange("")
  }

  const hasActiveFilters =
    pillarItem?.value != null || statusItem?.value != null

  return (
    <div className="mt-2 flex items-center justify-end space-x-2 py-4">
      <FilterSelect
        label="Pillar"
        items={PILLAR_FILTER_ITEMS}
        value={pillarItem}
        onValueChange={(item) => onPillarChange(item?.value ?? "")}
      />
      <FilterSelect
        label="Status"
        items={STATUS_FILTER_ITEMS}
        value={statusItem}
        onValueChange={(item) => onStatusChange(item?.value ?? "")}
      />
      {hasActiveFilters && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetAllFilters}
        >
          <FilterX className="size-4" />
          Reset
        </Button>
      )}
    </div>
  )
}
