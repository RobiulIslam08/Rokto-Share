


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star,  Calendar, Droplets, CheckCircle, Loader2, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useState } from "react";
import { useGetDonorDonationHistoryQuery } from "@/redux/features/bloodRequest/requestApi";


const DonationHistorySection = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: "Completed",
  });

  const { data, isLoading, isError } = useGetDonorDonationHistoryQuery(filters);

  // Calculate statistics from actual data
  const donations = data?.data || [];
  
  const totalDonations = donations.length;
  const totalUnits = donations.reduce((sum: number, d: any) => sum + (d.unitsNeeded || 0), 0);
  const livesImpacted = totalDonations * 3; // Approximate: 1 donation can save 3 lives
  const yearsActive = donations.length > 0 
    ? new Date().getFullYear() - new Date(donations[donations.length - 1]?.createdAt).getFullYear() || 1
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Thinking donation history...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load donation history</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Donation History</h2>
          <p className="text-muted-foreground">Your life-saving contributions</p>
        </div>
        {/* <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Award className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div> */}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">{totalDonations}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Donations</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">{livesImpacted}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Lives Impacted</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{totalUnits}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Units</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600">{yearsActive}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Years Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History List */}
      {donations.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Droplets className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground text-lg">No completed donations yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start saving lives by accepting blood requests
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {donations.map((donation: any) => (
            <Card key={donation._id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4 flex-1">
                    <Avatar className="h-12 w-12 md:h-16 md:w-16 ring-2 ring-green-100 mx-auto md:mx-0">
                      <AvatarFallback className="bg-green-500 text-white text-sm md:text-lg font-semibold">
                        {donation.patientName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "??"}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-3 text-center md:text-left flex-1">
                      <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                          <h3 className="font-semibold text-base md:text-lg">
                            {donation.patientName || "Unknown Patient"}
                          </h3>
                          <Badge variant="outline" className="text-xs font-mono">
                            {donation.requestId}
                          </Badge>
                          <Badge
                            variant={
                              donation.urgency === "Critical"
                                ? "destructive"
                                : donation.urgency === "Urgent"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              donation.urgency === "Urgent"
                                ? "bg-orange-500 hover:bg-orange-600"
                                : ""
                            }
                          >
                            {donation.urgency}
                          </Badge>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mt-1">
                          <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start">
                            <MapPin className="mr-1 h-3 w-3" />
                            {donation.hospital}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Age: {donation.patientAge} • {donation.medicalCondition}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                        <span className="flex items-center justify-center md:justify-start">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {format(new Date(donation.completedAt || donation.updatedAt), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center justify-center md:justify-start">
                          <Droplets className="mr-2 h-4 w-4 text-red-500" />
                          {donation.unitsNeeded} unit(s) donated
                        </span>
                        <Badge className="bg-green-500 hover:bg-green-600 mx-auto md:mx-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {donation.status}
                        </Badge>
                      </div>

                      {/* Requester Info */}
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Requester:</span>
                          <span className="text-blue-800">
                            {donation.userId?.name || "N/A"}
                          </span>
                          {donation.userId?.phone && (
                            <span className="text-blue-600 ml-auto">
                              📞 {donation.userId.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Additional Notes if any */}
                      {donation.additionalNotes && (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700">
                            <strong>Note:</strong> {donation.additionalNotes}
                          </p>
                        </div>
                      )}

                      {/* Thank You Message */}
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 italic">
                          "Thank you for your generous donation. You've made a life-saving difference!"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                    <Badge
                      variant="outline"
                      className="text-red-500 border-red-500 text-xl md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                    >
                      {donation.donorId?.bloodGroup || "N/A"}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current"
                        />
                      ))}
                    </div>
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.meta && data.meta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters({ ...filters, page: Math.max(1, filters.page - 1) })
            }
            disabled={filters.page === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {filters.page} of {data.meta.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters({
                ...filters,
                page: Math.min(data.meta.totalPage, filters.page + 1),
              })
            }
            disabled={filters.page === data.meta.totalPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default DonationHistorySection;