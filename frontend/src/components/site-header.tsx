import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { capitalizeWords } from "@/lib/utils"

export function SiteHeader({activeModule}: {activeModule: string}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-1.5 md:px-2.5 lg:gap-2 lg:px-4 py-2">
        <SidebarTrigger className="" />
        <Separator
          orientation="vertical"
          className=" data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-semibold">{capitalizeWords(activeModule == 'g' ? 'dashboard' : activeModule)}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
              GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
