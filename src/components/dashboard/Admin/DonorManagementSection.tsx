import { Button } from "@/components/ui/button";
import { recentDonors, systemStats } from "@/lib/dashboard/admin/adminData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,

  Filter,
  CheckCircle,
  Award,
  Download,
 
  Eye,
} from "lucide-react";
const DonorManagementSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Donor Management
          </h2>
          <p className="text-muted-foreground">
            Manage blood donors and their donation history
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input placeholder="Search donors..." className="md:w-64" />
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Donor Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">
              {systemStats.totalDonors}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Total Donors
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              1,234
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Active Donors
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {systemStats.totalDonations}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Total Donations
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600">
              4.8
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Avg Rating
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donors List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Active Donors</CardTitle>
          <CardDescription>
            Registered blood donors and their contribution history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDonors.map((donor, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-red-200">
                    <AvatarFallback className="bg-red-500 text-white font-semibold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{donor.name}</h3>
                      {donor.verified && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {donor.donations >= 15 && (
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                          <Award className="w-3 h-3 mr-1" />
                          Hero
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {donor.email}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>ID: {donor.id}</span>
                      <span>Blood: {donor.bloodType}</span>
                      <span>Donations: {donor.donations}</span>
                      <span>Rating: {donor.rating}⭐</span>
                      <span>Last: {donor.lastDonation}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      donor.status === "Active" ? "default" : "secondary"
                    }
                    className={
                      donor.status === "Active"
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }
                  >
                    {donor.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                    >
                      <Award className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              Showing 3 of {systemStats.totalDonors} donors
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

export default DonorManagementSection;