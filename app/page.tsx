import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { ContactInfo } from "@/components/contact-info"

// Featured jobs (subset of all jobs)
const featuredJobs = [
  {
    id: "1",
    title: "ICU Nurse",
    location: "Riyadh",
    hospital: "King Faisal Specialist Hospital",
    type: "Full-time",
    description: "Seeking experienced ICU nurses for a leading hospital in Riyadh."
  },
  {
    id: "2",
    title: "Head Nurse",
    location: "Jeddah",
    hospital: "Dr. Soliman Fakeeh Hospital",
    type: "Full-time",
    description: "Leadership position for an experienced head nurse."
  },
  {
    id: "3",
    title: "Pediatric Nurse",
    location: "Dammam",
    hospital: "Saudi German Hospital",
    type: "Full-time",
    description: "Join a prestigious children's hospital."
  }
]

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />

      {/* Featured Jobs Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Positions</h2>
            <div className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest nursing opportunities at Saudi Arabia&apos;s leading healthcare institutions.
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
          <div className="text-center">
            <Link href="/jobs">
              <Button size="lg">View All Positions</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <div className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our opportunities? Contact us today.
            </div>
          </div>
          <div className="max-w-lg mx-auto">
            <ContactInfo />
            <div className="mt-8 text-center">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}