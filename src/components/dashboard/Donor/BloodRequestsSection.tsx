
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import {
  MapPin,
  Phone,
  Clock,

  Filter,
  CheckCircle,

} from "lucide-react"
import { incomingRequests } from "@/lib/dashboard/donor/donorData";
const BloodRequestsSection = () => {
 return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">People who need your help</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Distance
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Clock className="mr-2 h-4 w-4" />
            Sort by Urgency
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {incomingRequests.map((request, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {request.id}
                    </Badge>
                    <Badge
                      variant={
                        request.urgency === "Critical"
                          ? "destructive"
                          : request.urgency === "Urgent"
                            ? "default"
                            : "secondary"
                      }
                      className={request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      {request.urgency}
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">
                      {request.distance} away
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{request.patient}</h3>
                    <p className="text-muted-foreground text-sm">{request.condition}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {request.hospital}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {request.requestTime}
                    </span>
                    <span className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {request.requesterPhone}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-3">
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                    >
                      {request.bloodType}
                    </Badge>
                    <div className="text-sm mt-1">
                      <p className="font-medium">{request.unitsNeeded} units needed</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 min-w-[120px]">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Request
                    </Button>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

export default BloodRequestsSection;