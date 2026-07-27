import { CloudUploadIcon } from "lucide-react"
import React from "react"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty"
import UploadMedia from "../upload-media"

const EmptyMediaContent = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="w-full max-w-md border border-dashed py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CloudUploadIcon />
          </EmptyMedia>
          <EmptyTitle>No media files</EmptyTitle>
          <EmptyDescription>
            Drag and drop files here, or click to browse.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <UploadMedia />

          <EmptyDescription className="text-xs">
            PNG, JPG, SVG up to 10MB
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default EmptyMediaContent
