import { Main } from "@/components/layout/main"
export default function page() {
  console.log("Brand Styles page loaded")
  return (
    <>
      {/* ===== Main ===== */}
      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <span>
            {" "}
            <h1 className="text-2xl font-bold tracking-tight">Brand Styles</h1>
            <p className="text-sm text-muted-foreground">
              Customize your brand styles to match your company&apos;s identity.
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
