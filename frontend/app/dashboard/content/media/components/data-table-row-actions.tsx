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
import { MediaFile } from "@/types/types"
import { type Row } from "@tanstack/react-table"
import {
  EllipsisVertical,
  ImageDown,
  Link,
  Trash2,
  UserPen,
} from "lucide-react"
import { toast } from "sonner"
import { useMedia } from "./media-provider"

type DataTableRowActionsProps = {
  row: Row<MediaFile>
}

export const handleCopyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  } catch (error) {
    console.error("Failed to copy:", error)
    toast.error("Failed to copy to clipboard")
  }
}

export function DataTableRowActions({
  row,
}: Readonly<DataTableRowActionsProps>) {
  const { setOpen, setCurrentRow } = useMedia()
  const handleDownload = async () => {
    try {
      const fileUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${row.original.url}`
      const fileName = row.original.name || "download"

      // Fetch the file
      const response = await fetch(fileUrl)
      const blob = await response.blob()

      // Create download link
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Clean up
      URL.revokeObjectURL(link.href)
      toast.success("Download media has been started!")
    } catch (error) {
      console.error("Failed to download media:", error)
      toast.error("Failed to download media!")
    }
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
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
        <DropdownMenuItem onClick={handleDownload}>
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
