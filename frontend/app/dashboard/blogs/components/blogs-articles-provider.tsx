"use client"
import { BlogsAndArticles } from "@/types/types"
import React, { useState } from "react"

type BlogsAndArticlesDialog = "edit" | "delete"

type PostsContextType = {
  open: BlogsAndArticlesDialog | null
  setOpen: (str: BlogsAndArticlesDialog | null) => void
  currentRow: BlogsAndArticles | null
  setCurrentRow: React.Dispatch<React.SetStateAction<BlogsAndArticles | null>>
}

const BlogsAndArticlesContext = React.createContext<PostsContextType | null>(
  null
)

export function BlogsAndArticlesProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<BlogsAndArticlesDialog | null>(null)
  const [currentRow, setCurrentRow] = useState<BlogsAndArticles | null>(null)

  return (
    <BlogsAndArticlesContext
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </BlogsAndArticlesContext>
  )
}

export const useBlogsAndArticles = () => {
  const blogsAndArticlesContext = React.useContext(BlogsAndArticlesContext)

  if (!blogsAndArticlesContext) {
    throw new Error(
      "useBlogsAndArticles has to be used within <BlogsAndArticlesContext.Provider>"
    )
  }

  return blogsAndArticlesContext
}
