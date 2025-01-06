"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  location: string
  hospital: string
  type: string
  description: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isAdmin } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs...');
        const response = await fetch('/api/jobs')
        const data = await response.json()
        
        if (response.ok) {
          console.log('Jobs fetched successfully:', data.jobs);
          setJobs(data.jobs || [])
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

  const handleDeleteJob = async (id: string) => {
    if (!isAdmin) return;
    
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch('/api/jobs', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setJobs(jobs.filter(job => job.id !== id));
          toast({
            title: "Success",
            description: "Job deleted successfully",
          })
        } else {
          throw new Error('Failed to delete job')
        }
      } catch (error) {
        console.error('Failed to delete job:', error);
        toast({
          title: "Error",
          description: "Failed to delete job. Please try again.",
          variant: "destructive"
        })
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">Loading jobs...</div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Find Jobs" 
        description="Explore nursing opportunities across Saudi Arabia's leading healthcare institutions."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isAdmin && (
          <div className="mb-8">
            <Link href="/admin/jobs/new">
              <Button>Post New Job</Button>
            </Link>
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No jobs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard 
                key={job.id} 
                {...job} 
                onDelete={isAdmin ? () => handleDeleteJob(job.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}