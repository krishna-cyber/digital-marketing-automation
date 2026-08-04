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
          <Button variant="link" asChild className="text-muted-foreground">
            <Link href="/dashboard/content">
              Go to Content <ArrowUpRightIcon />
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}

export default NotFound
