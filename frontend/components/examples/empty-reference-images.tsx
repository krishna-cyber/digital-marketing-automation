import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ImageOff } from "lucide-react"
import UploadMedia from "../upload-media"

export function EmptyImages() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="w-full max-w-md border border-dashed py-12">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ImageOff />
          </EmptyMedia>
          <EmptyTitle>No Reference Images Selected</EmptyTitle>
          <EmptyDescription>
            Either upload your own images or use the default refence images to
            generate a cover image.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <UploadMedia title="Upload Reference Images" />
          <EmptyDescription className="text-xs">
            PNG, JPG, SVG up to 10MB
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  )
}
