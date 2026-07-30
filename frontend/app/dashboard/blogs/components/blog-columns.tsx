import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { LongText } from "@/components/long-text"
import { Badge } from "@/components/ui/badge"
import { BlogsAndArticles } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"
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
    id: "cover",
    header: () => <span>Cover</span>,
    cell: ({ row }) => {
      const cover = row.original.cover
      return (
        <div className="flex h-12 w-12 items-center gap-2">
          {cover?.url ? (
            <SingleImagePreview
              imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${cover.url}`}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
              N/A
            </div>
          )}
        </div>
      )
    },
    enableSorting: false,
  }),

  columnHelper.accessor("slug", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: (props) => (
      <LongText className="max-w-36 text-muted-foreground">
        {props.getValue() ?? "-"}
      </LongText>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: (props) => (
      <LongText className="max-w-64">{props.getValue() ?? "-"}</LongText>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.author?.name ?? "-", {
    id: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  }),
  columnHelper.accessor((row) => row.category?.name ?? "-", {
    id: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: (props) => (
      <Badge variant="outline" className="capitalize">
        {props.getValue()}
      </Badge>
    ),
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
