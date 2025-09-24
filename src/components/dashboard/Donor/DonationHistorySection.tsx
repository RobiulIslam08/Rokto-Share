import { Star ,  Filter, Award, Calendar, Droplets, CheckCircle,} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { donationHistory, donorData } from "@/lib/dashboard/donor/donorData";

const DonationHistorySection = () => {
	 return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Donation History</h2>
          <p className="text-muted-foreground">Your life-saving contributions</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Award className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">{donorData.totalDonations}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Donations</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">{donorData.livesImpacted}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Lives Impacted</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{donorData.rating}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600">4</div>
            <div className="text-xs md:text-sm text-muted-foreground">Years Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History List */}
      <div className="grid gap-4">
        {donationHistory.map((donation, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4 flex-1">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16 ring-2 ring-green-100 mx-auto md:mx-0">
                    <AvatarFallback className="bg-green-500 text-white text-sm md:text-lg font-semibold">
                      {donation.recipient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <h3 className="font-semibold text-base md:text-lg">{donation.recipient}</h3>
                        <Badge variant="outline" className="text-xs font-mono">
                          {donation.id}
                        </Badge>
                        <Badge
                          variant={
                            donation.urgency === "Critical"
                              ? "destructive"
                              : donation.urgency === "Urgent"
                                ? "default"
                                : "secondary"
                          }
                          className={donation.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                          {donation.urgency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{donation.hospital}</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <span className="flex items-center justify-center md:justify-start">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {donation.date}
                      </span>
                      <span className="flex items-center justify-center md:justify-start">
                        <Droplets className="mr-2 h-4 w-4 text-red-500" />
                        {donation.units} unit(s) donated
                      </span>
                      <Badge className="bg-green-500 hover:bg-green-600 mx-auto md:mx-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donation.status}
                      </Badge>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 italic">"{donation.feedback}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    View Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

export default DonationHistorySection;