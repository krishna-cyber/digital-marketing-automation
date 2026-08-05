"use client"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import LinkedInPostCard, {
  LinkedInPostMetrics,
  LinkedInPostUser,
} from "@/components/ui/linkedin-post-card"
import { strapiRequest } from "@/lib/api"
import { CalendarEventStatus, SocialPost } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  CircleX,
  EllipsisVerticalIcon,
  FileCheckCorner,
  SaveCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const socialEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  event_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  post_status: z.string().optional(),
  visibility: z.string().optional(),
  post_type: z.string().optional(),
  hashtags: z.string().optional(),
  media_type: z.string().optional(),
  image_alt_text: z.string().optional(),
  image_prompt: z.string().optional(),
  linkedin_post_id: z.string().optional(),
  linkedin_post_url: z.string().optional(),
  facebook_post_id: z.string().optional(),
  facebook_post_url: z.string().optional(),
  instagram_post_id: z.string().optional(),
  instagram_post_url: z.string().optional(),
})

export type SocialEditFormValues = z.infer<typeof socialEditSchema>

const SocialEditForm = ({ socialContent }: { socialContent: SocialPost }) => {
  console.log("Social Content:", socialContent) // Debugging line to check the content of socialContent
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateSocialMutation = useMutation({
    mutationKey: ["update-social", socialContent.documentId],
    mutationFn: async (data: SocialPost) => {
      const response = await strapiRequest.put(
        `/api/socials/${socialContent.documentId}`,
        {
          data: {
            title: data.title,
            content: data.content,
            event_id: data.event_id,
            start_date: data.start_date,
            end_date: data.end_date,
            post_status: data.post_status,
            visibility: data.visibility,
            post_type: data.post_type,
            hashtags: data.hashtags,
            media_type: data.media_type,
            image_alt_text: data.image_alt_text,
            image_prompt: data.image_prompt,
            linkedin_post_id: data.linkedin_post_id,
            linkedin_post_url: data.linkedin_post_url,
            facebook_post_id: data.facebook_post_id,
            facebook_post_url: data.facebook_post_url,
            instagram_post_id: data.instagram_post_id,
            instagram_post_url: data.instagram_post_url,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] })
      toast.success("Post updated successfully.")
      router.push("/dashboard/content")
    },
    onError: () => {
      toast.error("Failed to update post.")
    },
  })

  const form = useForm<SocialEditFormValues>({
    resolver: zodResolver(socialEditSchema),
    defaultValues: {
      title: socialContent.title || "",
      content: socialContent.content || "",
      event_id: socialContent.event_id || "",
      start_date: socialContent.start_date || "",
      end_date: socialContent.end_date || "",
      post_status: socialContent.post_status || "",
      visibility: socialContent.visibility || "",
      post_type: socialContent.post_type || "",
      hashtags: socialContent.hashtags || "",
      media_type: socialContent.media_type || "",
      image_alt_text: socialContent.image_alt_text || "",
      image_prompt: socialContent.image_prompt || "",
      linkedin_post_id: socialContent.linkedin_post_id ?? "",
      linkedin_post_url: socialContent.linkedin_post_url ?? "",
      facebook_post_id: socialContent.facebook_post_id ?? "",
      facebook_post_url: socialContent.facebook_post_url ?? "",
      instagram_post_id: socialContent.instagram_post_id ?? "",
      instagram_post_url: socialContent.instagram_post_url ?? "",
    },
  })

  const handleSubmit = (data: SocialEditFormValues) => {
    const submittedData: SocialPost = {
      ...socialContent,
      title: data.title || null,
      content: data.content || null,
      event_id: data.event_id || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      post_status: (data.post_status || "ready") as CalendarEventStatus,
      visibility: data.visibility || null,
      post_type: data.post_type || null,
      hashtags: data.hashtags || null,
      media_type: (data.media_type || null) as SocialPost["media_type"],
      image_alt_text: data.image_alt_text || null,
      image_prompt: data.image_prompt || null,
      linkedin_post_id: data.linkedin_post_id || null,
      linkedin_post_url: data.linkedin_post_url || null,
      facebook_post_id: data.facebook_post_id || null,
      facebook_post_url: data.facebook_post_url || null,
      instagram_post_id: data.instagram_post_id || null,
      instagram_post_url: data.instagram_post_url || null,
    }
    updateSocialMutation.mutate(submittedData)
  }

  const watchedContent = form.watch("content")
  const watchedPostUrl = form.watch("linkedin_post_url")

  const previewUser: LinkedInPostUser = {
    name: "Palm Mind AI",
    handle: "@alexmdev",
    avatar: "/logo.jpeg",
    verified: true,
  }

  const previewMetrics: LinkedInPostMetrics = {
    likes: 875,
    comments: 143,
    shares: 346,
  }

  return (
    <form id="social-edit-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="mr-2"
          onClick={() => {
            form.reset()
            router.push("/dashboard/content")
          }}
          variant={"secondary"}
        >
          Cancel
        </Button>
        <ButtonGroup>
          <Button type="submit" form="social-edit-form" variant="outline">
            <SaveCheck aria-hidden="true" />
            <span>save changes</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="More options"
                  type="button"
                >
                  <EllipsisVerticalIcon aria-hidden="true" />
                </Button>
              }
            />

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={async (e) => {
                    e.preventDefault()
                  }}
                >
                  <FileCheckCorner aria-hidden="true" />
                  Marked as approved
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={async (e) => {
                    e.preventDefault()
                    console.log("Mark as rejected clicked")
                  }}
                >
                  <CircleX aria-hidden="true" />
                  Mark as Rejected
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-title">
                  Title<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Title of the post..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="event_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-event-id">
                  Event ID
                </FieldLabel>
                <Input
                  disabled
                  {...field}
                  id="social-edit-form-event-id"
                  aria-invalid={fieldState.invalid}
                  placeholder="Event identifier..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="post_status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-post-status">
                  Post Status
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-post-status"
                  aria-invalid={fieldState.invalid}
                  placeholder="draft, ready, published, etc..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="visibility"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-visibility">
                  Visibility
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-visibility"
                  aria-invalid={fieldState.invalid}
                  placeholder="public..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="start_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-start-date">
                  Start Date
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-start-date"
                  aria-invalid={fieldState.invalid}
                  placeholder="2026-08-06T19:00:00.000Z"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="end_date"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-end-date">
                  End Date
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-end-date"
                  aria-invalid={fieldState.invalid}
                  placeholder="2026-08-06T20:00:00.000Z"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="post_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-post-type">
                  Post Type
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-post-type"
                  aria-invalid={fieldState.invalid}
                  placeholder="organic..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="hashtags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-hashtags">
                  Hashtags
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-hashtags"
                  aria-invalid={fieldState.invalid}
                  placeholder="#marketing, #automation..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="media_type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-media-type">
                  Media Type
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-media-type"
                  aria-invalid={fieldState.invalid}
                  placeholder="text, image, or document..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="image_alt_text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-image-alt-text">
                  Image Alt Text
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-image-alt-text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Describe the image for accessibility..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="image_prompt"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-image-prompt">
                  Image Prompt
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-image-prompt"
                  aria-invalid={fieldState.invalid}
                  placeholder="AI prompt for image generation..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="linkedin_post_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-linkedin-post-id">
                  LinkedIn Post ID
                </FieldLabel>
                <Input
                  {...field}
                  disabled
                  id="social-edit-form-linkedin-post-id"
                  aria-invalid={fieldState.invalid}
                  placeholder="urn:li:share:..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="linkedin_post_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-linkedin-post-url">
                  LinkedIn Post URL
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-linkedin-post-url"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://www.linkedin.com/..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="facebook_post_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-facebook-post-id">
                  Facebook Post ID
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-facebook-post-id"
                  aria-invalid={fieldState.invalid}
                  placeholder="Facebook post identifier..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="facebook_post_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-facebook-post-url">
                  Facebook Post URL
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-facebook-post-url"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://www.facebook.com/..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="instagram_post_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-instagram-post-id">
                  Instagram Post ID
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-instagram-post-id"
                  aria-invalid={fieldState.invalid}
                  placeholder="Instagram post identifier..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="instagram_post_url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-instagram-post-url">
                  Instagram Post URL
                </FieldLabel>
                <Input
                  {...field}
                  id="social-edit-form-instagram-post-url"
                  aria-invalid={fieldState.invalid}
                  placeholder="https://www.instagram.com/..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="social-edit-form-content">
                  Content
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    value={field.value ?? ""}
                    id="social-edit-form-content"
                    placeholder="Body of the post..."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-6">
            <LinkedInPostCard
              content={watchedContent || socialContent.content || ""}
              user={previewUser}
              date={new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              image={
                socialContent.media_type === "image"
                  ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${socialContent.media_files?.[0]?.url || ""}`
                  : undefined
              }
              metrics={previewMetrics}
              url={watchedPostUrl || "#"}
            />
          </div>
        </aside>
      </div>
    </form>
  )
}

export default SocialEditForm
