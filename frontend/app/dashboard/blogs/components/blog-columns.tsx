import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { LongText } from "@/components/long-text"
import { Badge } from "@/components/ui/badge"
import { getStrapiMediaUrl } from "@/lib/media"
import { BlogsAndArticles } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import { BadgeColors } from "../../content/posts/components/post-columns"
import BlogTableRowActions from "./blog-table-row-actions"

const columnHelper = createColumnHelper<BlogsAndArticles>()

export const defaultColumns = [
  columnHelper.accessor("title", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: (props) => (
      <LongText className="max-w-48 font-medium">
        {props.getValue() ?? "-"}
      </LongText>
    ),
  }),
  columnHelper.display({
    id: "thumbnail",
    header: () => <span>Media</span>,
    cell: ({ row }) => {
      if (row.original.media_type === "image") {
        const mediaFile = row.original.media_files?.[0]

        return (
          <div className="flex h-12 w-12 items-center gap-2">
            <SingleImagePreview
              imageUrl={getStrapiMediaUrl(mediaFile?.url) || ""}
            />
          </div>
        )
      } else {
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
            N/A
          </div>
        )
      }
    },
    enableSorting: false,
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
    enableSorting: false,
  }),
  columnHelper.accessor("media_type", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Media Type" />
    ),
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.media_type ?? "-"}</p>
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
    cell: (props) => <p className="capitalize">{props.getValue() ?? "-"}</p>,
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
  columnHelper.accessor("linkedin_post_url", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LinkedIn" />
    ),
    cell: (props) => {
      const value = props.getValue()
      return value ? (
        <a href={value} target="_blank" rel="noreferrer">
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : (
        <p className="text-muted-foreground">-</p>
      )
    },
    enableSorting: false,
  }),
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: false,
  }),
  columnHelper.accessor("publishedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: (props) => {
      const value = props.getValue()
      return value ? (
        <p>{new Date(value).toLocaleDateString()}</p>
      ) : (
        <p className="text-muted-foreground">-</p>
      )
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: (props) => <BlogTableRowActions row={props.row} />,
  }),
]
