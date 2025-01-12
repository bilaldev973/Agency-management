import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
          alt="Healthcare professionals"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your Nursing Career in Saudi Arabia Starts Here
          </h1>
          <p className="text-xl mb-8">
            Join leading healthcare institutions and advance your career with competitive packages and professional growth opportunities.
          </p>
          <div className="space-x-4">
            <Link href="/jobs">
              <Button size="lg" variant="default">
                View Open Positions
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="lg" variant="default">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}