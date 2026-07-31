"use client"
import { SingleImagePreview } from "@/components/examples/image-preview"
import {
  SimpleEditor,
  type SimpleEditorHandle,
} from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { strapiRequest } from "@/lib/api"
import { BlogsAndArticles } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const articleEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  content: z.string().optional(),
  media_type: z.string().optional(),
  visibility: z.string().optional(),
  post_type: z.string().optional(),
  post_status: z.string().optional(),
  start_date: z.string().optional(),
  cover: z.string().optional(),
  end_date: z.string().optional(),
  linkedin_post_id: z.string().optional(),
  linkedin_post_url: z.string().optional(),
  image_alt_text: z.string().optional(),
})

export type ArticleEditFormValues = z.infer<typeof articleEditSchema>

const ArticleEditForm = ({ document }: { document: BlogsAndArticles }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const updateArticleMutation = useMutation({
    mutationKey: ["update-article", document.documentId],
    mutationFn: async ({ document }: { document: BlogsAndArticles }) => {
      const response = await strapiRequest.put(
        `/api/linkedin-posts/${document.documentId}`,
        {
          data: {
            title: document.title,
            content: document.content,
            media_type: document.media_type,
            visibility: document.visibility,
            post_type: document.post_type,
            post_status: document.post_status,
            start_date: document.start_date,
            end_date: document.end_date,
            linkedin_post_id: document.linkedin_post_id,
            linkedin_post_url: document.linkedin_post_url,
            image_alt_text: document.image_alt_text,
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs-and-articles"] })
      toast.success("Article updated successfully.")
      router.push("/dashboard/blogs")
    },
  })
  const editorRef = useRef<SimpleEditorHandle>(null)
  const form = useForm<z.infer<typeof articleEditSchema>>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: {
      title: document.title || "",
      content: document.content || "",
      media_type: document.media_type || "",
      cover: document.media_files?.[0]?.url || "",
      visibility: document.visibility || "",
      post_type: document.post_type || "",
      post_status: document.post_status || "",
      start_date: document.start_date || "",
      end_date: document.end_date || "",
      linkedin_post_id: document.linkedin_post_id || "",
      linkedin_post_url: document.linkedin_post_url || "",
      image_alt_text: document.image_alt_text || "",
    },
  })

  const handleSubmit = (data: ArticleEditFormValues) => {
    const submittedData: BlogsAndArticles = {
      ...document,
      title: data.title,
      content: editorRef.current?.getMarkdown() ?? data.content ?? null,
      media_type: (data.media_type ??
        "image") as BlogsAndArticles["media_type"],
      visibility: data.visibility ?? null,
      post_type: data.post_type ?? null,
      post_status: (data.post_status ??
        "ready") as BlogsAndArticles["post_status"],
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null,
      linkedin_post_id: data.linkedin_post_id ?? null,
      linkedin_post_url: data.linkedin_post_url ?? null,
      image_alt_text: data.image_alt_text ?? null,
    }
    updateArticleMutation.mutate({ document: submittedData })
  }

  console.log("Document received in ArticleEditForm:", document)
  return (
    <form id="article-edit-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="mb-4 flex items-center justify-end">
        <Button variant={"secondary"}>Cancel</Button>
        <Button size={"sm"} type="submit" form="article-edit-form">
          Save Changes
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-title">
                Title<span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-title"
                aria-invalid={fieldState.invalid}
                placeholder="Title of the article..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="media_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-media-type">
                Media Type
              </FieldLabel>
              <Input
                disabled
                {...field}
                id="article-edit-form-media-type"
                aria-invalid={fieldState.invalid}
                placeholder="text, image, or document..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="post_status"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-post-status">
                Post Status
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-post-status"
                aria-invalid={fieldState.invalid}
                placeholder="ready, published, etc..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="post_type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-post-type">
                Post Type
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-post-type"
                aria-invalid={fieldState.invalid}
                placeholder="organic..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="visibility"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-visibility">
                Visibility
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-visibility"
                aria-invalid={fieldState.invalid}
                placeholder="public..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Cover Image */}
        {form.getValues("media_type") === "image" && (
          <Controller
            name="cover"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="article-edit-form-cover">Cover</FieldLabel>

                <div className="w-full max-w-xs overflow-auto rounded-lg">
                  <SingleImagePreview imageUrl="https://picsum.photos/1000/800?random=1" />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
        <Controller
          name="linkedin_post_id"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-linkedin-post-id">
                LinkedIn Post ID
              </FieldLabel>
              <Input
                {...field}
                disabled
                id="article-edit-form-linkedin-post-id"
                aria-invalid={fieldState.invalid}
                placeholder="urn:li:share:..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="linkedin_post_url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-linkedin-post-url">
                LinkedIn Post URL
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-linkedin-post-url"
                aria-invalid={fieldState.invalid}
                placeholder="https://www.linkedin.com/..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="start_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-start-date">
                Start Date
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-start-date"
                aria-invalid={fieldState.invalid}
                placeholder="2026-08-06T19:00:00.000Z"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="end_date"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-end-date">
                End Date
              </FieldLabel>
              <Input
                {...field}
                id="article-edit-form-end-date"
                aria-invalid={fieldState.invalid}
                placeholder="2026-08-06T20:00:00.000Z"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="image_alt_text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-image-alt-text">
                Image Alt Text
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="article-edit-form-image-alt-text"
                  placeholder="Describe the image for accessibility..."
                  rows={4}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ fieldState }) => (
            <Field className="col-span-2" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-content">
                Content <span className="text-red-500">*</span>
              </FieldLabel>
              <div className="flex w-full items-center justify-center">
                <SimpleEditor
                  ref={editorRef}
                  content={document.content ?? ""}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </form>
  )
}

export default ArticleEditForm
