
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   AlertCircle,
//   MessageSquare,

//   Filter,

//   Edit,
 
//   Eye,
// } from "lucide-react";
// import {  recentRequests, systemStats } from "@/lib/dashboard/admin/adminData";
// const RequestManagementSection = () => {
// 	  return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
//             Blood Request Management
//           </h2>
//           <p className="text-muted-foreground">
//             Monitor and manage all blood donation requests
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
//           <Input placeholder="Search requests..." className="md:w-64" />
//           <Button variant="outline" size="sm" className="bg-transparent">
//             <Filter className="mr-2 h-4 w-4" />
//             Filter by Status
//           </Button>
//           <Button size="sm" className="bg-red-500 hover:bg-red-600">
//             <AlertCircle className="mr-2 h-4 w-4" />
//             Emergency Alert
//           </Button>
//         </div>
//       </div>

//       {/* Request Stats */}
//       <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
//         <Card className="border-0 shadow-md">
//           <CardContent className="p-3 md:p-4 text-center">
//             <div className="text-xl md:text-2xl font-bold text-orange-600">
//               {systemStats.activeRequests}
//             </div>
//             <div className="text-xs md:text-sm text-muted-foreground">
//               Pending Requests
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-md">
//           <CardContent className="p-3 md:p-4 text-center">
//             <div className="text-xl md:text-2xl font-bold text-green-600">
//               {systemStats.completedRequests}
//             </div>
//             <div className="text-xs md:text-sm text-muted-foreground">
//               Completed
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-md">
//           <CardContent className="p-3 md:p-4 text-center">
//             <div className="text-xl md:text-2xl font-bold text-red-600">12</div>
//             <div className="text-xs md:text-sm text-muted-foreground">
//               Critical
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-md">
//           <CardContent className="p-3 md:p-4 text-center">
//             <div className="text-xl md:text-2xl font-bold text-blue-600">
//               {systemStats.responseRate}
//             </div>
//             <div className="text-xs md:text-sm text-muted-foreground">
//               Success Rate
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Requests List */}
//       <Card className="border-0 shadow-lg">
//         <CardHeader>
//           <CardTitle>Recent Blood Requests</CardTitle>
//           <CardDescription>
//             All blood donation requests with current status
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {recentRequests.map((request, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
//               >
//                 <div className="flex items-center space-x-4">
//                   <Badge
//                     variant="outline"
//                     className="text-red-600 border-red-300 bg-red-50 font-bold text-lg px-3 py-1"
//                   >
//                     {request.bloodType}
//                   </Badge>
//                   <div className="space-y-1">
//                     <div className="flex items-center space-x-2">
//                       <h3 className="font-semibold">{request.patient}</h3>
//                       <Badge
//                         variant={
//                           request.urgency === "Critical"
//                             ? "destructive"
//                             : request.urgency === "Urgent"
//                             ? "default"
//                             : "secondary"
//                         }
//                         className={
//                           request.urgency === "Urgent"
//                             ? "bg-orange-500 hover:bg-orange-600"
//                             : ""
//                         }
//                       >
//                         {request.urgency}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       Requester: {request.requester}
//                     </p>
//                     <div className="flex items-center space-x-4 text-sm">
//                       <span>ID: {request.id}</span>
//                       <span>Hospital: {request.hospital}</span>
//                       <span>Units: {request.unitsNeeded}</span>
//                       <span>Date: {request.requestDate}</span>
//                     </div>
//                     {request.assignedDonor && (
//                       <p className="text-sm text-green-600">
//                         Assigned to: {request.assignedDonor}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Badge
//                     variant={
//                       request.status === "Completed"
//                         ? "default"
//                         : request.status === "Assigned"
//                         ? "secondary"
//                         : "outline"
//                     }
//                     className={
//                       request.status === "Completed"
//                         ? "bg-green-500 hover:bg-green-600"
//                         : request.status === "Assigned"
//                         ? "bg-blue-500 hover:bg-blue-600"
//                         : "border-orange-300 text-orange-700"
//                     }
//                   >
//                     {request.status}
//                   </Badge>
//                   <div className="flex space-x-1">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="bg-transparent"
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="bg-transparent"
//                     >
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="bg-transparent"
//                     >
//                       <MessageSquare className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between items-center mt-6">
//             <p className="text-sm text-muted-foreground">
//               Showing 3 of{" "}
//               {systemStats.activeRequests + systemStats.completedRequests}{" "}
//               requests
//             </p>
//             <div className="flex space-x-2">
//               <Button variant="outline" size="sm" className="bg-transparent">
//                 Previous
//               </Button>
//               <Button variant="outline" size="sm" className="bg-transparent">
//                 Next
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default RequestManagementSection;
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  MessageSquare,
  Filter,
  Edit,
  Eye,
} from "lucide-react";
import { recentRequests, systemStats } from "@/lib/dashboard/admin/adminData";

const RequestManagementSection = () => {
  // স্ট্যাটাসের ওপর ভিত্তি করে ব্যাজের স্টাইল নির্ধারণ করার জন্য একটি হেল্পার ফাংশন
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pending":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 overflow-hidden">
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Blood Request Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Monitor and manage all blood donation requests
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            placeholder="Search requests..."
            className="w-full sm:w-auto flex-grow"
          />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 w-full">
              <AlertCircle className="mr-2 h-4 w-4" />
              Emergency Alert
            </Button>
          </div>
        </div>
      </div>

      {/* অনুরোধের পরিসংখ্যান */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {systemStats.activeRequests}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {systemStats.completedRequests}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {systemStats.responseRate}
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* অনুরোধের তালিকা */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Blood Requests</CardTitle>
          <CardDescription>
            All blood donation requests with current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-200 bg-red-50 font-bold text-base h-10 w-16 sm:h-12 sm:w-20 flex items-center justify-center flex-shrink-0"
                  >
                    {request.bloodType}
                  </Badge>
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                      <h3 className="font-semibold text-base truncate">{request.patient}</h3>
                      <Badge
                        variant={request.urgency === "Critical" ? "destructive" : "default"}
                        className={`text-xs ${
                          request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""
                        }`}
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Requester: {request.requester}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>ID: {request.id}</span>
                      <span className="truncate">Hospital: {request.hospital}</span>
                      <span>Units: {request.unitsNeeded}</span>
                      <span>Date: {request.requestDate}</span>
                    </div>
                    {request.assignedDonor && (
                      <p className="text-sm text-green-600 font-medium truncate">
                        Assigned to: {request.assignedDonor}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-end md:justify-start gap-2 flex-shrink-0">
                  <Badge className={getStatusBadgeClass(request.status)}>
                    {request.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* পেজিনেশন */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing 3 of {systemStats.activeRequests + systemStats.completedRequests} requests
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestManagementSection;