import { FileMetadata } from "@/hooks/use-file-upload"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isImage = (file: File | FileMetadata) => {
  const type = file instanceof File ? file.type : file.type
  return type.startsWith("image/")
}
