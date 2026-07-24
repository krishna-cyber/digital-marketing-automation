import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import React from "react"
import { useMedia } from "./media-provider"

const MediaEditDialog = () => {
  const { currentRow, setOpen, open } = useMedia()
  console.log("currentRow", currentRow)
  console.log("open", open)
  return (
    <Dialog open={open === "edit"} onOpenChange={() => setOpen(null)}>
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>Edit Media.</DialogTitle>
          <DialogDescription>
            {currentRow ? (
              <p>
                You are editing the media file:{" "}
                <strong>{currentRow.name}</strong>
              </p>
            ) : (
              <p>No media file selected.</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>Finish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MediaEditDialog
