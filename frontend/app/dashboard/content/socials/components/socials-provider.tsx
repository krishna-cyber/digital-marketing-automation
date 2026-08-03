"use client"
import { SocialPost, MediaFile } from "@/types/types"
import React, { useState } from "react"

type PostDialogType = "edit" | "delete"

type SocialsContextType = {
  open: PostDialogType | null
  setOpen: (str: PostDialogType | null) => void
  currentRow: SocialPost | null
  setCurrentRow: React.Dispatch<React.SetStateAction<SocialPost | null>>
}

const SocialsContext = React.createContext<SocialsContextType | null>(null)

export function SocialsProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<PostDialogType | null>(null)
  const [currentRow, setCurrentRow] = useState<SocialPost | null>(null)

  return (
    <SocialsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </SocialsContext>
  )
}

export const useSocials = () => {
  const socialsContext = React.useContext(SocialsContext)

  if (!socialsContext) {
    throw new Error("useSocials has to be used within <SocialsContext.Provider>")
  }

  return socialsContext
}
