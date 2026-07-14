"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Check, Loader2, RefreshCw, X } from "lucide-react"
import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface TextTransformDialogProps {
  isOpen: boolean
  onClose: () => void
  onAccept: (transformedText: string) => void
  onReject: () => void
  originalText: string
  action: string
  model?: string
}

export function TextTransformDialog({
  isOpen,
  onClose,
  onAccept,
  onReject,
  originalText,
  action,
  model = "openrouter/auto",
}: Readonly<TextTransformDialogProps>) {
  const [streamedText, setStreamedText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const actionLabels: Record<string, string> = {
    "make-longer": "Make Longer",
    "make-shorter": "Make Shorter",
    improve: "Improve",
    simplify: "Simplify",
    formalize: "Formalize",
    casualize: "Casualize",
  }

  const resetState = () => {
    setStreamedText("")
    setIsStreaming(false)
    setError(null)
  }

  const startStreaming = async () => {
    if (!isOpen || !originalText || !action) return

    resetState()
    setIsStreaming(true)

    try {
      console.log(
        "Starting streaming with action:",
        action,
        "and model:",
        model
      )
      const response = await fetch("/api/openrouter/text-transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: originalText,
          action,
          model,
          max_tokens: 200,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to transform text")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error("No response body")
      }

      setStreamedText("basic demo how streaming works and text is catched here")
      setIsStreaming(false)

      //TODO: HANDLE STREAM RECEIVED FROM OPENROUTER API, CURRENTLY IT IS JUST A DEMO, NEED TO IMPLEMENT STREAMING LOGIC
      // while (true) {
      //   const { done, value } = await reader.read()
      //   if (done) break

      //   const chunk = decoder.decode(value, { stream: true })
      //   const lines = chunk.split("\n")

      //   for (const line of lines) {
      //     if (line.startsWith("data: ")) {
      //       try {
      //         const data = JSON.parse(line.slice(6))

      //         if (data.type === "content" && data.content) {
      //           setStreamedText((prev) => prev + data.content)
      //         } else if (data.type === "done") {
      //           setIsStreaming(false)
      //         }
      //       } catch (e) {
      //         console.log("Failed to parse JSON line:", line, e)
      //         // Skip malformed JSON
      //       }
      //     }
      //   }
      // }
    } catch (error) {
      console.error("Streaming error:", error)
      setError("Failed to transform text. Please try again.")
      setIsStreaming(false)
    }
  }

  // Start streaming when dialog opens
  useEffect(() => {
    if (isOpen && originalText && action) {
      startStreaming()
    }
  }, [isOpen, originalText, action])

  const handleAccept = () => {
    if (streamedText.trim()) {
      onAccept(streamedText.trim())
      onClose()
    }
  }

  const handleReject = () => {
    onReject()
    onClose()
  }

  const handleRetry = () => {
    startStreaming()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>AI Text Transformation</span>
            <Badge variant="secondary" className="text-xs">
              {actionLabels[action] || action}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-4 overflow-hidden">
          {/* Original Text */}
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Original:
            </h4>
            <div className="max-h-24 overflow-y-auto rounded-md bg-muted/30 p-3 text-sm">
              {originalText}
            </div>
          </div>

          {/* Transformed Text */}
          <div className="min-h-0 flex-1">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              {actionLabels[action] || "Transformed"}:
              {isStreaming && <Loader2 className="h-3 w-3 animate-spin" />}
            </h4>
            <div className="max-h-60 min-h-[120px] overflow-y-auto rounded-md border-2 border-dashed border-muted bg-muted/10 p-3 text-sm">
              {error ? (
                <div className="flex items-center gap-2 text-destructive">
                  <X className="h-4 w-4" />
                  {error}
                </div>
              ) : streamedText || isStreaming ? (
                <div className="whitespace-pre-wrap">
                  {streamedText}
                  {isStreaming && <span className="animate-pulse">|</span>}
                </div>
              ) : (
                <div className="text-muted-foreground italic">
                  Generating transformation...
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          {error ? (
            <Button
              onClick={handleRetry}
              variant="outline"
              disabled={isStreaming}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          ) : null}

          <Button
            onClick={handleReject}
            variant="outline"
            disabled={isStreaming}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reject
          </Button>

          <Button
            onClick={handleAccept}
            disabled={isStreaming || !streamedText.trim() || !!error}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Accept Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
