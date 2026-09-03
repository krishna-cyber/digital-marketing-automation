import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { handleCopyToClipboard, handleDownload } from "@/lib/utils"
import { MediaFile } from "@/types/types"
import { type Row } from "@tanstack/react-table"
import {
  EllipsisVertical,
  ImageDown,
  Link,
  Trash2,
  UserPen,
} from "lucide-react"

import { features } from "@/app/dashboard/blogs/blogs-articles/components/table-feature"
import { useMedia } from "./media-provider"

type DataTableRowActionsProps = {
  row: Row<typeof features, MediaFile>
}

export function DataTableRowActions({
  row,
}: Readonly<DataTableRowActionsProps>) {
  const { setOpen, setCurrentRow } = useMedia()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen("edit")
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <UserPen size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleDownload({
              fileUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}${row.original.url}`,
              filename: row.original.name || "download",
            })
          }}
        >
          Download
          <DropdownMenuShortcut>
            <ImageDown size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem
          onClick={() =>
            handleCopyToClipboard(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}${row.original.url}`
            )
          }
        >
          Copy Link
          <DropdownMenuShortcut>
            <Link size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            setOpen("delete")
          }}
          className="text-red-500!"
        >
          Delete
          <DropdownMenuShortcut>
            <Trash2 size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
