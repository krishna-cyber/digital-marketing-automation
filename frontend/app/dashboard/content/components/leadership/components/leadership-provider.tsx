"use client"
import { ThoughtLeadershipPost } from "@/types/types"
import React, { useState } from "react"

type PostDialogType = "edit" | "delete"

type PostsContextType = {
  open: PostDialogType | null
  setOpen: (str: PostDialogType | null) => void
  currentRow: ThoughtLeadershipPost | null
  setCurrentRow: React.Dispatch<
    React.SetStateAction<ThoughtLeadershipPost | null>
  >
}

const PostsContext = React.createContext<PostsContextType | null>(null)

export function PostsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<PostDialogType | null>(null)
  const [currentRow, setCurrentRow] = useState<ThoughtLeadershipPost | null>(
    null
  )

  return (
    <PostsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </PostsContext>
  )
}

export const usePosts = () => {
  const postsContext = React.useContext(PostsContext)

  if (!postsContext) {
    throw new Error("usePosts has to be used within <PostsContext.Provider>")
  }

  return postsContext
}
