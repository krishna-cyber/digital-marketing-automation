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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSocials } from "./socials-provider"

const formSchema = z.object({
  title: z.string().max(255).nullable().optional(),
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
  hashtags: z.string().nullable().optional(),
  image_alt_text: z.string().nullable().optional(),
  image_prompt: z.string().nullable().optional(),
  linkedin_post_id: z.string().nullable().optional(),
  linkedin_post_url: z.string().nullable().optional(),
  facebook_post_id: z.string().nullable().optional(),
  facebook_post_url: z.string().nullable().optional(),
  instagram_post_id: z.string().nullable().optional(),
  instagram_post_url: z.string().nullable().optional(),
})

export type SocialEditFormValues = z.infer<typeof formSchema>

const SocialsEditDialog = () => {
  const { currentRow, setOpen, open } = useSocials()

  const form = useForm<SocialEditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentRow?.title || "",
      content: currentRow?.content || "",
      event_id: currentRow?.event_id || "",
      start_date: currentRow?.start_date || "",
      end_date: currentRow?.end_date || "",
      post_status: currentRow?.post_status || "draft",
      visibility: currentRow?.visibility || "",
      post_type: currentRow?.post_type || "",
      hashtags: currentRow?.hashtags || "",
      image_alt_text: currentRow?.image_alt_text || "",
      image_prompt: currentRow?.image_prompt || "",
      linkedin_post_id: currentRow?.linkedin_post_id || "",
      linkedin_post_url: currentRow?.linkedin_post_url || "",
      facebook_post_id: currentRow?.facebook_post_id || "",
      facebook_post_url: currentRow?.facebook_post_url || "",
      instagram_post_id: currentRow?.instagram_post_id || "",
      instagram_post_url: currentRow?.instagram_post_url || "",
    },
  })

  return (
    <Dialog open={open === "edit"} onOpenChange={() => setOpen(null)}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Social post.</DialogTitle>
          <DialogDescription>
            {currentRow ? (
              <p>
                You are editing the media file:{" "}
                <strong>{currentRow.title}</strong>
              </p>
            ) : (
              <p>No media file selected.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Finish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default SocialsEditDialog
