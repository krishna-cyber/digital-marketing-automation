import ImagePreview from "@/components/examples/image-preview"
import { ImageUploadAndPreview } from "@/components/examples/image-upload-preview"
import { Main } from "@/components/layout/main"
import React from "react"
import GeneratePreviewForm from "./generate-preview-form"

const page = () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          <h1 className="text-2xl font-bold tracking-tight">
            Generate Content
          </h1>
          <p className="text-sm text-muted-foreground">
            AI powered content generation for your social media and blogs.
          </p>
        </span>
      </div>
      <section className={"py-8"}>
        <GeneratePreviewForm />
      </section>

      {/* Image preview */}
      <ImageUploadAndPreview />
      <div>
        Image preview only
        <ImagePreview />
      </div>
    </Main>
  )
}

export default page
