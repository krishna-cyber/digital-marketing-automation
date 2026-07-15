import BlogCard from "@/components/blog-card"
import { Main } from "@/components/layout/main"

const page = () => {
  return (
    <Main>
      <div className="mb-2 flex items-center justify-between space-y-2">
        <span>
          {" "}
          <h1 className="text-2xl font-bold tracking-tight">
            Blogs and Articles
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage all your blog posts and articles.
          </p>
        </span>
      </div>
      <section className={"py-16"}>
        <div className="container mx-auto flex flex-col items-center gap-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </section>
    </Main>
  )
}

export default page
