"use client"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { NotificationsApiResponse } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { useQueryStates } from "nuqs"
import { parseAsInteger } from "nuqs/server"
import React from "react"
import { renderList } from "./render-list"

const searchParams = {
  pageIndex: parseAsInteger.withDefault(1), // 1-indexed, user-facing
  pageSize: parseAsInteger.withDefault(20), // 1-indexed, user-facing
}

const NotificationRender = () => {
  const [{ pageIndex, pageSize }, setSearch] = useQueryStates(searchParams)

  const { data } = useQuery({
    queryKey: ["notifications", pageIndex, pageSize],
    queryFn: async () => {
      const response = await api.get(
        `/api/v1/notifications?page=${pageIndex}&page_size=${pageSize}`
      )
      return response.data as NotificationsApiResponse
    },
  })

  const notificationsData = data?.data ?? []

  const paginationMeta = data?.meta?.pagination
  const total = paginationMeta?.total ?? notificationsData.length
  const totalPages = Math.max(
    1,
    paginationMeta?.pageCount ?? Math.ceil(total / pageSize)
  )
  const start = total === 0 ? 0 : (pageIndex - 1) * pageSize + 1
  const end = Math.min(pageIndex * pageSize, total)
  const hasPrev = pageIndex > 1
  const hasNext = pageIndex < totalPages

  React.useEffect(() => {
    if (!paginationMeta) return
    const updates: { pageIndex?: number; pageSize?: number } = {}
    if (paginationMeta.page && paginationMeta.page !== pageIndex) {
      updates.pageIndex = paginationMeta.page
    }
    if (paginationMeta.pageSize && paginationMeta.pageSize !== pageSize) {
      updates.pageSize = paginationMeta.pageSize
    }
    if (Object.keys(updates).length > 0) {
      setSearch(updates)
    }
  }, [paginationMeta, pageIndex, pageSize, setSearch])

  const unreadNotifications = notificationsData.filter(
    (n) => n.status === "unread"
  )
  const readNotifications = notificationsData.filter((n) => n.status === "read")

  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All ({notificationsData.length})</TabsTrigger>
        <TabsTrigger value="unread">
          Unread ({unreadNotifications.length})
        </TabsTrigger>
        <TabsTrigger value="read">
          Read ({readNotifications.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-4">
        {renderList(notificationsData)}
      </TabsContent>
      <TabsContent value="unread" className="mt-4">
        {renderList(unreadNotifications)}
      </TabsContent>
      <TabsContent value="read" className="mt-4">
        {renderList(readNotifications)}
      </TabsContent>
      {/* Pagination */}
      <Pagination>
        <PaginationContent className="w-full justify-between">
          <PaginationItem className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
              Rows per page
            </span>
            <NativeSelect
              className="w-18"
              value={pageSize}
              onChange={(e) => {
                setSearch({ pageSize: Number(e.target.value), pageIndex: 1 })
              }}
            >
              <NativeSelectOption value="10">10</NativeSelectOption>
              <NativeSelectOption value="20">20</NativeSelectOption>
              <NativeSelectOption value="25">25</NativeSelectOption>
              <NativeSelectOption value="50">50</NativeSelectOption>
              <NativeSelectOption value="100">100</NativeSelectOption>
            </NativeSelect>
          </PaginationItem>
          <PaginationItem className="flex items-center gap-3">
            <span className="text-sm whitespace-nowrap text-muted-foreground">
              {start}-{end} of {total}
            </span>
            <div className="flex gap-1">
              <PaginationLink
                aria-disabled={!hasPrev}
                className={cn(!hasPrev && "pointer-events-none opacity-50")}
                onClick={() => {
                  if (hasPrev) setSearch({ pageIndex: 1 })
                }}
                size="icon"
                aria-label="Go to first page"
              >
                <ChevronFirstIcon className="size-4" />
              </PaginationLink>
              <PaginationLink
                onClick={() => {
                  if (hasPrev)
                    setSearch({ pageIndex: Math.max(1, pageIndex - 1) })
                }}
                aria-disabled={!hasPrev}
                className={cn(!hasPrev && "pointer-events-none opacity-50")}
                size="icon"
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon className="size-4" />
              </PaginationLink>
              <PaginationLink
                onClick={() => {
                  if (hasNext)
                    setSearch({
                      pageIndex: Math.min(totalPages, pageIndex + 1),
                    })
                }}
                aria-disabled={!hasNext}
                className={cn(!hasNext && "pointer-events-none opacity-50")}
                size="icon"
                aria-label="Go to next page"
              >
                <ChevronRightIcon className="size-4" />
              </PaginationLink>
              <PaginationLink
                onClick={() => {
                  if (hasNext) setSearch({ pageIndex: totalPages })
                }}
                aria-disabled={!hasNext}
                className={cn(!hasNext && "pointer-events-none opacity-50")}
                size="icon"
                aria-label="Go to last page"
              >
                <ChevronLastIcon className="size-4" />
              </PaginationLink>
            </div>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Tabs>
  )
}

export default NotificationRender
