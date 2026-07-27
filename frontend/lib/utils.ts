import { FileMetadata } from "@/hooks/use-file-upload"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isImage = (file: File | FileMetadata) => {
  const type = file instanceof File ? file.type : file.type
  return type.startsWith("image/")
}

export const handleCopyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  } catch (error) {
    console.error("Failed to copy:", error)
    toast.error("Failed to copy to clipboard")
  }
}

export const handleDownload = async ({
  fileUrl,
  filename,
}: {
  fileUrl: string
  filename?: string
}) => {
  try {
    // Fetch the file
    const response = await fetch(fileUrl)
    const blob = await response.blob()

    // Create download link
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = filename ?? "download"
    document.body.appendChild(link)
    link.click()
    link.remove()

    // Clean up
    URL.revokeObjectURL(link.href)
    toast.success("Download media has been started!")
  } catch (error) {
    console.error("Failed to download media:", error)
    toast.error("Failed to download media!")
  }
}
