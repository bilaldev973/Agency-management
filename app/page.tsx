"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { ContactInfo } from "@/components/contact-info"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

interface Job {
  id: string
  title: string
  location: string
  hospital: string
  type: string
  description: string
  createdAt: { seconds: number }
}

function JobCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs')
        const data = await response.json()
        
        if (response.ok) {
          // Sort jobs by creation date (newest first) and get last 3
          const sortedJobs = data.jobs
            .sort((a: Job, b: Job) => b.createdAt.seconds - a.createdAt.seconds)
            .slice(0, 3)
          setFeaturedJobs(sortedJobs)
        } else {
          throw new Error(data.error || 'Failed to fetch jobs')
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error)
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [toast])

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
            {loading ? (
              <>
                <JobCardSkeleton />
                <JobCardSkeleton />
                <JobCardSkeleton />
              </>
            ) : featuredJobs.length > 0 ? (
              featuredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-600">No jobs available at the moment.</p>
              </div>
            )}
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