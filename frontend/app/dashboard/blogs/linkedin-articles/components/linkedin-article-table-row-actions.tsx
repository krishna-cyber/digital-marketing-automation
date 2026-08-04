import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LinkedInArticle } from "@/types/types"
import { Row } from "@tanstack/react-table"
import {
  Check,
  EllipsisVertical,
  ImageDown,
  Trash2,
  UserPen,
} from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useLinkedInArticles } from "./linkedin-articles-provider"

type DataTableRowActionsProps = {
  row: Row<LinkedInArticle>
}

const LinkedinArticleTableRowActions = ({ row }: DataTableRowActionsProps) => {
  const router = useRouter()
  const { setOpen, setCurrentRow } = useLinkedInArticles()
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
            router.push(
              `/dashboard/blogs/edit?contentType=linkedin-posts&documentId=${row.original.documentId}`
            )
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <UserPen size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log("Copy Link clicked for row:", row.original)
          }}
        >
          Download
          <DropdownMenuShortcut>
            <ImageDown size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            console.log("Copy Link clicked for row:", row.original)
          }
        >
          Approve Article
          <DropdownMenuShortcut>
            <Check size={16} />
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

export default LinkedinArticleTableRowActions
