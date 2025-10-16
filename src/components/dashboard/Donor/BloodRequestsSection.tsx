/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock,  CheckCircle, Loader2 } from "lucide-react"
import { useGetRequestsForDonorQuery, useAcceptBloodRequestMutation } from "@/redux/features/bloodRequest/requestApi"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const BloodRequestsSection = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: undefined,
    urgency: undefined
  })

  // Fetch donor requests from backend
  const { data: requestsData, isLoading, isError, refetch } = useGetRequestsForDonorQuery(filters)
  
  // Accept blood request mutation
  const [acceptRequest, { isLoading: isAccepting }] = useAcceptBloodRequestMutation()

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await acceptRequest(requestId).unwrap()
      // Success feedback
      toast.success('Request accepted successfully!')
      refetch()
    } catch (error: any) {
      // Error feedback
      toast.error(error?.data?.message || 'Failed to accept request')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
        return 'destructive'
      case 'Urgent':
        return 'default'
      default:
        return 'secondary'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading requests...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load blood requests</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  const requests = requestsData?.data || []

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">
            {requests.length > 0 
              ? `${requests.length} people need your help` 
              : 'No pending requests at the moment'}
          </p>
        </div>
      
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No blood requests available</p>
            <p className="text-sm text-muted-foreground mt-2">Check back later for new requests</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request: any) => (
            <Card key={request._id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {request.requestId}
                      </Badge>
                      <Badge
                        variant={getUrgencyColor(request.urgency)}
                        className={request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                      >
                        {request.urgency}
                      </Badge>
                      <Badge 
                        variant={
                          request.status === 'Pending' ? 'outline' :
                          request.status === 'Accepted' ? 'default' :
                          request.status === 'Completed' ? 'secondary' :
                          'destructive'
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-semibold text-base md:text-lg">{request.patientName}</h3>
                      <p className="text-muted-foreground text-sm">
                        {request.medicalCondition} • Age: {request.patientAge}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <span className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {request.hospital}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {formatDate(request.neededDate)} at {request.neededTime}
                      </span>
                      <span className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {request.contactPhone}
                      </span>
                    </div>

                    {request.additionalNotes && (
                      <p className="text-sm text-muted-foreground italic">
                        Note: {request.additionalNotes}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-3">
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                      >
                        {request.donorId?.bloodGroup || 'N/A'}
                      </Badge>
                      <div className="text-sm mt-1">
                        <p className="font-medium">{request.unitsNeeded} units needed</p>
                      </div>
                    </div>
                    
                    {request.status === 'Pending' && (
                      <div className="flex flex-col space-y-2 min-w-[120px]">
                        <Button 
                          className="w-full bg-green-500 hover:bg-green-600 text-sm"
                          onClick={() => handleAcceptRequest(request._id)}
                          disabled={isAccepting}
                        >
                          {isAccepting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="mr-2 h-4 w-4" />
                          )}
                          Accept Request
                        </Button>
                        <div className="flex space-x-1">
                          <Button
                              onClick={() => navigate(`/dashboard/donor/request-details/${request._id}`)}

                           size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                            View Details
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs bg-transparent"
                            onClick={() => window.open(`tel:${request.contactPhone}`)}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {request.status === 'Accepted' && (
                      <div className="flex flex-col space-y-2 min-w-[120px]">
                        <Badge variant="default" className="w-full justify-center py-2">
                          Request Accepted
                        </Badge>
                        <Badge
                          
                          variant="outline" 
                          className="text-xs w-full"
                  
                        >
                          <Phone className="mr-1 h-3 w-3" />
                           {request.contactPhone}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {requestsData?.meta && requestsData.meta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({...filters, page: Math.max(1, filters.page - 1)})}
            disabled={filters.page === 1}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {filters.page} of {requestsData.meta.totalPage}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters({...filters, page: Math.min(requestsData.meta.totalPage, filters.page + 1)})}
            disabled={filters.page === requestsData.meta.totalPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default BloodRequestsSection