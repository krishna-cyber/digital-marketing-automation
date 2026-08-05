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
import { CalendarEventStatus, ThoughtLeadershipPost } from "@/types/types"
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

const leadershipEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().optional(),
  event_id: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  post_status: z.string().optional(),
  visibility: z.string().optional(),
  post_type: z.string().optional(),
  linkedin_post_id: z.string().optional(),
  linkedin_post_url: z.string().optional(),
})

type LeadershipEditFormValues = z.infer<typeof leadershipEditSchema>

const LeadershipEditForm = ({
  leadershipContent,
}: {
  leadershipContent: ThoughtLeadershipPost
}) => {
  console.log("Leadership Content:", leadershipContent) // Debugging line to check the content of leadershipContent
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateLeadershipMutation = useMutation({
    mutationKey: ["update-thought-leadership", leadershipContent.documentId],
    mutationFn: async (data: ThoughtLeadershipPost) => {
      const response = await strapiRequest.put(
        `/api/thought-leaderships/${leadershipContent.documentId}`,
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
            linkedin_post_id: data.linkedin_post_id,
            linkedin_post_url: data.linkedin_post_url,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["thought-leaderships"] })
      toast.success("Post updated successfully.")
      router.push("/dashboard/content")
    },
    onError: () => {
      toast.error("Failed to update post.")
    },
  })

  const form = useForm<LeadershipEditFormValues>({
    resolver: zodResolver(leadershipEditSchema),
    defaultValues: {
      title: leadershipContent.title || "",
      content: leadershipContent.content || "",
      event_id: leadershipContent.event_id || "",
      start_date: leadershipContent.start_date || "",
      end_date: leadershipContent.end_date || "",
      post_status: leadershipContent.post_status || "",
      visibility: leadershipContent.visibility || "",
      post_type: leadershipContent.post_type || "",
      linkedin_post_id: leadershipContent.linkedin_post_id ?? "",
      linkedin_post_url: leadershipContent.linkedin_post_url ?? "",
    },
  })

  const handleSubmit = (data: LeadershipEditFormValues) => {
    const submittedData: ThoughtLeadershipPost = {
      ...leadershipContent,
      title: data.title,
      content: data.content || null,
      event_id: data.event_id || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      post_status: (data.post_status || "ready") as CalendarEventStatus,
      visibility: data.visibility || null,
      post_type: data.post_type || null,
      linkedin_post_id: data.linkedin_post_id || null,
      linkedin_post_url: data.linkedin_post_url || null,
    }
    updateLeadershipMutation.mutate({ ...submittedData })
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
    <form id="leadership-edit-form" onSubmit={form.handleSubmit(handleSubmit)}>
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
          <Button type="submit" form="leadership-edit-form" variant="outline">
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
                <FieldLabel htmlFor="leadership-edit-form-title">
                  Title<span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-title"
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
                <FieldLabel htmlFor="leadership-edit-form-event-id">
                  Event ID
                </FieldLabel>
                <Input
                  disabled
                  {...field}
                  id="leadership-edit-form-event-id"
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
                <FieldLabel htmlFor="leadership-edit-form-post-status">
                  Post Status
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-post-status"
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
                <FieldLabel htmlFor="leadership-edit-form-visibility">
                  Visibility
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-visibility"
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
                <FieldLabel htmlFor="leadership-edit-form-start-date">
                  Start Date
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-start-date"
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
                <FieldLabel htmlFor="leadership-edit-form-end-date">
                  End Date
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-end-date"
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
                <FieldLabel htmlFor="leadership-edit-form-post-type">
                  Post Type
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-post-type"
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
            name="linkedin_post_id"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="leadership-edit-form-linkedin-post-id">
                  LinkedIn Post ID
                </FieldLabel>
                <Input
                  {...field}
                  disabled
                  id="leadership-edit-form-linkedin-post-id"
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
                <FieldLabel htmlFor="leadership-edit-form-linkedin-post-url">
                  LinkedIn Post URL
                </FieldLabel>
                <Input
                  {...field}
                  id="leadership-edit-form-linkedin-post-url"
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
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="leadership-edit-form-content">
                  Content
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    value={field.value ?? ""}
                    id="leadership-edit-form-content"
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
              content={watchedContent || leadershipContent.content || ""}
              user={previewUser}
              date={new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              metrics={previewMetrics}
              url={watchedPostUrl || "#"}
            />
          </div>
        </aside>
      </div>
    </form>
  )
}

export default LeadershipEditForm
