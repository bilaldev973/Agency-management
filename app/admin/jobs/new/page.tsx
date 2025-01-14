"use client";
import { Suspense } from "react"; // Import Suspense
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export default function NewJobPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isAdmin) {
      toast({
        title: "Unauthorized",
        description: "Only admins can post jobs",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title"),
      location: formData.get("location"),
      hospital: formData.get("hospital"),
      type: formData.get("type"),
      description: formData.get("description"),
      requirements: formData.get("requirements")?.toString().split("\n").filter(Boolean),
      responsibilities: formData.get("responsibilities")?.toString().split("\n").filter(Boolean),
      benefits: formData.get("benefits")?.toString().split("\n").filter(Boolean),
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job posted successfully",
        });
        router.push("/jobs");
        router.refresh();
      } else {
        throw new Error("Failed to create job");
      }
    } catch (error) {
      console.error("Failed to create job:", error);
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-center">Unauthorized Access</h1>
        <p className="text-center mt-4">You must be an admin to access this page.</p>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with Suspense */}
      <div>
        <PageHeader title="Post New Job" description="Create a new job listing" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="hospital">Hospital</Label>
              <Input id="hospital" name="hospital" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="type">Job Type</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label htmlFor="description">Job Description</Label>
              <Textarea id="description" name="description" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea id="requirements" name="requirements" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
              <Textarea id="responsibilities" name="responsibilities" required />
            </div>

            <div className="space-y-4">
              <Label htmlFor="benefits">Benefits (one per line)</Label>
              <Textarea id="benefits" name="benefits" required />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
