import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  Heart,
  Calendar,
  AlertCircle,
  Droplets,
  History,

  CheckCircle,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  donationHistory,
  donorData,
  incomingRequests,
} from "@/lib/dashboard/donor/donorData";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";
const DonorOverviewSection = () => {
  const currenUser = useAppSelector(selectCurrentUser);
    const { data: userProfileData } = useGetUserProfileQuery(undefined, {
      skip: false,
    });
  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, {currenUser?.name}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                Thank you for being a life-saving hero
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available for Donation
                </Badge>
                <Badge
                  variant="outline"
                  className="border-red-200 text-red-700"
                >
                  <Award className="w-3 h-3 mr-1" />
                  Hero Donor
                </Badge>
                    <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                >
                  <Droplets className="w-3 h-3 mr-1" />
                  Blood Type: {userProfileData?.data?.bloodGroup}
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Droplets className="h-16 w-16 md:h-24 md:w-24 text-red-500 relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Donations",
            value: donorData.totalDonations.toString(),
            change: "Since " + donorData.memberSince,
            changeType: "positive",
            icon: Droplets,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Lives Impacted",
            value: donorData.livesImpacted.toString(),
            change: "3x multiplier",
            changeType: "positive",
            icon: Heart,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
          {
            title: "Response Rate",
            value: donorData.responseRate,
            change: "Excellent",
            changeType: "positive",
            icon: TrendingUp,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Next Eligible",
            value: "May 15",
            change: "2024",
            changeType: "neutral",
            icon: Calendar,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
          },
        ].map((stat, i) => (
          <Card key={i} className="card-hover border-0 shadow-lg">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div
                  className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}
                >
                  <stat.icon
                    className={`h-4 w-4 md:h-6 md:w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "border-green-200 text-green-700 bg-green-50"
                      : "border-blue-200 text-blue-700 bg-blue-50"
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">
                  {stat.title}
                </h3>
                <p className="text-xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incoming Requests & Recent Activity */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
        {/* Incoming Blood Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-red-900">
                  Incoming Requests
                </CardTitle>
                <CardDescription className="text-red-600">
                  People need your help
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomingRequests.slice(0, 3).map((request, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 bg-red-50 font-bold text-sm md:text-lg px-2 md:px-3 py-1"
                  >
                    {request.bloodType}
                  </Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{request.patient}</p>
                    <Badge
                      variant={
                        request.urgency === "Critical"
                          ? "destructive"
                          : request.urgency === "Urgent"
                          ? "default"
                          : "secondary"
                      }
                      className={`text-xs ${
                        request.urgency === "Urgent"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : ""
                      }`}
                    >
                      {request.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {request.hospital} • {request.distance} •{" "}
                    {request.requestTime}
                  </p>
                  <p className="text-xs text-blue-600">{request.condition}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-xs px-2"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-transparent px-2"
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Requests ({incomingRequests.length})
            </Button>
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-green-900">
                  Recent Donations
                </CardTitle>
                <CardDescription className="text-green-600">
                  Your donation history
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-green-100 rounded-xl">
                <History className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationHistory.slice(0, 3).map((donation, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-green-100">
                  <AvatarFallback className="bg-green-500 text-white font-semibold text-sm">
                    {donation.recipient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">
                      {donation.recipient}
                    </p>
                    <Badge className="bg-green-500 text-white text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {donation.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {donation.hospital} • {donation.date} • {donation.units}{" "}
                    unit(s)
                  </p>
                  <p className="text-xs text-green-600 italic">
                    "{donation.feedback}"
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorOverviewSection;
