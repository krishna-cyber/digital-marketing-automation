import { ArrowRight } from "lucide-react"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"

const post = {
  id: 1,
  title: "Understanding React Hooks",
  url: "/understanding-react-hooks",
  image: "/logo.jpeg",
  author: "John Doe",
  published: "2023-01-01",
  summary:
    "Learn how to use React Hooks to simplify your functional components.",
}

const BlogCard = () => {
  return (
    <Card
      key={post.id}
      className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
    >
      <div className="aspect-video w-full">
        <a
          href={post.url}
          target="_blank"
          className="transition-opacity duration-200 fade-in hover:opacity-70"
        >
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover object-center"
          />
        </a>
      </div>
      <CardHeader>
        <h3 className="text-xl hover:underline md:text-xl">
          <a href={post.url} target="_blank">
            {post.title}
          </a>
        </h3>
        <p className="mt-2 text-sm font-semibold text-foreground/80">
          {post.author} · {post.published}
        </p>
      </CardHeader>
      <CardContent>
        <p className="leading-relaxed text-muted-foreground">{post.summary}</p>
      </CardContent>
      <CardFooter>
        <a
          href={post.url}
          target="_blank"
          className="flex items-center text-muted-foreground hover:underline"
        >
          Read more
          <ArrowRight className="ml-1 size-4" />
        </a>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
