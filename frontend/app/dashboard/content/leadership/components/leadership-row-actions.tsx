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
import { handleCopyToClipboard } from "@/lib/utils"
import { ThoughtLeadershipPost } from "@/types/types"
import { type Row } from "@tanstack/react-table"
import {
  ClipboardCheck,
  EllipsisVertical,
  ExternalLink,
  Link,
  Trash2,
  UserPen,
} from "lucide-react"

import { usePosts } from "./leadership-provider"

type DataTableRowActionsProps = {
  row: Row<ThoughtLeadershipPost>
}

export function DataTableRowActions({
  row,
}: Readonly<DataTableRowActionsProps>) {
  const { setOpen, setCurrentRow } = usePosts()

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
