"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavLink } from "./nav-link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col space-y-4 mt-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/jobs">Jobs</NavLink>
          <NavLink href="/apply">Apply</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/clients">Clients</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </SheetContent>
    </Sheet>
  )
}