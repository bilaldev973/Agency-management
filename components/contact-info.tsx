import { Mail, Phone, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Phone className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Phone</p>
          <p className="text-gray-600">+966 12 345 6789</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Email</p>
          <p className="text-gray-600">contact@nursehiring.sa</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Address</p>
          <p className="text-gray-600">King Fahd Road, Riyadh 12343, Saudi Arabia</p>
        </div>
      </div>
    </div>
  )
}