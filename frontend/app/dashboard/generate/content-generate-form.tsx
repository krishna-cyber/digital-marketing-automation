"use client"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from "react"
import CoverImageForm from "./form/cover-image-form"
import LinkedinPostForm from "./linkedin-post-form"

const ContentGenerateForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4">
      <Tabs defaultValue="cover-image">
        <TabsList className="w-full">
          <TabsTrigger value="cover-image">Cover Image</TabsTrigger>
          <TabsTrigger value="social-post">Social Post</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="cover-image">
          <CoverImageForm />
        </TabsContent>

        <TabsContent value="social-post">
          <p>Social post generate form</p>
          <LinkedinPostForm />
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

export default ContentGenerateForm
