"use client"
import { features } from "@/app/dashboard/blogs/blogs-articles/components/table-feature"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RowData, type Table } from "@tanstack/react-table"
import { SlidersVertical } from "lucide-react"

type DataTableViewOptionsProps<TFeatures, TData extends RowData> = {
  table: Table<typeof features, TData>
}

export function DataTableViewOptions<TData extends RowData>({
  table,
}: Readonly<DataTableViewOptionsProps<typeof features, TData>>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="ms-auto hidden h-8 lg:flex"
          >
            <SlidersVertical className="size-4" />
            View
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-37.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) => column.accessorFn !== undefined && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
