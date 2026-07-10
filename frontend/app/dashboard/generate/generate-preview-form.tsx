"use client"
import React from "react"

import { SingleImagePreview } from "@/components/examples/image-preview"
import LinkedInPostCard from "@/components/ui/linkedin-post-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CoverImageForm from "./form/cover-image-form"
import LinkedinPostForm from "./linkedin-post-form"
import PreviewBox from "./preview-box"

const GeneratePreviewForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      <Tabs defaultValue="cover-image">
        <TabsList className="w-full">
          <TabsTrigger value="cover-image">Cover Image</TabsTrigger>
          <TabsTrigger value="social-post">Social Post</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="cover-image">
          <div className="grid gap-3 overflow-x-hidden xl:grid-cols-2">
            <CoverImageForm />
            <PreviewBox
              title="Cover Image Preview"
              postPreviewWidth={800}
              postPreviewHeight={800}
              postPreviewScale={0.6}
            >
              <SingleImagePreview imageUrl=" https://picsum.photos/1000/800?random=1" />
            </PreviewBox>
          </div>
        </TabsContent>

        <TabsContent value="social-post">
          <div className="grid gap-2 overflow-auto overflow-x-hidden xl:grid-cols-2">
            <LinkedinPostForm />
            <PreviewBox
              title="Social Post Preview"
              postPreviewWidth={600}
              postPreviewHeight={800}
              postPreviewScale={0.8}
            >
              <LinkedInPostCard />
            </PreviewBox>
          </div>
        </TabsContent>
        <TabsContent value="business">
          <p>Business generate form</p>
        </TabsContent>
      </Tabs>

      {/* <InvoiceDetails /> */}

      {/* <Separator /> */}

      {/* <ClientSelector /> */}

      {/* <Separator /> */}

      {/* <InvoiceItems /> */}

      {/* <Separator /> */}

      {/* <InvoiceAdjustments /> */}
    </div>
  )
}

export default GeneratePreviewForm
