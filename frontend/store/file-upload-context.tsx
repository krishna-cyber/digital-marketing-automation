"use client"

import { FileMetadata, FileWithPreview } from "@/hooks/use-file-upload"
import React, { createContext, useCallback, useContext, useState } from "react"

interface FileUploadContextType {
  uploadFiles: FileWithPreview[]

  handleFilesChange: (files: FileWithPreview[]) => void
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(
  undefined
)

export function FileUploadProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [uploadFiles, setUploadFiles] = useState<FileWithPreview[]>([])

  const handleFilesChange = useCallback((files: FileWithPreview[]) => {
    setUploadFiles(files)
  }, [])

  return (
    <FileUploadContext.Provider value={{ uploadFiles, handleFilesChange }}>
      {children}
    </FileUploadContext.Provider>
  )
}

export function useFileUploadContext() {
  const context = useContext(FileUploadContext)
  if (!context) {
    throw new Error(
      "useFileUploadContext must be used within a FileUploadProvider"
    )
  }
  return context
}
