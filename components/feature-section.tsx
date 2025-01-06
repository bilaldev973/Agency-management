import { Heart, Users, Building2, Award } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Quality Healthcare",
    description: "Connecting skilled nurses with leading healthcare institutions."
  },
  {
    icon: Users,
    title: "Expert Placement",
    description: "Personalized recruitment process for the perfect match."
  },
  {
    icon: Building2,
    title: "Top Institutions",
    description: "Partnerships with Saudi Arabia's premier hospitals."
  },
  {
    icon: Award,
    title: "Career Growth",
    description: "Opportunities for professional development and advancement."
  }
]

export function FeatureSection() {
  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're dedicated to connecting talented nursing professionals with the best healthcare institutions in Saudi Arabia.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}