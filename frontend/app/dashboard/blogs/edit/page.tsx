import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import { strapiRequest } from "@/lib/api"
import { AxiosError } from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArticleEditForm, { type ArticleContentType } from "./article-edit-form"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const resolvedParams = await searchParams
  const documentId = resolvedParams.documentId as string
  const contentType = resolvedParams.contentType as string
  if (!documentId || !contentType) {
    notFound()
  }

  try {
    const response = await strapiRequest.get(
      `/api/${contentType}/${documentId}?populate=*`
    )
    const articleData = response.data?.data
    return (
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            <Button
              variant={"link"}
              size={"sm"}
              nativeButton={false}
              render={
                <Link href={"/dashboard/blogs"}>
                  <ArrowLeft />
                  Back
                </Link>
              }
            />

            <h1 className="text-2xl font-bold tracking-tight">
              {articleData?.title}
            </h1>
            {articleData?.meta_description && (
              <p className="text-sm text-muted-foreground">
                {articleData.meta_description}
              </p>
            )}
          </span>
        </div>
        <section className={"py-16"}>
          <ArticleEditForm
            contentType={contentType as ArticleContentType}
            document={articleData}
          />
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
