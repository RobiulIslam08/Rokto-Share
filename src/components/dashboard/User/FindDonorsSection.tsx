
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {

  Search,

  MapPin,
  Phone,

  Clock,
 
  Filter,
  Star,
  CheckCircle,
 
} from "lucide-react"
import { availableDonors } from "@/lib/dashboard/user/userData"
const FindDonorsSection = () => {
	 return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find Blood Donors</h2>
          <p className="text-muted-foreground">Search for available donors in your area</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input placeholder="Search by location..." className="md:w-64" />
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="p-2 border rounded-lg text-sm">
              <option>All Blood Types</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
            <select className="p-2 border rounded-lg text-sm">
              <option>Distance</option>
              <option>Within 5km</option>
              <option>Within 10km</option>
              <option>Within 20km</option>
            </select>
            <select className="p-2 border rounded-lg text-sm">
              <option>Availability</option>
              <option>Available Now</option>
              <option>Available This Week</option>
            </select>
            <Button className="bg-red-500 hover:bg-red-600">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donors List */}
      <div className="grid gap-4">
        {availableDonors.map((donor, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4 flex-1">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16 ring-2 ring-red-100 mx-auto md:mx-0">
                    <AvatarFallback className="bg-red-500 text-white text-sm md:text-lg font-semibold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <h3 className="font-semibold text-base md:text-lg">{donor.name}</h3>
                        {donor.isVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center justify-center md:justify-start">
                          <MapPin className="mr-1 h-3 w-3" />
                          {donor.location}
                        </span>
                        <span className="flex items-center justify-center md:justify-start">
                          <Clock className="mr-1 h-3 w-3" />
                          {donor.distance} away
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <div className="flex items-center justify-center md:justify-start space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{donor.rating}</span>
                      </div>
                      <span>{donor.totalDonations} donations</span>
                      <span>Last: {donor.lastDonation}</span>
                      <span>Prefers: {donor.preferredTime}</span>
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <Badge
                    variant="outline"
                    className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                  >
                    {donor.bloodType}
                  </Badge>
                  <div className="flex flex-col space-y-2 min-w-[120px]">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Donor
                    </Button>
                    <Button variant="outline" className="w-full text-xs bg-transparent">
                      View Profile
                    </Button>
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

export default FindDonorsSection;