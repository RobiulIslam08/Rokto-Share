

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
    <div className="space-y-6 overflow-hidden">
      {/* হেডার সেকশন */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Donor Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage blood donors and their donation history
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            placeholder="Search donors..."
            className="w-full sm:w-auto flex-grow"
          />
          <div className="flex w-full sm:w-auto items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent w-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 w-full">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* ডোনার পরিসংখ্যান */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {systemStats.totalDonors}
            </div>
            <p className="text-sm text-muted-foreground">Total Donors</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1,234</div>
            <p className="text-sm text-muted-foreground">Active Donors</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {systemStats.totalDonations}
            </div>
            <p className="text-sm text-muted-foreground">Total Donations</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* ডোনার তালিকা */}
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
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-3 sm:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-red-200">
                    <AvatarFallback className="bg-red-500 text-white font-semibold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {/* মূল সমাধান: min-w-0 টেক্সটকে র‍্যাপ হতে সাহায্য করে এবং ওভারফ্লো আটকায় */}
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
                      <h3 className="font-semibold text-base truncate">{donor.name}</h3>
                      {donor.verified && (
                        <Badge variant="outline" className="text-green-800 border-green-200 bg-green-100 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {donor.donations >= 15 && (
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          Hero
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {donor.email}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span>ID: {donor.id}</span>
                      <span>Blood: <span className="font-bold text-red-600">{donor.bloodType}</span></span>
                      <span>Donations: {donor.donations}</span>
                      <span>Rating: {donor.rating}⭐</span>
                      <span>Last: {donor.lastDonation}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end md:justify-start gap-2 flex-shrink-0">
                  <Badge
                    variant={donor.status === "Active" ? "default" : "secondary"}
                    className={
                      donor.status === "Active"
                        ? "bg-green-100 text-green-800 border border-green-200"
                         : "bg-gray-100 text-gray-800 border border-gray-200"
                    }
                  >
                    {donor.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-transparent h-8 w-8">
                      <Award className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* পেজিনেশন */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
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