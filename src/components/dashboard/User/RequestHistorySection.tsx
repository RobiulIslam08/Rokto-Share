/* eslint-disable @typescript-eslint/no-explicit-any */
// RequestHistorySection.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Droplets,
  Filter,
  MapPin,
  Plus,
  User,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  useCancelBloodRequestMutation,
  useGetMyBloodRequestsQuery,
} from "@/redux/features/bloodRequest/requestApi";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const RequestHistorySection = () => {
    const navigate = useNavigate();
  const { data, isLoading, isError } = useGetMyBloodRequestsQuery({
    page: 1,
    limit: 10,
  });
  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelBloodRequestMutation();
  const handleCancelRequest = async (id: string) => {
    try {
      await cancelRequest(id).unwrap();
      // You can add a success notification (toast) here if you like
      toast.success("Request cancelled successfully!");
    } catch (err) {
      console.error("Failed to cancel the request:", err);
      toast.error("Failed to cancel the request");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading requests!
      </div>
    );
  }

  const requests = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            My Request History
          </h2>
          <p className="text-muted-foreground">
            Track all your blood donation requests
          </p>
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

      {requests.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-10 text-center">
            <p className="text-muted-foreground">No blood requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request: any) => (
            <Card
              key={request._id}
              className="hover:shadow-lg transition-shadow border-0 shadow-md"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {request.requestId}
                      </Badge>
                      <Badge
                        variant={
                          request.urgency === "Critical"
                            ? "destructive"
                            : request.urgency === "Urgent"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          request.urgency === "Urgent"
                            ? "bg-orange-500 hover:bg-orange-600"
                            : ""
                        }
                      >
                        {request.urgency}
                      </Badge>
                      <Badge
                        className={
                          request.status === "Completed"
                            ? "bg-green-500 hover:bg-green-600"
                            : request.status === "Accepted"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : request.status === "Rejected"
                            ? "bg-red-500 hover:bg-red-600"
                            : request.status === "Cancelled"
                            ? "bg-gray-500 hover:bg-gray-600"
                            : "bg-yellow-500 hover:bg-yellow-600"
                        }
                      >
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
                          Needed:{" "}
                          {format(new Date(request.neededDate), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {request.neededTime}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
                        <span className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-muted-foreground" />
                          Donor: {request.donorId?.user?.name || "N/A"}
                        </span>
                        <span className="flex items-center">
                          <Droplets className="mr-2 h-4 w-4 text-red-500" />
                          {request.unitsNeeded} units needed
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>
                          <strong>Patient:</strong> {request.patientName} (
                          {request.patientAge} years)
                        </p>
                        <p>
                          <strong>Condition:</strong> {request.medicalCondition}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                    <Badge
                      variant="outline"
                      className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                    >
                      {request.donorId?.bloodGroup || "N/A"}
                    </Badge>
                    <div className="flex flex-col md:flex-row lg:flex-col space-y-2 md:space-y-0 md:space-x-2 lg:space-x-0 lg:space-y-2">
                      <Button
                       onClick={() => navigate(`/dashboard/request-details/${request._id}`)}
                        size="sm"
                        variant="outline"
                        className="text-xs bg-transparent"
                      >
                        View Details
                      </Button>
                      {request.status === "Pending" && (
                        <Button
                          onClick={() => handleCancelRequest(request._id)}
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent text-red-500"
                        >
                          {isCancelling ? "Cancelling..." : "Cancel Request"}
                        </Button>
                      )}
                      {request.status === "Completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs bg-transparent"
                        >
                          Thank Donor
                        </Button>
                      )}
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
        <div className="flex justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" disabled={data.meta.page === 1}>
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm">
            Page {data.meta.page} of {data.meta.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={data.meta.page === data.meta.totalPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestHistorySection;
