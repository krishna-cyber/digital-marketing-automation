import { AiPromptTextArea } from "@/components/examples/ai-command-textarea"
import SocialFeedCard from "@/components/examples/social-feed-card"
import LinkedInPostCard from "@/components/ui/linkedin-post-card"
import React from "react"
import { TextGenerationDemo } from "./simple-text-generate"

const page = () => {
  return (
    <>
      <TextGenerationDemo />
      <AiPromptTextArea />
      <LinkedInPostCard />
      <SocialFeedCard />
    </>
  )
}

export default page
