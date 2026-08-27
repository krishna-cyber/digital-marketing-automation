import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import { strapiRequest } from "@/lib/api"
import { AxiosError } from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import LeadershipEditForm from "./leadership-edit-form"
import SocialEditForm from "./social-edit-form"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const resolvedParams = await searchParams
  const documentId = resolvedParams.documentId as string
  const contentType = resolvedParams.contentType as string
  if (!documentId || !contentType) {
    console.log(
      "Missing documentId or contentType in searchParams:",
      resolvedParams
    )
    notFound()
  }

  try {
    const response = await strapiRequest.get(
      `/api/${contentType}/${documentId}?populate=*`
    )
    const leadershipContent = response.data?.data
    return (
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            <Button
              nativeButton={false}
              variant={"link"}
              size={"sm"}
              render={
                <Link href={"/dashboard/content"}>
                  <ArrowLeft />
                  Back
                </Link>
              }
            />
            <h1 className="text-2xl font-bold tracking-tight">
              {leadershipContent?.title}
            </h1>
            {leadershipContent?.meta_description && (
              <p className="text-sm text-muted-foreground">
                {leadershipContent.meta_description}
              </p>
            )}
          </span>
        </div>
        <section className={"py-16"}>
          {contentType === "thought-leaderships" ? (
            <LeadershipEditForm leadershipContent={leadershipContent} />
          ) : (
            <SocialEditForm socialContent={leadershipContent} />
          )}
        </section>
      </Main>
    )
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      notFound()
    }
    throw error
  }
}

export default page
