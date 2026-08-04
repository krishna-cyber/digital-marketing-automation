"use client"
import { MediaFile } from "@/types/types"
import React, { useState } from "react"

type MediaDialogType = "edit" | "delete"

type MediaContextType = {
  open: MediaDialogType | null
  setOpen: (str: MediaDialogType | null) => void
  currentRow: MediaFile | null
  setCurrentRow: React.Dispatch<React.SetStateAction<MediaFile | null>>
}

const MediaContext = React.createContext<MediaContextType | null>(null)

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<MediaDialogType | null>(null)
  const [currentRow, setCurrentRow] = useState<MediaFile | null>(null)

  return (
    <MediaContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </MediaContext>
  )
}

export const useMedia = () => {
  const mediaContext = React.useContext(MediaContext)

  if (!mediaContext) {
    throw new Error("useMedia has to be used within <MediaContext>")
  }

  return mediaContext
}
