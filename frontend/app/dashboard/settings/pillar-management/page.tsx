import { Main } from "@/components/layout/main"

export default function Page() {
  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            {" "}
            <h1 className="text-2xl font-bold tracking-tight">
              Pillar Management
            </h1>
            <p className="text-sm text-muted-foreground">
              Organize the content pillars that power your calendar and
              automation.
            </p>
          </span>

          {/* <div className="flex items-center space-x-2">
              <Button variant={"ghost"}>Mark all as read</Button>
            </div> */}
        </div>
      </Main>
    </>
  )
}
