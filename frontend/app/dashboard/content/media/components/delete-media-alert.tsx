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
import { ImageOff } from "lucide-react"
import { toast } from "sonner"
import { useMedia } from "./media-provider"

const DeleteMediaAlert = () => {
  const { currentRow, open, setOpen } = useMedia()
  const queryClient = useQueryClient()
  const handleDelete = useMutation({
    mutationKey: ["deleteMedia", currentRow?.id],
    mutationFn: async () => {
      const response = await strapiRequest.delete(
        `/api/upload/files/${currentRow?.id}`
      )
      console.log("delete response", response)
      return response.data
    },
    onSuccess: () => {
      toast.success("Media asset deleted successfully.")
      setOpen(null)
      queryClient.invalidateQueries({ queryKey: ["medias"] })
    },
    onError: (error) => {
      console.error("Error deleting media asset:", error)
      toast.error("Error deleting media asset.")
      setOpen(null)
    },
  })
  return (
    <AlertDialog open={open === "delete"} onOpenChange={() => setOpen(null)}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <ImageOff />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Asset</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this asset? This action cannot be
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
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteMediaAlert
