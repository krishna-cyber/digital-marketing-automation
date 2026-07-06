import { AiPromptTextArea } from "@/components/examples/ai-command-textarea"
import React from "react"
import { TextGenerationDemo } from "./simple-text-generate"

const page = () => {
  return (
    <>
      <TextGenerationDemo />
      <AiPromptTextArea />
    </>
  )
}

export default page
