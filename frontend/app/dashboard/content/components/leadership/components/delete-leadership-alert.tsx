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
import { FileX } from "lucide-react"
import { toast } from "sonner"
import { usePosts } from "./leadership-provider"

const DeletePostAlert = () => {
  const { currentRow, open, setOpen } = usePosts()
  const queryClient = useQueryClient()
  const handleDelete = useMutation({
    mutationKey: ["deletePost", currentRow?.id],
    mutationFn: async () => {
      const response = await strapiRequest.delete(
        `/api/upload/files/${currentRow?.id}`
      )
      return response.data
    },
    onSuccess: () => {
      toast.success("Post deleted successfully.")
      setOpen(null)
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      console.error("Error deleting post:", error)
      toast.error("Error deleting post.")
      setOpen(null)
    },
  })
  return (
    <AlertDialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <FileX />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
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

export default DeletePostAlert
