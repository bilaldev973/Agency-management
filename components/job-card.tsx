import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Building2, Clock, Trash2 } from "lucide-react"

export interface JobCardProps {
  id: string
  title: string
  location: string
  hospital: string
  type: string
  description: string
  onDelete?: () => void
}

export function JobCard({ id, title, location, hospital, type, description, onDelete }: JobCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {location}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" /> {hospital}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {type}
                </div>
              </div>
            </CardDescription>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={`/jobs/${id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}