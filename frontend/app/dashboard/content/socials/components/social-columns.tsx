import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { LongText } from "@/components/long-text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStrapiMediaUrl } from "@/lib/media"
import { handleCopyToClipboard } from "@/lib/utils"
import { CalendarEventStatus, SocialPost } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"
import { Copy } from "lucide-react"
import { DataTableRowActions } from "./social-data-table-row-actions"

const columnHelper = createColumnHelper<SocialPost>()

export const BadgeColors = ({ status }: { status: CalendarEventStatus }) => {
  switch (status) {
    case "draft":
      return {
        css: "bg-gray-200 text-gray-700 hover:bg-gray-300",
        icon: "📝",
      }

    case "generating":
      return {
        css: "bg-purple-200 text-purple-700 hover:bg-purple-300",
        icon: "🔄",
      }
    case "ready":
      return {
        css: "bg-blue-200 text-blue-700 hover:bg-blue-300",
        icon: "✅",
      }
    case "review":
      return {
        css: "bg-yellow-200 text-yellow-700 hover:bg-yellow-300",
        icon: "👀",
      }
    case "approved":
      return {
        css: "bg-emerald-200 text-emerald-700 hover:bg-emerald-300",
        icon: "👍",
      }
    case "scheduled":
      return {
        css: "bg-indigo-200 text-indigo-700 hover:bg-indigo-300",
        icon: "📅",
      }
    case "publishing":
      return {
        css: "bg-orange-200 text-orange-700 hover:bg-orange-300 animate-pulse",
        icon: "📤",
      }
    case "published":
      return {
        css: "bg-green-200 text-green-700 hover:bg-green-300",
        icon: "📢",
      }
    case "failed":
      return {
        css: "bg-red-200 text-red-700 hover:bg-red-300",
        icon: "❌",
      }
    case "rejected":
      return {
        css: "bg-rose-200 text-rose-700 hover:bg-rose-300",
        icon: "🚫",
      }
    default:
      return {
        css: "bg-gray-100 text-gray-500 hover:bg-gray-200",
        icon: "",
      }
  }
}

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
  columnHelper.accessor("media_type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media Type" />
    ),
    cell: ({ row }) => (
      <p className="capitalize">{row.original.media_type ?? "-"}</p>
    ),
  }),

  columnHelper.accessor("media_files", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media Files" />
    ),
    cell: ({ row }) => {
      const mediaFiles = row.original.media_files
      const mediaType = row.original.media_type
      // Check if there are no media files
      if (!mediaFiles || mediaFiles.length === 0) {
        return <p className="text-sm text-gray-500">No media files</p>
      }

      // Render based on media type
      const renderMediaPreview = () => {
        switch (mediaType) {
          case "image":
            return (
              <div key={row.original.id} className="flex flex-wrap gap-2">
                {mediaFiles.slice(0, 4).map((file) => (
                  <div
                    key={file.name}
                    className="flex h-12 w-12 items-center gap-2"
                  >
                    <SingleImagePreview
                      imageUrl={getStrapiMediaUrl(file.url)}
                      // imageUrl="https://picsum.photos/1000/800?random=1"
                    />
                  </div>
                ))}
              </div>
            )

          case "document":
            return (
              <div className="flex flex-wrap gap-2">
                {mediaFiles.slice(0, 3).map((file) => {
                  // Get file extension
                  const extension =
                    file.name.split(".").pop()?.toUpperCase() || "FILE"
                  return (
                    <div
                      key={file.id}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-xs font-medium text-blue-600"
                    >
                      {extension.slice(0, 3)}
                    </div>
                  )
                })}
                {mediaFiles.length > 3 && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-600">
                    +{mediaFiles.length - 3}
                  </div>
                )}
              </div>
            )

          default:
            // Fallback for unknown media types
            return (
              <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                <p>No media files</p>
              </div>
            )
        }
      }

      return renderMediaPreview()
    },
    enableSorting: false,
    enableColumnFilter: false,
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
