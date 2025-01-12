import { Mail, Phone, MapPin } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Phone className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Phone</p>
          <p className="text-gray-600">+92309-1817632</p>
          <p className="text-gray-600">+92304-9009934</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Mail className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Email</p>
          <p className="text-gray-600">hr@aasioe.com</p>
          <p className="text-gray-600">hr.umergujjar@gmail.com</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <p className="font-medium">Address</p>
          <p className="text-gray-600">Office # 2/24, 4rth Floor Silk Center Near Rehamanabad Matro Station Rawalpindi</p>
        </div>
      </div>
    </div>
  )
}