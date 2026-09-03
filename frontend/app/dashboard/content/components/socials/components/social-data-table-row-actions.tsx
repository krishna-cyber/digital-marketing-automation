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
import { SocialPost } from "@/types/types"
import { type Row } from "@tanstack/react-table"
import {
  ClipboardCheck,
  EllipsisVertical,
  ExternalLink,
  ImageDown,
  Link,
  Trash2,
  UserPen,
} from "lucide-react"

import { features } from "@/app/dashboard/blogs/blogs-articles/components/table-feature"
import { useRouter } from "next/navigation"
import { useSocials } from "./socials-provider"

type DataTableRowActionsProps = {
  row: Row<typeof features, SocialPost>
}

export function DataTableRowActions({
  row,
}: Readonly<DataTableRowActionsProps>) {
  const { setOpen, setCurrentRow } = useSocials()
  const router = useRouter()
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
          disabled={!row.original.linkedin_post_url}
          onClick={() =>
            window.open(row.original.linkedin_post_url ?? "#", "_blank")
          }
        >
          Visit post
          <DropdownMenuShortcut>
            <ExternalLink size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!row.original.linkedin_post_url}
          onClick={() =>
            handleCopyToClipboard(`${row.original.linkedin_post_url}`)
          }
        >
          Copy post URL
          <DropdownMenuShortcut>
            <Link size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!row.original.linkedin_post_id}
          onClick={() =>
            handleCopyToClipboard(`${row.original.linkedin_post_id}`)
          }
        >
          Copy post ID
          <DropdownMenuShortcut>
            <ClipboardCheck size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={row.original.media_type === "text"}
          onClick={() => {
            row.original.media_files?.forEach((file) => {
              handleDownload({
                fileUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}${file.url}`,
                filename: file.name || "download",
              })
            })
          }}
        >
          Download
          <DropdownMenuShortcut>
            <ImageDown size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original)
            router.push(
              `/dashboard/content/edit?contentType=socials&documentId=${row.original.documentId}`
            )
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <UserPen size={16} />
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
