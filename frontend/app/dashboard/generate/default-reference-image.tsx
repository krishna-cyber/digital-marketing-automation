import { Field, FieldLabel } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircleIcon } from "lucide-react"
import React from "react"

const ToggleDefaultRefrenceImages = () => {
  return (
    <div className="flex items-center justify-center">
      <Field orientation="horizontal">
        <Switch id="sw-tooltip" />
        <div className="flex items-center gap-1.5">
          <FieldLabel htmlFor="sw-tooltip">
            Two-factor authentication
          </FieldLabel>
          <Tooltip>
            <TooltipTrigger className="text-muted-foreground">
              <HelpCircleIcon aria-hidden="true" className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent side="right">
              Adds an extra layer of security by requiring a verification code
              on login.
            </TooltipContent>
          </Tooltip>
        </div>
      </Field>
    </div>
  )
}

export default ToggleDefaultRefrenceImages
