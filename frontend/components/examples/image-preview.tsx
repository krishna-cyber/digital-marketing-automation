"use client"
import { FileMetadata } from "@/hooks/use-file-upload"
import { cn, isImage } from "@/lib/utils"
import { ImageIcon, ZoomInIcon } from "lucide-react"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Spinner } from "../ui/spinner"

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
const ImagePreview = () => {
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {defaultImages.map((fileItem) => (
          <div key={fileItem.id} className="group/item relative aspect-square">
            {isImage(fileItem) && fileItem.url ? (
              <img
                src={fileItem.url}
                alt={fileItem.name}
                className="h-full w-full rounded-lg border object-cover opacity-100 transition-all group-hover/item:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg border bg-muted">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover/item:opacity-100">
              {/* View Button */}
              {fileItem.url && (
                <Button
                  onClick={() => {
                    setSelectedImage(fileItem.url!)
                    setIsPreviewLoading(true)
                  }}
                  variant="secondary"
                  size="icon"
                  className="size-7"
                >
                  <ZoomInIcon className="opacity-100/80" />
                </Button>
              )}

              {/* No remove button is required to preview image */}
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={!!selectedImage}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent className="w-full border-none bg-transparent p-0 shadow-none sm:max-w-xl [&_[data-slot=dialog-close]]:-end-7 [&_[data-slot=dialog-close]]:-top-7 [&_[data-slot=dialog-close]]:size-7 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-background [&_[data-slot=dialog-close]]:text-muted-foreground [&_[data-slot=dialog-close]]:hover:text-foreground">
          <DialogHeader className="sr-only">
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center">
            {selectedImage && (
              <>
                {isPreviewLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner className="size-8 text-white" />
                  </div>
                )}
                <img
                  src={selectedImage}
                  alt="Preview"
                  onLoad={() => setIsPreviewLoading(false)}
                  className={cn(
                    "h-full w-auto rounded-lg object-contain transition-opacity duration-300",
                    isPreviewLoading ? "opacity-0" : "opacity-100"
                  )}
                />
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ImagePreview
