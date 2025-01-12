"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { log } from "node:console"

interface Props {
  params: {
    id: string
  }
}

interface Job {
  id: string
  title: string
  hospital: string
  location: string
}

export default function JobApplicationPage({ params }: Props) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [job, setJob] = useState<Job | null>(null)

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
      }
    }

    fetchJob()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log(new FormData(e.currentTarget),"in try 1 line");
      
      const formData = new FormData(e.currentTarget)
      formData.append('jobId', params.id)
      formData.append('jobTitle', job?.title || '')

      console.log(formData,"bilal here");
      
      const response = await fetch('/api/applications', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      })

      router.push('/jobs')
    } catch (error) {
      console.error('Application submission error:', error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!job) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title={`Apply for ${job.title}`}
        description={`${job.hospital} • ${job.location}`}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select name="experience" required>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="department">Preferred Department</Label>
            <Select name="department" required>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="CCU">CCU</SelectItem>
                <SelectItem value="cathlab">Cath Lab</SelectItem>
                <SelectItem value="OT">Operation Theater</SelectItem>
                <SelectItem value="ER">ER</SelectItem>         
                <SelectItem value="NICU">NICU</SelectItem>
                <SelectItem value="PEDIATRIC CARDIAC ICU">Pediatric Cardiac ICU</SelectItem>
                <SelectItem value="PICU">PICU</SelectItem>
                <SelectItem value="IVF NURSE">IVF Nurse</SelectItem>
                <SelectItem value="ONCOLOGY NURSE">Oncology Nurse</SelectItem>
                <SelectItem value="MEDICAL WARD">Medical ward</SelectItem>
                <SelectItem value="SURGICAL WARD">Surgical Ward</SelectItem>
                <SelectItem value="HEMODIALYSIS NURSE">Hemodialysis Nurse</SelectItem>
                <SelectItem value="PEDIATRIC HIGH DEPENDENCY">Pediatric High Dependency</SelectItem>
                <SelectItem value="CHILD & ABOLESCENT HEALTH">Child & Adolescent Mental Health</SelectItem>
                <SelectItem value="NEURO SCIENCE ICU">Neuro Science ICU</SelectItem>
                <SelectItem value="OBS GYNE">OBS Gyne</SelectItem>
                <SelectItem value="LABOUR ROOM">Labour Room</SelectItem>
                <SelectItem value="IPD NURSE">IPD Nurse</SelectItem>
                <SelectItem value="DENTAL/PACU">Dental / PACU</SelectItem>
                <SelectItem value="VIP TRAUMA CENTER">VIP Trauma Center</SelectItem>
                <SelectItem value="RESPIRATORY THERAPIST NURSE">Respiratory Therapist Nurse</SelectItem>
                <SelectItem value="TRAUMA ICU">Trauma ICU</SelectItem>
                <SelectItem value="ENDOSCOPY NURSE">Endoscopy Nurse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="resume">Resume/CV</Label>
            <Input 
              id="resume" 
              name="resume" 
              type="file" 
              accept=".pdf,.doc,.docx" 
              required 
            />
            <p className="text-sm text-gray-500">
              Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
            <Textarea 
              id="coverLetter" 
              name="coverLetter" 
              rows={6}
              placeholder="Tell us why you're interested in this position and what makes you a great candidate."
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  )
}