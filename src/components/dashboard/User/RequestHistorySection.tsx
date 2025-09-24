import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { userRequestHistory } from "@/lib/dashboard/user/userData";
import { Calendar, CheckCircle, Droplets, Filter, MapPin, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const RequestHistorySection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Request History</h2>
          <p className="text-muted-foreground">Track all your blood donation requests</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {userRequestHistory.map((request, i) => (
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
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <span className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {request.hospital}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        Requested: {request.requestDate}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Completed: {request.completedDate}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
                      <span className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        Donor: {request.donorMatched}
                      </span>
                      <span className="flex items-center">
                        <Droplets className="mr-2 h-4 w-4 text-red-500" />
                        {request.unitsNeeded} units received
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <Badge
                    variant="outline"
                    className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                  >
                    {request.bloodType}
                  </Badge>
                  <div className="flex flex-col md:flex-row lg:flex-col space-y-2 md:space-y-0 md:space-x-2 lg:space-x-0 lg:space-y-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Thank Donor
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

export default RequestHistorySection;