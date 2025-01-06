"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle form submission
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div>
      <PageHeader
        title="Apply Online"
        description="Take the next step in your nursing career in Saudi Arabia"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" required />
          </div>

          <div className="space-y-4">
            <Label htmlFor="position">Position</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="icu">ICU Nurse</SelectItem>
                <SelectItem value="er">ER Nurse</SelectItem>
                <SelectItem value="pediatric">Pediatric Nurse</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label htmlFor="experience">Years of Experience</Label>
            <Select>
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
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" rows={4} />
          </div>

          <div className="space-y-4">
            <Label htmlFor="resume">Resume</Label>
            <Input id="resume" type="file" accept=".pdf,.doc,.docx" required />
            <p className="text-sm text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </div>
  )
}