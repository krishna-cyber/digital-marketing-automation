"use client"
import { SingleImagePreview } from "@/components/examples/image-preview"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { BlogsAndArticles } from "@/types/types"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const articleEditSchema = z.object({
  title: z.string().min(1, "Title is required").max(500),
  description: z.string().max(2000).optional().nullable(),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric with hyphens"
    )
    .optional()
    .nullable(),
  markdown: z.string().optional().nullable(),
  cover: z.number().optional().nullable(),
  author: z.number().optional().nullable(),
  category: z.number().optional().nullable(),
})

export type ArticleEditFormValues = z.infer<typeof articleEditSchema>

const ArticleEditForm = ({ document }: { document: BlogsAndArticles }) => {
  const form = useForm<z.infer<typeof articleEditSchema>>({
    resolver: zodResolver(articleEditSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  console.log("Document received in ArticleEditForm:", document)
  return (
    <form id="article-edit-form">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <FieldGroup> */}
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
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-description">
                Description <span className="text-red-500">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="article-edit-form-description"
                  placeholder="Description of the article..."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value?.length}/100 characters
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription>
                Include steps to reproduce, expected behavior, and what actually
                happened.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
                placeholder="Slug of the article..."
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="cover"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="article-edit-form-cover">Cover</FieldLabel>

              <div className="w-full max-w-xs overflow-auto rounded-lg">
                <SingleImagePreview imageUrl="https://picsum.photos/1000/800?random=1" />
              </div>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* </FieldGroup> */}
      </div>
      <SimpleEditor />
    </form>
  )
}

export default ArticleEditForm
