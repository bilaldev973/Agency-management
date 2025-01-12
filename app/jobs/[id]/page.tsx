"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building2, Clock, ChevronLeft } from "lucide-react"

interface Job {
  id: string
  title: string
  location: string
  hospital: string
  type: string
  description: string
  requirements: string[]
  responsibilities: string[]
  benefits: string[]
}

export default function JobPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch('/api/jobs')
        const data = await response.json()
        
        const foundJob = data.jobs.find((j: Job) => j.id === params.id)
        
        if (foundJob) {
          setJob(foundJob)
        }
      } catch (error) {
        console.error('Failed to fetch job:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!job) {
    notFound()
  }

  return (
    <div>
      <PageHeader title={job.title} description={`${job.hospital} • ${job.location}`} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/jobs">
          <Button variant="outline" className="mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{job.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-500" />
                    <span>{job.hospital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>{job.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Link href={`/jobs/${params.id}/apply`}>
              <Button className="w-full">Apply Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}