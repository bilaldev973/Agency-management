import { PageHeader } from "@/components/page-header";
import { ClientCard } from "@/components/client-card";
import { Suspense } from "react"; // Import Suspense

const clients = [
  {
    name: "King Faisal Specialist Hospital",
    logo: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?auto=format&fit=crop&q=80",
    description: "Leading specialized healthcare institution in Saudi Arabia.",
  },
  {
    name: "Dr. Soliman Fakeeh Hospital",
    logo: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
    description: "Premier healthcare provider in Jeddah with state-of-the-art facilities.",
  },
  {
    name: "Saudi German Hospital",
    logo: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80",
    description: "International standard healthcare across multiple locations.",
  },
];

const testimonials = [
  {
    quote: "The quality of nursing professionals provided has been exceptional.",
    author: "Dr. Abdullah Al-Rashid",
    role: "Medical Director, King Faisal Specialist Hospital",
  },
  {
    quote: "Their recruitment process ensures we get the best talent.",
    author: "Sarah Thompson",
    role: "Head of Nursing, Dr. Soliman Fakeeh Hospital",
  },
  {
    quote: "Highly skilled and reliable nurses, always a pleasure to work with.",
    author: "Mohammed Al-Salem",
    role: "HR Director, Saudi German Hospital",
  },
];

export default function ClientsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Add Suspense boundary here */}
      <div>
        <PageHeader
          title="Our Clients"
          description="Partnering with leading healthcare institutions across Saudi Arabia"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {clients.map((client, index) => (
              <ClientCard key={index} {...client} />
            ))}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">Client Testimonials</h2>
            <div className="relative overflow-hidden">
              <div className="testimonials-wrapper">
                <div className="testimonials-content">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="testimonial-card bg-gray-50 p-6 rounded-lg text-center shadow-md mb-8"
                    >
                      <p className="text-lg italic mb-4">{testimonial.quote}</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate the testimonials to create an infinite loop */}
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="testimonial-card bg-gray-50 p-6 rounded-lg text-center shadow-md mb-8"
                    >
                      <p className="text-lg italic mb-4">{testimonial.quote}</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
