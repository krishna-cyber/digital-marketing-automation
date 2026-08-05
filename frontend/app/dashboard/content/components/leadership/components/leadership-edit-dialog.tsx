import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import LinkedInPostCard from "@/components/ui/linkedin-post-card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { usePosts } from "./leadership-provider"
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().nullable().optional(),
  event_id: z.string().nullable().optional(),
  start_date: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  post_status: z
    .enum([
      "draft",
      "generating",
      "ready",
      "review",
      "approved",
      "scheduled",
      "publishing",
      "published",
      "failed",
      "rejected",
    ])
    .default("draft"),
  visibility: z.string().nullable().optional(),
  post_type: z.string().nullable().optional(),
  linkedin_post_id: z.string().nullable().optional(),
  linkedin_post_url: z.string().nullable().optional(),
})

export type LeadershipEditFormValues = z.infer<typeof formSchema>

const PostsEditDialog = () => {
  const { currentRow, setOpen, open } = usePosts()

  const form = useForm<z.input<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentRow?.title,
      content: currentRow?.content || "",
      event_id: currentRow?.event_id || "",
      start_date: currentRow?.start_date || "",
      end_date: currentRow?.end_date || "",
      post_status: currentRow?.post_status ?? "draft",
      visibility: currentRow?.visibility || "",
      post_type: currentRow?.post_type || "",
      linkedin_post_id: currentRow?.linkedin_post_id || "",
      linkedin_post_url: currentRow?.linkedin_post_url || "",
    },
  })

  const onSubmit = (data: z.input<typeof formSchema>) => {
    console.log("Form submitted:", data)
    // Here you can handle the form submission, e.g., send data to an API or update state
  }

  return (
    <Dialog open={open === "edit"} onOpenChange={() => setOpen(null)}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Linkedin post.</DialogTitle>
          <DialogDescription>
            {currentRow ? (
              <p>
                You are editing the post: <strong>{currentRow.title}</strong>
              </p>
            ) : (
              <p>No post selected.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar grid max-h-[50vh] grid-cols-2 gap-4 overflow-y-auto px-4">
          <form
            className="flex flex-col gap-2"
            id="media-edit-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            FIRST PART
          </form>
          <div className="flex flex-col gap-2">
            <LinkedInPostCard />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Finish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PostsEditDialog
