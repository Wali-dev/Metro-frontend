
"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ModeToggle } from "./ui/modetoggle"

import { usePathname } from 'next/navigation';

function getLastSegmentCapitalized(path: string): string {
  if (!path) return ""
  const segments = path.split("/")
  const last = segments[segments.length - 1] || "" // get last part
  if (!last) return ""
  return last.charAt(0).toUpperCase() + last.slice(1)
}

export function SiteHeader() {

  const path = usePathname();

  const Header = getLastSegmentCapitalized(path)



  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{Header}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
