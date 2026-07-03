import { Main } from "@/components/layout/main"
import BrandForm from "./brand-form"
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
        </div>
        <section className={"py-4"}>
          <BrandForm />
        </section>
      </Main>
    </>
  )
}
