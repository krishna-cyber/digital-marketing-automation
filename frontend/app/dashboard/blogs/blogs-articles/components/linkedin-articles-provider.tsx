"use client"
import { LinkedInArticle } from "@/types/types"
import React, { useState } from "react"

type LinkedInArticlesDialog = "edit" | "delete"

type LinkedInArticlesContextType = {
  open: LinkedInArticlesDialog | null
  setOpen: (str: LinkedInArticlesDialog | null) => void
  currentRow: LinkedInArticle | null
  setCurrentRow: React.Dispatch<React.SetStateAction<LinkedInArticle | null>>
}

const LinkedinArticlesContext =
  React.createContext<LinkedInArticlesContextType | null>(null)

export function LinkedInArticlesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<LinkedInArticlesDialog | null>(null)
  const [currentRow, setCurrentRow] = useState<LinkedInArticle | null>(null)

  return (
    <LinkedinArticlesContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </LinkedinArticlesContext>
  )
}

export const useLinkedInArticles = () => {
  const linkedinArticleContext = React.useContext(LinkedinArticlesContext)

  if (!linkedinArticleContext) {
    throw new Error(
      "useLinkedInArticles has to be used within <LinkedinArticlesContext.Provider>"
    )
  }

  return linkedinArticleContext
}
