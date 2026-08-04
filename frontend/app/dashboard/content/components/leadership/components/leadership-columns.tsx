import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { LongText } from "@/components/long-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { handleCopyToClipboard } from "@/lib/utils"
import { ThoughtLeadershipPost } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"
import { Copy } from "lucide-react"
import { BadgeColors } from "../../socials/components/social-columns"
import { DataTableRowActions } from "./leadership-row-actions"

const columnHelper = createColumnHelper<ThoughtLeadershipPost>()

export const defaultColumns = [
  columnHelper.display({
    id: "id",
    header: () => <span>Id</span>,
    cell: ({ row }) => {
      return (
        <div className="flex h-12 w-12 items-center gap-2">
          <p>{row.original.id}</p>
        </div>
      )
    },
  }),
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (props) => (
      <LongText className="max-w-36">{props.getValue()}</LongText>
    ),
  }),
  columnHelper.accessor("post_status", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: (props) => {
      const status = props.getValue()
      const { css, icon } = BadgeColors({ status })
      return (
        <Badge className={css}>
          {icon} {status}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  }),
  columnHelper.accessor("post_type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Post Type" />
    ),
    cell: ({ row }) => (
      <p className="capitalize">{row.original.post_type ?? "-"}</p>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("visibility", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visibility" />
    ),
    cell: ({ row }) => (
      <p className="capitalize">{row.original.visibility ?? "-"}</p>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("documentId", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document ID" />
    ),
    cell: ({ row }) => (
      <Button
        variant="ghost"
        onClick={() => handleCopyToClipboard(row.original.documentId ?? "")}
      >
        {row.original.documentId ?? "-"}
        <Copy aria-hidden="true" />
      </Button>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("start_date", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Publish Date" />
    ),
    cell: (props) => {
      const value = props.getValue()
      return value ? <p>{new Date(value).toLocaleDateString()}</p> : <p>-</p>
    },
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: (props) => <DataTableRowActions row={props.row} />,
  }),
]
