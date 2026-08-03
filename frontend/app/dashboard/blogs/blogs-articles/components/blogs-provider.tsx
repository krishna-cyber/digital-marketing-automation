"use client"
import { BlogPost } from "@/types/types"
import React, { useState } from "react"

type BlogsDialog = "edit" | "delete"

type BlogsContextType = {
  open: BlogsDialog | null
  setOpen: (str: BlogsDialog | null) => void
  currentRow: BlogPost | null
  setCurrentRow: React.Dispatch<React.SetStateAction<BlogPost | null>>
}

const BlogsContext = React.createContext<BlogsContextType | null>(null)

export function BlogsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<BlogsDialog | null>(null)
  const [currentRow, setCurrentRow] = useState<BlogPost | null>(null)

  return (
    <BlogsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </BlogsContext>
  )
}

export const useBlogs = () => {
  const blogsContext = React.useContext(BlogsContext)

  if (!blogsContext) {
    throw new Error("useBlogs has to be used within <BlogsContext.Provider>")
  }

  return blogsContext
}
