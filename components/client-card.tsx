import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface ClientCardProps {
  name: string
  logo: string
  description: string
}

export function ClientCard({ name, logo, description }: ClientCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-32 bg-gray-100">
        <Image
          src={logo}
          alt={name}
          fill
          className="object-contain p-4"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}