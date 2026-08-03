import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { LongText } from "@/components/long-text"
import { MediaFile } from "@/types/types"
import { createColumnHelper } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { handleCopyToClipboard } from "@/lib/utils"
import { Copy } from "lucide-react"
import { DataTableRowActions } from "./media-data-table-row-actions"

const columnHelper = createColumnHelper<MediaFile>()

//Make some columns!

export const defaultColumns = [
  //Display column
  columnHelper.display({
    id: "preview",
    header: () => <span>Preview</span>,
    cell: ({ row }) => {
      const { url } = row.original

      return (
        <div className="flex h-12 w-12 items-center gap-2">
          <SingleImagePreview
            imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`}
          />
        </div>
      )
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: (props) => (
      <LongText className="max-w-36">{props.getValue()}</LongText>
    ),
  }),
  columnHelper.accessor("documentId", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document ID" />
    ),
    cell: (props) => (
      <LongText className="max-w-36">{props.getValue()}</LongText>
    ),
    enableSorting: false,
  }),

  columnHelper.accessor("ext", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extension" />
    ),
    cell: (props) => (
      <p>{props.getValue().replaceAll(".", "").toUpperCase()}</p>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("size", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size (KB)" />
    ),
    cell: (props) => <p>{props.getValue().toFixed()}</p>,
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
  columnHelper.accessor("createdAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: true,
  }),
  columnHelper.accessor("updatedAt", {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: (props) => <p>{new Date(props.getValue()).toLocaleDateString()}</p>,
    enableSorting: false,
  }),
  //Actions column
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: (props) => <DataTableRowActions row={props.row} />,
  }),
]
