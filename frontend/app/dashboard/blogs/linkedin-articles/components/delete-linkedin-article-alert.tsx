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
import { strapiRequest } from "@/lib/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Newspaper } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { useLinkedInArticles } from "./linkedin-articles-provider"

const DeleteLinkedinArticleAlert = () => {
  const { currentRow, open, setOpen } = useLinkedInArticles()
  const queryClient = useQueryClient()
  const handleDelete = useMutation({
    mutationKey: ["delete-linkedin-article", currentRow?.id],
    mutationFn: async () => {
      const response = await strapiRequest.delete(
        `/api/linkedin-posts/${currentRow?.id}`
      )
      return response.data
    },
    onSuccess: () => {
      toast.success("Linkedin article has been deleted successfully.")
      setOpen(null)
      queryClient.invalidateQueries({ queryKey: ["linkedin-posts"] })
    },
    onError: (error) => {
      console.error("Error deleting linkedin article:", error)
      toast.error("Error deleting linkedin article.")
      setOpen(null)
    },
  })

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
            disabled={handleDelete.isPending}
            onClick={() => {
              handleDelete.mutate()
            }}
          >
            Delete
            {handleDelete.isPending && (
              <span className="ml-2 inline-block animate-spin">⏳</span>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteLinkedinArticleAlert
