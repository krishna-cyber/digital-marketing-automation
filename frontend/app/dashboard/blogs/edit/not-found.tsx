import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <Empty className="bg">
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <Button
            variant="link"
            render={
              <Link href="/dashboard/blogs">
                Go to Blogs <ArrowUpRightIcon />
              </Link>
            }
            className="text-muted-foreground"
          />
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFound
