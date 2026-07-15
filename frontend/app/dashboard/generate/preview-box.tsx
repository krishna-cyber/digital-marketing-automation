"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import React from "react"
import { useVisibleCenterPosition } from "./use-visible-center-position"

// Optimized dimensions for a standard LinkedIn feed post canvas
export const POST_PREVIEW_WIDTH = 800 // Standard responsive card width
export const POST_PREVIEW_HEIGHT = 800 // 4:5 Aspect Ratio (ideal for LinkedIn vertical real estate)
export const POST_PREVIEW_SCALE = 0.6 // Default to full scale for crisp rendering

interface PreviewBoxProps {
  // Props can be added here if needed in the future
  title?: string
  postPreviewWidth?: number
  postPreviewHeight?: number
  postPreviewScale?: number
  children: React.ReactNode
}

const PreviewBox = ({
  title = "Post Preview",
  children,
  postPreviewWidth,
  postPreviewHeight,
  postPreviewScale,
}: PreviewBoxProps) => {
  const previewBodyRef = React.useRef<HTMLDivElement>(null)
  const layout = useVisibleCenterPosition(previewBodyRef, {
    height: postPreviewHeight ?? POST_PREVIEW_HEIGHT,
    maxScale: postPreviewScale ?? POST_PREVIEW_SCALE,
    width: postPreviewWidth ?? POST_PREVIEW_WIDTH,
  })

  return (
    <div className="flex flex-col rounded-xl border bg-card">
      {/* Preview header section */}
      <div className="flex items-center justify-between border-b px-4 py-4">
        <h2 className="text-lg font-medium">{title}</h2>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
        </div>
      </div>

      {/* Main preview area */}
      <div
        ref={previewBodyRef}
        className="@container/preview relative flex min-h-[calc(100svh-10rem)] flex-1 items-center justify-center rounded-b-xl bg-stone-100 p-6 dark:bg-stone-900"
      >
        {layout === null && (
          <div className="absolute inset-0 grid place-items-center text-sm text-muted-foreground">
            Loading Preview...
          </div>
        )}

        {/* Main preview content canvas */}
        <div
          style={{
            height: layout
              ? (postPreviewHeight ?? POST_PREVIEW_HEIGHT * layout.scale)
              : (postPreviewHeight ??
                POST_PREVIEW_HEIGHT * (postPreviewScale ?? POST_PREVIEW_SCALE)),
            top: layout?.top ?? "50%",
            transform:
              layout === null ? "translate(-50%, -50%)" : "translateX(-50%)",
            width: "90%",
          }}
          className="absolute -right-1/2 h-fit opacity-0 transition-opacity duration-200 data-[ready=true]:opacity-100"
          data-ready={layout !== null}
        >
          <div
            style={{
              transform: `scale(${layout ? layout.scale : (postPreviewScale ?? POST_PREVIEW_SCALE)})`,
            }}
            className="h-full w-full origin-top-left"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewBox
