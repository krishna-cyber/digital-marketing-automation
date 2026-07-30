import { Main } from "@/components/layout/main"
import { Button } from "@/components/ui/button"
import { strapiRequest } from "@/lib/api"
import { AxiosError } from "axios"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ArticleEditForm from "./article-edit-form"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const resolvedParams = await searchParams
  const documentId = resolvedParams.documentId as string

  if (!documentId) {
    notFound()
  }

  try {
    const response = await strapiRequest.get(
      `/api/articles/${documentId}?populate=*`
    )
    const articleData = response.data?.data
    return (
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            <Button variant={"link"} size={"sm"} asChild>
              <Link href={"/dashboard/blogs"}>
                <ArrowLeft />
                Back
              </Link>
            </Button>{" "}
            <h1 className="text-2xl font-bold tracking-tight">
              {articleData?.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {articleData?.description}
            </p>
          </span>
        </div>
        <section className={"py-16"}>
          <ArticleEditForm document={articleData} />
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
