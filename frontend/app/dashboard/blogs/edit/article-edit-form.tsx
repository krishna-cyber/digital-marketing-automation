"use client"
import { SingleImagePreview } from "@/components/examples/image-preview"
import {
  SimpleEditor,
  type SimpleEditorHandle,
} from "@/components/tiptap-templates/simple/simple-editor"
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

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group"
import { api, strapiRequest } from "@/lib/api"
import {
  BlogPost,
  CalendarEventStatus,
  LinkedInArticle,
  MediaType,
} from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  CircleX,
  EllipsisVerticalIcon,
  FileCheckCorner,
  SaveCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export type ArticleContentType = "linkedin-posts" | "blogs"

const articleEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  content: z.string().optional(),
  media_type: z.string().optional(),
  visibility: z.string().optional(),
  post_status: z.string().optional(),
  start_date: z.string().optional(),
  cover: z.string().optional(),
  end_date: z.string().optional(),
  image_alt_text: z.string().optional(),
  post_type: z.string().optional(),
  linkedin_post_id: z.string().optional(),
  linkedin_post_url: z.string().optional(),
  blog_post_id: z.string().optional(),
  blog_post_url: z.string().optional(),
  slug: z.string().optional(),
  seo_keywords: z.string().optional(),
  meta_description: z.string().optional(),
  open_graph_description: z.string().optional(),
  cta_profile: z.string().optional(),
  cta_top: z.string().optional(),
  cta_bottom: z.string().optional(),
  general_description: z.string().optional(),
})

export type ArticleEditFormValues = z.infer<typeof articleEditSchema>

const ArticleEditForm = ({
  contentType,
  document,
}: {
  contentType: ArticleContentType
  document: LinkedInArticle | BlogPost
}) => {
  const isBlog = contentType === "blogs"
  const blogDocument = document as BlogPost
  const linkedinDocument = document as LinkedInArticle

  console.log("Document received in ArticleEditForm:", document)
  const router = useRouter()
  const queryClient = useQueryClient()
  const updateArticleMutation = useMutation({
    mutationKey: [`update-${contentType}`, document.documentId],
    mutationFn: async ({
      document: doc,
    }: {
      document: LinkedInArticle | BlogPost
    }) => {
      const common = {
        title: doc.title,
        content: doc.content,
        media_type: doc.media_type,
        visibility: doc.visibility,
        post_status: doc.post_status,
        start_date: doc.start_date,
        end_date: doc.end_date,
        image_alt_text: doc.image_alt_text,
      }
      const blogDoc = doc as BlogPost
      const linkedinDoc = doc as LinkedInArticle
      const response = await strapiRequest.put(
        `/api/${contentType}/${doc.documentId}`,
        {
          data: isBlog
            ? {
                ...common,
                blog_post_id: blogDoc.blog_post_id,
                blog_post_url: blogDoc.blog_post_url,
                slug: blogDoc.slug,
                seo_keywords: blogDoc.seo_keywords,
                meta_description: blogDoc.meta_description,
                open_graph_description: blogDoc.open_graph_description,
                cta_profile: blogDoc.cta_profile,
                cta_top: blogDoc.cta_top,
                cta_bottom: blogDoc.cta_bottom,
                general_description: blogDoc.general_description,
              }
            : {
                ...common,
                post_type: linkedinDoc.post_type,
                linkedin_post_id: linkedinDoc.linkedin_post_id,
                linkedin_post_url: linkedinDoc.linkedin_post_url,
              },
        }
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [contentType] })
      toast.success("Article updated successfully.")
      router.push("/dashboard/blogs")
    },
  })
  const editorRef = useRef<SimpleEditorHandle>(null)
  const form = useForm<ArticleEditFormValues>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: {
      title: document.title || "",
      content: document.content || "",
      media_type: document.media_type || "",
      cover: document.media_files?.[0]?.url || "",
      visibility: document.visibility || "",
      post_status: document.post_status || "",
      start_date: document.start_date || "",
      end_date: document.end_date || "",
      image_alt_text: document.image_alt_text || "",
      ...(isBlog
        ? {
            blog_post_id: blogDocument.blog_post_id ?? "",
            blog_post_url: blogDocument.blog_post_url ?? "",
            slug: blogDocument.slug ?? "",
            seo_keywords: blogDocument.seo_keywords ?? "",
            meta_description: blogDocument.meta_description ?? "",
            open_graph_description: blogDocument.open_graph_description ?? "",
            cta_profile: blogDocument.cta_profile ?? "",
            cta_top: blogDocument.cta_top ?? "",
            cta_bottom: blogDocument.cta_bottom ?? "",
            general_description: blogDocument.general_description ?? "",
          }
        : {
            post_type: linkedinDocument.post_type ?? "",
            linkedin_post_id: linkedinDocument.linkedin_post_id ?? "",
            linkedin_post_url: linkedinDocument.linkedin_post_url ?? "",
          }),
    },
  })

  const handleSubmit = (
    data: ArticleEditFormValues,
    status?: CalendarEventStatus
  ) => {
    const common = {
      title: data.title,
      content: editorRef.current?.getMarkdown() ?? data.content ?? null,
      media_type: (data.media_type ?? "image") as MediaType,
      visibility: data.visibility ?? null,
      post_status: (status ??
        document.post_status ??
        "ready") as CalendarEventStatus,
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null,
      image_alt_text: data.image_alt_text ?? null,
    }
    const submittedData: LinkedInArticle | BlogPost = isBlog
      ? {
          ...blogDocument,
          ...common,
          blog_post_id: data.blog_post_id ?? null,
          blog_post_url: data.blog_post_url ?? null,
          slug: data.slug ?? blogDocument.slug,
          seo_keywords: data.seo_keywords ?? null,
          meta_description: data.meta_description ?? null,
          open_graph_description: data.open_graph_description ?? null,
          cta_profile: data.cta_profile ?? null,
          cta_top: data.cta_top ?? null,
          cta_bottom: data.cta_bottom ?? null,
          general_description: data.general_description ?? null,
        }
      : {
          ...linkedinDocument,
          ...common,
          post_type: data.post_type ?? null,
          linkedin_post_id: data.linkedin_post_id ?? null,
          linkedin_post_url: data.linkedin_post_url ?? null,
        }
    updateArticleMutation.mutate({
      document: submittedData,
    })
  }

  return (
    <form
      id="article-edit-form"
      onSubmit={form.handleSubmit((data) => handleSubmit(data))}
    >
      <div className="mb-4 flex items-center justify-end">
        <Button
          className="mr-2"
          onClick={() => {
            form.reset()
            router.push("/dashboard/blogs")
          }}
          variant={"secondary"}
        >
          Cancel
        </Button>
        <ButtonGroup>
          <Button type="submit" form="article-edit-form" variant="outline">
            <SaveCheck aria-hidden="true" />
            <span>save changes</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="More options"
                type="button"
              >
                <EllipsisVerticalIcon aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={async (e) => {
                    e.preventDefault()
                    form.handleSubmit((data) =>
                      handleSubmit(data, "approved")
                    )()

                    await api.post(
                      `/api/v1/approval/${document.event_id}/approve`
                    )
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
                    form.handleSubmit((data) =>
                      handleSubmit(data, "rejected")
                    )()

                    await api.post(
                      `/api/v1/approval/${document.event_id}/reject`
                    )
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
            render={({ fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="article-edit-form-cover">Cover</FieldLabel>

                <div className="w-full max-w-xs overflow-auto rounded-lg">
                  <SingleImagePreview
                    imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${document.media_files?.[0]?.url}`}
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

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

        {isBlog ? (
          <>
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-slug">Slug</FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="my-blog-post-slug"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="blog_post_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-blog-post-id">
                    Blog Post ID
                  </FieldLabel>
                  <Input
                    {...field}
                    disabled
                    id="article-edit-form-blog-post-id"
                    aria-invalid={fieldState.invalid}
                    placeholder="blog post id..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="blog_post_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-blog-post-url">
                    Blog Post URL
                  </FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-blog-post-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://example.com/..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="seo_keywords"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-seo-keywords">
                    SEO Keywords
                  </FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-seo-keywords"
                    aria-invalid={fieldState.invalid}
                    placeholder="marketing, automation, growth"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="meta_description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-meta-description">
                    Meta Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="article-edit-form-meta-description"
                      placeholder="Short SEO meta description..."
                      rows={3}
                      className="min-h-20 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="open_graph_description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-open-graph-description">
                    Open Graph Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="article-edit-form-open-graph-description"
                      placeholder="Description shown when the post is shared..."
                      rows={3}
                      className="min-h-20 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cta_profile"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-cta-profile">
                    CTA Profile
                  </FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-cta-profile"
                    aria-invalid={fieldState.invalid}
                    placeholder="Profile link for call to action..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cta_top"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-cta-top">
                    CTA Top
                  </FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-cta-top"
                    aria-invalid={fieldState.invalid}
                    placeholder="Top call to action..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="cta_bottom"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-cta-bottom">
                    CTA Bottom
                  </FieldLabel>
                  <Input
                    {...field}
                    id="article-edit-form-cta-bottom"
                    aria-invalid={fieldState.invalid}
                    placeholder="Bottom call to action..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="general_description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="col-span-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="article-edit-form-general-description">
                    General Description
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="article-edit-form-general-description"
                      placeholder="General description of the blog post..."
                      rows={4}
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
          </>
        ) : (
          <>
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </>
        )}

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
