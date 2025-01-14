"use client";
import { Suspense } from "react"; 
import { useInView } from "react-intersection-observer"; // Correct import
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Trophy, Target } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: achievementsRef, inView: achievementsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <PageHeader
          title="About Us"
          description="Leading healthcare recruitment agency connecting talented professionals with premier institutions across Saudi Arabia."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Mission and Vision */}
          <div
            ref={missionRef}
            className={`grid md:grid-cols-2 gap-12 items-center mb-16 ${
              missionInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            } transition-all duration-1000`}
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission & Vision</h2>
              <p className="text-gray-600 mb-4">
                Our mission is to bridge the gap between healthcare institutions and qualified nursing professionals,
                ensuring the delivery of exceptional healthcare services across Saudi Arabia.
              </p>
              <p className="text-gray-600">
                We envision being the most trusted healthcare recruitment partner in the region,
                known for our commitment to excellence and professional standards.
              </p>
            </div>
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
                alt="Healthcare professionals"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Values */}
          <div
            ref={valuesRef}
            className={`mb-16 ${
              valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            } transition-all duration-1000`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
                icon: Heart,
                title: "Care",
                description: "We prioritize the well-being of healthcare professionals and patients alike",
              }, {
                icon: Users,
                title: "Collaboration",
                description: "Working together to achieve the best outcomes for all stakeholders",
              }, {
                icon: Trophy,
                title: "Excellence",
                description: "Maintaining the highest standards in recruitment and placement",
              }, {
                icon: Target,
                title: "Integrity",
                description: "Operating with transparency and ethical principles",
              }].map((value, index) => (
                <Card
                  key={index}
                  className="transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  <CardHeader>
                    <value.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div
            ref={achievementsRef}
            className={`text-center ${
              achievementsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
            } transition-all duration-1000`}
          >
            <h2 className="text-3xl font-bold mb-8">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Successful Placements</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Partner Hospitals</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
