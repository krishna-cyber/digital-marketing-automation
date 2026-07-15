"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { enUS } from "date-fns/locale"
import React, { useEffect } from "react"
import { HexColorPicker } from "react-colorful"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DateTimePicker } from "./date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Textarea } from "./ui/textarea"

const eventAddFormSchema = z.object({
  title: z
    .string({ error: "Please enter a title." })
    .min(1, { message: "Must provide a title for this event." }),
  description: z
    .string({ error: "Please enter a description." })
    .min(1, { message: "Must provide a description for this event." }),
  start: z.date({
    error: "Please select a start time",
  }),
  end: z.date({
    error: "Please select an end time",
  }),
  allday: z.boolean(),
  color: z
    .string({ error: "Please select an event color." })
    .min(1, { message: "Must provide a title for this event." }),
})

export type EventAddFormValues = z.infer<typeof eventAddFormSchema>

interface EventAddFormProps {
  start: Date
  end: Date
  eventAddOpen: boolean
  setEventAddOpen: (open: boolean) => void
  allday: boolean
  handleSubmit: (data: EventAddFormValues) => void
}

export function EventAddForm({
  start,
  end,
  eventAddOpen,
  allday,
  setEventAddOpen,
  handleSubmit,
}: Readonly<EventAddFormProps>) {
  const form = useForm<z.input<typeof eventAddFormSchema>>({
    resolver: zodResolver(eventAddFormSchema),
  })

  useEffect(() => {
    form.reset({
      title: "",
      description: "",
      start: start,
      allday: allday,
      end: end,
      color: "#76c7ef",
    })
  }, [form, start, end, allday])

  return (
    <AlertDialog open={eventAddOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Event</AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2.5"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Standup Meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Daily session"
                      className="max-h-36"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">Start</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      locale={enUS}
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity={allday ? "day" : "minute"}
                      weekStartsOn={undefined}
                      showWeekNumber={undefined}
                      showOutsideDays={undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="datetime">End</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      locale={enUS}
                      value={field.value}
                      onChange={field.onChange}
                      hourCycle={12}
                      granularity={allday ? "day" : "minute"}
                      weekStartsOn={undefined}
                      showWeekNumber={undefined}
                      showOutsideDays={undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild className="cursor-pointer">
                        <div className="flex w-full flex-row items-center space-x-2 pl-2">
                          <div
                            className={`h-5 w-5 cursor-pointer rounded-full`}
                            style={{ backgroundColor: field.value }}
                          ></div>
                          <Input {...field} />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="mx-auto flex items-center justify-center">
                        <HexColorPicker
                          className="flex"
                          color={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className="pt-2">
              <AlertDialogCancel onClick={() => setEventAddOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction type="submit">Add Event</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
