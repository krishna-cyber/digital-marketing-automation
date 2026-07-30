import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Newspaper } from "lucide-react"
import React from "react"
import { useBlogsAndArticles } from "./blogs-articles-provider"

const DeleteBlogArticleAlert = () => {
  const { currentRow, open, setOpen } = useBlogsAndArticles()
  return (
    <AlertDialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Newspaper />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Blog or Article</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this blog/article? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              console.log("Delete clicked for row:", currentRow)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBlogArticleAlert
