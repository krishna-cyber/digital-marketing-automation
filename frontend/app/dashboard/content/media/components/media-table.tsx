"use client"

import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableToolbar } from "@/components/data-table-toolbar"
import { DataTableSkeleton } from "@/components/examples/data-table-skleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { strapiRequest } from "@/lib/api"
import { cn } from "@/lib/utils"
import { MediaApiResponse } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import {
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { useState } from "react"
import { defaultMediaData } from "../data/data"
import DeleteMediaAlert from "./delete-media-alert"
import { defaultColumns as columns } from "./media-columns"
import MediaEditDialog from "./media-edit-dialog"

const searchParams = {
  searchQuery: parseAsString.withDefault(""),
  pageIndex: parseAsInteger.withDefault(0), // 0-indexed, table-internal
  pageSize: parseAsInteger.withDefault(10),
}

export function MediaTable({
  setMediaAssetsCount,
}: Readonly<{
  setMediaAssetsCount: React.Dispatch<React.SetStateAction<number>>
}>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    documentId: false,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const [{ pageIndex, pageSize }, setSearch] = useQueryStates(searchParams)

  const {
    data: mediaData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["medias", pageIndex, pageSize, sorting],
    queryFn: async () => {
      const response = await strapiRequest.get(
        // Strapi's pagination[page] is 1-indexed — convert here, keep table 0-indexed internally
        `/api/upload/files/page?pagination[page]=${pageIndex + 1}&pagination[pageSize]=${pageSize}`
      )
      setMediaAssetsCount(response.data.meta.pagination.total ?? 0)
      return response.data as MediaApiResponse
    },
    placeholderData: (previousData) => previousData,
  })

  const rows = mediaData?.data ?? defaultMediaData
  const pageCount = mediaData?.meta?.pagination?.pageCount ?? -1

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      rowSelection,
      columnVisibility,
    },
    manualPagination: true, // server owns pagination — don't re-slice client-side
    pageCount, // real total from Strapi meta, drives getPageCount()/getCanNextPage()
    enableRowSelection: true,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater
      setSearch({
        pageIndex: newPagination.pageIndex,
        pageSize: newPagination.pageSize,
      })
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    // NOTE: getPaginationRowModel intentionally removed — client-side
    // pagination on already-server-paginated data was the main bug.
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div
      className={cn(
        'max-sm:has-[div[role="toolbar"]]:mb-16',
        "flex flex-1 flex-col gap-4"
      )}
    >
      <DataTableToolbar
        table={table}
        searchPlaceholder="Filter images..."
        searchKey="name"
      />

      {isLoading ? (
        <DataTableSkeleton />
      ) : (
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="group/row">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
                        header.column.columnDef.meta?.className,
                        header.column.columnDef.meta?.thClassName
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody
              className={cn(isFetching && "opacity-60 transition-opacity")}
            >
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group/row"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "bg-background group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
                          cell.column.columnDef.meta?.className,
                          cell.column.columnDef.meta?.tdClassName
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <DataTablePagination table={table} className="mt-auto" />
      <MediaEditDialog />
      <DeleteMediaAlert />
    </div>
  )
}
