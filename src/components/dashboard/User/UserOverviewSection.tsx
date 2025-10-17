import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Heart,
  Search,
  Bell,
  Calendar,
  Clock,
  Droplets,
  MessageSquare,
  History,
  CheckCircle,
  Zap,
  Target,
} from "lucide-react";
import { userRequestHistory } from "@/lib/dashboard/user/userData";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const UserOverviewSection = () => {
  const currenUser = useAppSelector(selectCurrentUser)
  console.log(currenUser, 'from overview')
  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, {currenUser?.name}!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                Your blood donation journey continues
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Profile Complete
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                >
                  <Droplets className="w-3 h-3 mr-1" />
                  Blood Type: O+
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Heart
                  className="h-16 w-16 md:h-24 md:w-24 text-red-500 relative z-10"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Requests",
            value: "3",
            change: "All completed",
            changeType: "positive",
            icon: Heart,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Lives Saved",
            value: "6",
            change: "By Donating",
            changeType: "positive",
            icon: Target,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
          {
            title: "Response Time",
            value: "< 2hrs",
            change: "Average",
            changeType: "positive",
            icon: Clock,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Available Donors",
            value: "156",
            change: "In your area",
            changeType: "positive",
            icon: Search,
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
                  className="border-green-200 text-green-700 bg-green-50 text-xs"
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
        {/* Recent Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-red-900">
                  Recent Requests
                </CardTitle>
                <CardDescription className="text-red-600">
                  Your blood request history
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-red-100 rounded-xl">
                <History className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRequestHistory.slice(0, 3).map((request, i) => (
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
                    <p className="text-sm font-semibold">{request.id}</p>
                    <Badge className="bg-green-500 text-white text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {request.hospital} • {request.unitsNeeded} units •{" "}
                    {request.requestDate}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-blue-900">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Common tasks and shortcuts
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-blue-100 rounded-xl">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-10 md:h-12">
              <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Request Blood Now
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 md:h-12 bg-transparent"
            >
              <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Find Nearby Donors
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 md:h-12 bg-transparent"
            >
              <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Contact Support
            </Button>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                Schedule Request
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Bell className="mr-1 h-3 w-3" />
                Set Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOverviewSection;
