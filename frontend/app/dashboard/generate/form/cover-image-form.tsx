"use client"
import { EmptyImages } from "@/components/examples/empty-reference-images"
import ImagePreview from "@/components/examples/image-preview"
import { Button } from "@/components/ui/button"
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
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FileMetadata } from "@/hooks/use-file-upload"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircleIcon, Sparkles } from "lucide-react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  referenceImages: z.array(z.string()).optional(),
  prompt: z.string().min(1, "Prompt is required"),
  defaultReferenceImages: z.boolean().optional(),
})

const defaultImages: FileMetadata[] = [
  {
    id: "default-1",
    name: "avatar-1.png",
    size: 44608,
    type: "image/png",
    url: "https://picsum.photos/1000/800?random=1",
  },
  {
    id: "default-2",
    name: "avatar-2.png",
    size: 42144,
    type: "image/png",
    url: "https://picsum.photos/1000/800?random=2",
  },
  {
    id: "default-3",
    name: "avatar-2.png",
    size: 42144,
    type: "image/png",
    url: "https://picsum.photos/1000/800?random=3",
  },
]

const CoverImageForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      referenceImages: [],
      prompt: "",
      defaultReferenceImages: false,
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  const defaultReferenceImages = form.watch("defaultReferenceImages")
  console.log("defaultReferenceImages", defaultReferenceImages)

  return (
    <form id="cover-image-generate-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="referenceImages"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Reference Images
              </FieldLabel>
              <Controller
                name="defaultReferenceImages"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation={"horizontal"}
                    data-invalid={fieldState.invalid}
                  >
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="sw-tooltip"
                    />
                    <div className="flex items-center gap-1.5">
                      <FieldLabel htmlFor="sw-tooltip">
                        Default Reference Images.
                      </FieldLabel>
                      <Tooltip>
                        <TooltipTrigger className="text-muted-foreground">
                          <HelpCircleIcon
                            aria-hidden="true"
                            className="size-3.5"
                          />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          Use default reference images provided by the system.
                          You can change them from the settings page.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {!defaultReferenceImages ? <EmptyImages /> : null}
              {defaultReferenceImages && <ImagePreview />}
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Login button not working on mobile"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="prompt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-description">
                Prompt
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="form-rhf-demo-description"
                  placeholder="Describe the image you want to generate..."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="tabular-nums">
                    {field.value.length}/100 characters
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
      </FieldGroup>
      <div className="flex justify-center">
        <Button type="submit" className="mt-4 max-w-1/3">
          <Sparkles />
          Generate Cover Image
        </Button>
      </div>
    </form>
  )
}

export default CoverImageForm
