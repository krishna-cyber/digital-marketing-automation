"use client"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import ContentGenerateForm from "./content-generate-form"
import PostPreview from "./post-preview"

const GeneratePreviewForm = () => {
  const form = useForm({})
  return (
    <FormProvider {...form}>
      <form className="grid gap-3 overflow-x-hidden xl:grid-cols-2">
        <ContentGenerateForm />
        <PostPreview />
      </form>
    </FormProvider>
  )
}

export default GeneratePreviewForm
