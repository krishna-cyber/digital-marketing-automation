"use client"
import { ImageUploadAndPreview } from "@/components/examples/image-upload-preview"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { FileWithPreview, useFileUpload } from "@/hooks/use-file-upload"
import { strapiRequest } from "@/lib/api"
import {
  FileUploadProvider,
  useFileUploadContext,
} from "@/store/file-upload-context"
import { useMutation } from "@tanstack/react-query"
import { ImagePlus } from "lucide-react"

import React, { useState } from "react"
import { toast } from "sonner"
interface GalleryUploadProps {
  maxFiles?: number
  maxSize?: number
  accept?: string
  multiple?: boolean
  className?: string
  onFilesChange?: (files: FileWithPreview[]) => void
}
const CONFIGURATION: GalleryUploadProps = {
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024, // 5MB
  accept: "image/*",
  multiple: true,
  onFilesChange: (files: FileWithPreview[]) => {},
}

const UploadMediaContent = ({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await strapiRequest.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      toast.success("Media uploaded successfully!")
      setDialogOpen(false)
    },
    onError: (error) => {
      console.error("Upload error:", error)
      setDialogOpen(false)
      toast.error("Failed to upload media.")
    },
  })

  const { uploadFiles } = useFileUploadContext()

  const handleUpload = async () => {
    const rawFiles = uploadFiles
      .filter(
        (f): f is FileWithPreview & { file: File } => f.file instanceof File
      )
      .map((f) => f.file)

    if (rawFiles.length === 0) {
      // nothing real to upload — maybe just default demo images left
      return
    }

    const formData = new FormData()
    rawFiles.forEach((file) => formData.append("files", file))

    //perform file upload using react-query mutation
    mutate(formData)
  }

  return (
    <DialogContent className="!max-w-2xl">
      <DialogHeader>
        <DialogTitle>Upload Media</DialogTitle>
        <DialogDescription>
          Upload your media files here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>

      {/* No prop passing required! */}
      <ImageUploadAndPreview />

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button
          disabled={uploadFiles.length === 0 || isPending}
          onClick={handleUpload}
          type="button"
        >
          {isPending && <Spinner />}
          Upload {uploadFiles.length} media
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default function UploadMedia() {
  const [open, setOpen] = useState(false)
  return (
    <FileUploadProvider>
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <ImagePlus />
              Upload Media
            </Button>
          </DialogTrigger>
          <UploadMediaContent dialogOpen={open} setDialogOpen={setOpen} />
        </Dialog>
      </div>
    </FileUploadProvider>
  )
}
