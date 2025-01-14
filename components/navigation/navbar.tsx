import Link from "next/link"
// import { Stethoscope } from "lucide-react"
import { NavLink } from "./nav-link"
import { MobileNav } from "./mobile-nav"
import Image from 'next/image';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.jpg" // Update this path to match your logo file
          alt="Ashram & Son's Logo"
          width={24} // Adjust width to match your design
          height={24} // Adjust height to match your design
        />
        <div className="flex flex-col">
        <span className="font-bold text-4xl">AAS</span>
        <span className="font-bold"> International Overseas Employeement</span>
        </div>
      </Link>
          </div>
            
          <nav className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/jobs">Jobs</NavLink>
            <NavLink href="/apply">Apply Online</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/clients">Clients</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <MobileNav />
        </div>
      </div>
    </header>
  )
}