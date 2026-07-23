import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sparkles } from "lucide-react"
import React from "react"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
})

export const linkedInPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required").max(3000),
  postStatus: z
    .enum(["draft", "scheduled", "published", "failed"])
    .default("draft"),
  scheduledDate: z.string().datetime().optional().nullable(),
  publishedDate: z.string().datetime().optional().nullable(),
  mediaType: z
    .enum(["text_only", "image", "video", "document", "multi_image"])
    .default("text_only"),
  mediaFiles: z.array(z.string()).max(9).optional(),
  mediaUrls: z.array(z.string().url()).optional().nullable(),
  thumbnail: z.string().optional().nullable(),
  linkedInPostId: z.string().optional().nullable(),
  linkedInPostUrl: z.string().url().optional().nullable(),
  hashtags: z.string().optional().nullable(),
  mentions: z.string().optional().nullable(),
  visibility: z
    .enum(["public", "connections_only", "specific_audience"])
    .default("public"),
  companyPageId: z.string().optional().nullable(),
  postType: z.enum(["organic", "promoted", "sponsored"]).default("organic"),
  engagementMetrics: z
    .object({
      likes: z.number().optional(),
      comments: z.number().optional(),
      shares: z.number().optional(),
      impressions: z.number().optional(),
    })
    .optional()
    .nullable(),
  errorLog: z.string().optional().nullable(),
  retryCount: z.number().int().min(0).max(10).default(0),
  autoRetry: z.boolean().default(true),
})

const LinkedinPostForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <div className="w-full max-w-md">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="prompt"
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="mx-auto w-full max-w-xl space-y-4">
                <div className="flex gap-2">
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      id="form-rhf-demo-prompt"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                      {...field}
                      // value={prompt}
                      // onChange={(e) => setPrompt(e.target.value)}
                      placeholder={"Enter your prompt..."}
                      //   onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                  <Button
                  // onClick={handleGenerate}
                  // disabled={isLoading || !prompt.trim()}
                  >
                    {/* {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )} */}
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
                {/* {response && (
        <Card>
          <CardContent className="p-4">
            <p className="text-sm whitespace-pre-wrap">{response}</p>
          </CardContent>
        </Card>
      )} */}
              </div>
            )}
          />
          {/* <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-description">
                  Description
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-rhf-demo-description"
                    placeholder="I'm having an issue with the login button on mobile."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include steps to reproduce, expected behavior, and what
                  actually happened.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          /> */}
        </FieldGroup>
      </form>
    </div>
  )
}

export default LinkedinPostForm
