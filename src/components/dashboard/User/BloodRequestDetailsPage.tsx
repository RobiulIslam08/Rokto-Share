/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useGetSingleBloodRequestQuery,
  useCancelBloodRequestMutation,
  useCompleteBloodRequestMutation,
} from "@/redux/features/bloodRequest/requestApi";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Droplets,
  MapPin,
  Phone,
  User,
  Mail,
  AlertCircle,
  CheckCircle,
  FileText,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";


const BloodRequestDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);

  const { data, isLoading, isError } = useGetSingleBloodRequestQuery(id!);
  const [cancelRequest, { isLoading: isCancelling }] =
    useCancelBloodRequestMutation();
  const [completeRequest, { isLoading: isCompleting }] =
    useCompleteBloodRequestMutation();

  const handleCancelRequest = async () => {
    

    try {
      await cancelRequest(id!).unwrap();
      toast.success("Request cancelled successfully!");
      navigate("/dashboard/request-history");
    } catch (err: any) {
      console.error("Failed to cancel:", err);
      toast.error(err?.data?.message || "Failed to cancel the request");
    }
  };

  const handleCompleteRequest = async () => {
    

    try {
      await completeRequest(id!).unwrap();
      toast.success("Request marked as completed!");
    } catch (err: any) {
      console.error("Failed to complete:", err);
      toast.error(err?.data?.message || "Failed to complete the request");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading request details...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="container mx-auto py-10">
        <Card className="border-red-200">
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <AlertCircle className="mx-auto h-12 w-12 mb-4" />
              <p className="text-lg font-semibold">Request not found!</p>
              <Button
                onClick={() => navigate("/dashboard/request-history")}
                className="mt-4"
                variant="outline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const request = data.data;
  const isRequester = request.userId?._id === currentUser?._id;

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex gap-2">
          {isRequester && request.status === "Accepted" && (
            <Button
              onClick={handleCompleteRequest}
              disabled={isCompleting}
              size="sm"
              className="bg-green-500 hover:bg-green-600"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              {isCompleting ? "Completing..." : "Mark as Complete"}
            </Button>
          )}
          {isRequester && request.status === "Pending" && (
            <Button
              onClick={handleCancelRequest}
              disabled={isCancelling}
              size="sm"
              variant="destructive"
            >
              <XCircle className="mr-2 h-4 w-4" />
              {isCancelling ? "Cancelling..." : "Cancel Request"}
            </Button>
          )}
        </div>
      </div>

      {/* Title & Status */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Request Details</h1>
          <Badge variant="outline" className="text-sm font-mono">
            {request.requestId}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
            {request.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content - 2 columns */}
        <div className="md:col-span-2 space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="mr-2 h-5 w-5 text-red-500" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-semibold">{request.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold">{request.patientAge} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type Needed</p>
                  <Badge
                    variant="outline"
                    className="text-red-500 border-red-500 text-lg font-bold mt-1"
                  >
                    {request.donorId?.bloodGroup || "N/A"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Units Needed</p>
                  <p className="font-semibold flex items-center">
                    <Droplets className="mr-1 h-4 w-4 text-red-500" />
                    {request.unitsNeeded} units
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Medical Condition
                </p>
                <p className="text-sm bg-muted p-3 rounded-lg">
                  {request.medicalCondition}
                </p>
              </div>

              {request.additionalNotes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Additional Notes
                  </p>
                  <p className="text-sm bg-muted p-3 rounded-lg">
                    {request.additionalNotes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hospital Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="mr-2 h-5 w-5 text-red-500" />
                Hospital Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Hospital Name</p>
                <p className="font-semibold">{request.hospital}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="text-sm">{request.hospitalAddress}</p>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Needed Date</p>
                  <p className="font-semibold flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(new Date(request.neededDate), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Needed Time</p>
                  <p className="font-semibold flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {request.neededTime}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contact Phone</p>
                <p className="font-semibold flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {request.contactPhone}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Rejection Reason (if rejected) */}
          {request.status === "Rejected" && request.rejectionReason && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-red-500">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{request.rejectionReason}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Donor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="mr-2 h-5 w-5 text-red-500" />
                Donor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                  <User className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="font-semibold text-lg">
                  {request.donorId?.user?.name || "N/A"}
                </h3>
                <Badge
                  variant="outline"
                  className="text-red-500 border-red-500 text-xl font-bold mt-2"
                >
                  {request.donorId?.bloodGroup || "N/A"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="break-all">
                    {request.donorId?.user?.email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{request.donorId?.user?.phone || "N/A"}</span>
                </div>
                {request.donorId?.address && (
                  <div className="flex items-start text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{request.donorId.address}</span>
                  </div>
                )}
              </div>

              {request.status === "Completed" && (
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Thank Donor
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Request Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5 text-red-500" />
                Request Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Request Created</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(request.createdAt), "MMM dd, yyyy 'at' hh:mm a")}
                  </p>
                </div>
              </div>

              {request.status === "Accepted" && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Request Accepted</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(request.updatedAt), "MMM dd, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                </div>
              )}

              {request.status === "Completed" && request.completedAt && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Donation Completed</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(request.completedAt), "MMM dd, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                </div>
              )}

              {request.status === "Rejected" && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Request Rejected</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(request.updatedAt), "MMM dd, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                </div>
              )}

              {request.status === "Cancelled" && (
                <div className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-gray-500 mt-2 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Request Cancelled</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(request.updatedAt), "MMM dd, yyyy 'at' hh:mm a")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Requester Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="mr-2 h-5 w-5 text-red-500" />
                Requester
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{request.userId?.name || "N/A"}</p>
              </div>
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="break-all">{request.userId?.email || "N/A"}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{request.userId?.phone || "N/A"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BloodRequestDetailsPage;