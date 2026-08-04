import { SingleImagePreview } from "@/components/examples/image-preview"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { strapiRequest } from "@/lib/api"
import { handleCopyToClipboard, handleDownload } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Download, Link, Trash2 } from "lucide-react"
import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useMedia } from "./media-provider"

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  alternativeText: z.string().max(255).optional(),
  caption: z.string().max(255).optional(),
  focalPoint: z
    .object({
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
    })
    .nullable()
    .optional(),
})

export type MediaEditFormValues = z.infer<typeof formSchema>

const MediaEditDialog = () => {
  const { currentRow, setOpen, open } = useMedia()
  const queryClient = useQueryClient()

  const form = useForm<MediaEditFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentRow?.name,
      alternativeText: currentRow?.alternativeText || "",
      caption: currentRow?.caption || "",
      focalPoint: currentRow?.focalPoint || null,
    },
  })

  useEffect(() => {
    if (open === "edit" && currentRow) {
      form.reset({
        name: currentRow.name,
        alternativeText: currentRow.alternativeText || "",
        caption: currentRow.caption || "",
        focalPoint: currentRow.focalPoint || null,
      })
    }
  }, [open, currentRow, form])

  const updateMediaMutation = useMutation({
    mutationKey: ["updateMedia", currentRow?.id],
    mutationFn: async (data: MediaEditFormValues) => {
      const formData = new FormData()
      formData.append(
        "fileInfo",
        JSON.stringify({
          name: data.name,
          alternativeText: data.alternativeText || "",
          caption: data.caption || "",
        })
      )
      const response = await strapiRequest.post(
        `/api/upload?id=${currentRow?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return response.data
    },
    onSuccess: () => {
      toast.success("Media file updated successfully.")
      setOpen(null)
      queryClient.invalidateQueries({ queryKey: ["medias"] })
    },
    onError: (error) => {
      console.error("Error updating media file:", error)
      toast.error("Error updating media file.")
    },
  })

  const onSubmit = (data: MediaEditFormValues) => {
    updateMediaMutation.mutate(data)
  }

  return (
    <Dialog open={open === "edit"} onOpenChange={() => setOpen(null)}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Media.</DialogTitle>
          <DialogDescription>
            {currentRow ? (
              <p>
                You are editing the media file:{" "}
                <strong>{currentRow.name}</strong>
              </p>
            ) : (
              <p>No media file selected.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar grid max-h-[50vh] grid-cols-2 gap-4 overflow-y-auto px-4">
          {/* Form fields for editing the media file */}
          <div className="flex flex-col gap-2">
            <SingleImagePreview
              imageUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currentRow?.url}`}
            />
            <ButtonGroup>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setOpen("delete")}
                aria-label="Delete media"
              >
                <Trash2 aria-hidden="true" />
              </Button>
              <Button
                onClick={() => {
                  handleDownload({
                    fileUrl: `${process.env.NEXT_PUBLIC_STRAPI_URL}${currentRow?.url}`,
                    filename: currentRow?.name,
                  })
                }}
                variant="outline"
                size="icon"
                aria-label="Download media"
              >
                <Download aria-hidden="true" />
              </Button>
              <Button
                onClick={() => {
                  handleCopyToClipboard(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}${currentRow?.url}`
                  )
                }}
                variant="outline"
                size="icon"
                aria-label="Copy media link"
              >
                <Link aria-hidden="true" />
              </Button>
            </ButtonGroup>
          </div>

          <form
            className="flex flex-col gap-2"
            id="media-edit-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <CardContent className="grid grid-cols-2 gap-4">
              <Field className="gap-0.5!">
                <FieldLabel className="text-xs font-light text-muted-foreground">
                  SIZE
                </FieldLabel>
                <p className="text-xs">
                  {currentRow ? `${currentRow.size.toFixed(0)} KB` : "-"}
                </p>
              </Field>
              <Field className="gap-0.5!">
                <FieldLabel className="text-xs font-light text-muted-foreground">
                  DIMENSIONS
                </FieldLabel>
                <p className="text-xs">
                  {currentRow
                    ? `${currentRow.width}x${currentRow.height}`
                    : "-"}
                </p>
              </Field>
              <Field className="gap-0.5!">
                <FieldLabel className="text-xs font-light text-muted-foreground">
                  DATE
                </FieldLabel>
                <p className="text-xs">
                  {currentRow
                    ? new Date(currentRow.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </Field>
              <Field className="gap-0.5!">
                <FieldLabel className="text-xs font-light text-muted-foreground">
                  EXTENSION
                </FieldLabel>
                <p className="text-xs">
                  {currentRow
                    ? currentRow.ext.replaceAll(".", "").toUpperCase()
                    : "-"}
                </p>
              </Field>
              <Field className="gap-0.5!">
                <FieldLabel className="text-xs font-light text-muted-foreground">
                  ASSET ID
                </FieldLabel>
                <p className="text-xs">{currentRow?.documentId ?? "-"}</p>
              </Field>
            </CardContent>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="media-edit-form-name">
                    File name<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    id="media-edit-form-name"
                    placeholder="Enter file name"
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="alternativeText"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="media-edit-form-alternative-text">
                    Alternative Text
                  </FieldLabel>
                  <Input
                    id="media-edit-form-alternative-text"
                    placeholder="Enter alternative text"
                    {...field}
                  />
                  <FieldDescription>
                    This text will be displayed if the asset can&apos;t be
                    shown.
                  </FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="caption"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="media-edit-form-caption">
                    Caption
                  </FieldLabel>
                  <Input
                    id="media-edit-form-caption"
                    placeholder="Enter caption"
                    {...field}
                  />
                </Field>
              )}
            />
          </form>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={updateMediaMutation.isPending}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="media-edit-form"
            disabled={updateMediaMutation.isPending}
          >
            {updateMediaMutation.isPending && <Spinner />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MediaEditDialog
