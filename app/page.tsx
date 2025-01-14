"use client";

import { useEffect, useState, useRef, Suspense } from "react";  // Import Suspense from React
import Link from "next/link";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { JobCard } from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "@/components/contact-info";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface Job {
  id: string;
  title: string;
  location: string;
  hospital: string;
  type: string;
  description: string;
  createdAt: { seconds: number };
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
  );
}

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Ref for the Featured Jobs section and Contact section
  const featuredJobsRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  // State to track whether sections are in view
  const [isFeaturedJobsInView, setIsFeaturedJobsInView] = useState(false);
  const [isContactSectionInView, setIsContactSectionInView] = useState(false);

  // Intersection Observer logic
  useEffect(() => {
    const observerOptions = {
      root: null, // relative to the viewport
      threshold: 0.1, // trigger when 10% of the element is in view
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.target === featuredJobsRef.current) {
          setIsFeaturedJobsInView(entry.isIntersecting);
        }
        if (entry.target === contactSectionRef.current) {
          setIsContactSectionInView(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (featuredJobsRef.current) {
      observer.observe(featuredJobsRef.current);
    }
    if (contactSectionRef.current) {
      observer.observe(contactSectionRef.current);
    }

    return () => {
      if (featuredJobsRef.current) {
        observer.unobserve(featuredJobsRef.current);
      }
      if (contactSectionRef.current) {
        observer.unobserve(contactSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();

        if (response.ok) {
          const sortedJobs = data.jobs
            .sort((a: Job, b: Job) => b.createdAt.seconds - a.createdAt.seconds)
            .slice(0, 3);
          setFeaturedJobs(sortedJobs);
        } else {
          throw new Error(data.error || "Failed to fetch jobs");
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  return (
    <Suspense fallback={<Skeleton />}>  {/* Wrap page content in Suspense */}
      <div>
        <HeroSection />
        <FeatureSection />

        {/* Featured Jobs Section */}
        <section
          ref={featuredJobsRef}
          className={`py-24 ${isFeaturedJobsInView ? "animate-fadeIn" : ""}`}
        >
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
                featuredJobs.map((job) => <JobCard key={job.id} {...job} />)
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
        <section
          ref={contactSectionRef}
          className={`py-24 bg-gradient-to-b from-gray-50 to-white ${isContactSectionInView ? "animate-fadeIn" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title and Description */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
                Stay Connected with Us
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto sm:text-xl leading-relaxed">
                We’re here to answer all your questions about nursing opportunities. Reach out to us anytime!
              </p>
            </div>

            {/* Contact Info Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Contact Cards (Phone, Email, Address) */}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="px-12 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all duration-300"
                >
                  Contact Us Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Suspense>
  );
}
