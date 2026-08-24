"use client"

import { FontSelect } from "@/components/examples/font-select"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpCircleIcon } from "lucide-react"
import Image from "next/image"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
import z from "zod"

const imageItemSchema = z.object({
  id: z.string(),
  url: z.string().refine((value) => URL.canParse(value), {
    message: "Enter a valid image URL",
  }),
})

const colorItemSchema = z.object({
  id: z.string(),
  hex: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Use a valid hex color"),
})

const brandFormSchema = z.object({
  referenceImages: z
    .array(imageItemSchema)
    .min(1, { message: "Add at least one reference image" }),
  brandColors: z
    .array(colorItemSchema)
    .min(1, { message: "At least one brand color is required" }),
  styleDescription: z
    .string()
    .min(10, { message: "Style description is too short" })
    .max(500, { message: "Style description must be 500 characters or less" }),
})

const defaultValues: z.infer<typeof brandFormSchema> = {
  referenceImages: [
    {
      id: "ref-1",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    },
  ],
  brandColors: [
    { id: "color-1", hex: "#1D4ED8" },
    { id: "color-2", hex: "#0F172A" },
    { id: "color-3", hex: "#F8FAFC" },
  ],
  styleDescription:
    "Modern and confident visual style with clean layouts, clear typography, and a polished professional tone.",
}

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const BrandForm = () => {
  const form = useForm<z.infer<typeof brandFormSchema>>({
    resolver: zodResolver(brandFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const {
    fields: referenceImageFields,
    append: appendReferenceImage,
    remove: removeReferenceImage,
  } = useFieldArray({
    control: form.control,
    name: "referenceImages",
  })

  const {
    fields: brandColorFields,
    append: appendBrandColor,
    remove: removeBrandColor,
  } = useFieldArray({
    control: form.control,
    name: "brandColors",
  })

  const watchedReferenceImages =
    useWatch({ control: form.control, name: "referenceImages" }) ?? []
  const watchedBrandColors =
    useWatch({ control: form.control, name: "brandColors" }) ?? []

  const handleSubmit = (data: z.infer<typeof brandFormSchema>) => {
    console.log(data)
  }

  return (
    <form
      id="brand-form"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-8"
    >
      <Controller
        name="referenceImages"
        control={form.control}
        render={({}) => (
          <Field>
            <FieldLabel>Reference Images</FieldLabel>
            <Button
              type="button"
              variant="outline"
              onClick={() => appendReferenceImage({ id: createId(), url: "" })}
            >
              Add Image
            </Button>

            <div className="space-y-3">
              {referenceImageFields.map((field, index) => (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...form.register(`referenceImages.${index}.url`)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeReferenceImage(index)}
                      disabled={referenceImageFields.length === 1}
                    >
                      Remove
                    </Button>
                  </div>
                  <FieldError>
                    {
                      form.formState.errors.referenceImages?.[index]?.url
                        ?.message
                    }
                  </FieldError>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {watchedReferenceImages.map((item, index) => (
                <div
                  key={`${item.id}-preview`}
                  className="overflow-hidden rounded-md border bg-muted/20"
                >
                  {item.url ? (
                    <Image
                      src={item.url}
                      alt={`Reference ${index + 1}`}
                      width={600}
                      height={300}
                      unoptimized
                      className="h-32 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                      Image preview
                    </div>
                  )}
                </div>
              ))}
            </div>

            <FieldDescription>
              Add visual references that represent your preferred brand
              direction.
            </FieldDescription>
          </Field>
        )}
      />
      <Separator />

      <Field>
        <div className="flex items-center justify-between gap-4">
          <FieldLabel>
            Content Generation Font
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-muted-foreground">
                  <HelpCircleIcon aria-hidden="true" className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  Selected font is used to generate content and is not applied
                  to the dashboard UI.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </FieldLabel>
        </div>
        <div className="space-y-3">
          <FontSelect />
        </div>
      </Field>

      <Separator />

      <Field>
        <div className="flex items-center justify-between gap-4">
          <FieldLabel>Brand Colors</FieldLabel>
          <Button
            type="button"
            variant="outline"
            onClick={() => appendBrandColor({ id: createId(), hex: "#000000" })}
          >
            Add Color
          </Button>
        </div>

        <div className="space-y-3">
          {brandColorFields.map((field, index) => (
            <div key={field.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={watchedBrandColors[index]?.hex ?? "#000000"}
                  onChange={(event) =>
                    form.setValue(
                      `brandColors.${index}.hex`,
                      event.target.value,
                      {
                        shouldDirty: true,
                        shouldValidate: true,
                      }
                    )
                  }
                  className="h-10 w-14 p-1"
                />
                <Input
                  placeholder="#000000"
                  {...form.register(`brandColors.${index}.hex`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeBrandColor(index)}
                  disabled={brandColorFields.length === 1}
                >
                  Remove
                </Button>
              </div>
              <FieldError>
                {form.formState.errors.brandColors?.[index]?.hex?.message}
              </FieldError>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {watchedBrandColors.map((item) => (
            <div
              key={`${item.id}-chip`}
              className="flex items-center gap-2 rounded-md border px-2 py-1"
            >
              <span
                className="size-4 rounded-sm border"
                style={{ backgroundColor: item.hex }}
              />
              <span className="text-sm font-medium uppercase">{item.hex}</span>
            </div>
          ))}
        </div>

        <FieldDescription>
          Define your core palette using hex values.
        </FieldDescription>
      </Field>
      <Separator />

      <Controller
        name="styleDescription"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="brand-form-style-description">
              Style Description
            </FieldLabel>
            <InputGroup>
              <InputGroupTextarea
                {...field}
                id="brand-form-style-description"
                placeholder="Tell us a little bit about your brand's style"
                rows={6}
                className="min-h-24 resize-none"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {field.value.length}/500 characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription>
              Describe the visual style and tone of your brand.
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button form="brand-form" type="submit" size="lg">
        Update Preferences
      </Button>
    </form>
  )
}

export default BrandForm
