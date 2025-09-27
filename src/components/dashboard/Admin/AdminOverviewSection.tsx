
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
  AlertCircle,
  Droplets,
  Activity,
  CheckCircle,
  Users,

  Settings,
  BarChart3,
  Shield,
  AlertTriangle,
  Zap,
 
} from "lucide-react";
import { recentRequests, systemAlerts, systemStats } from "@/lib/dashboard/admin/adminData";

const AdminOverviewSection = () => {
	  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2">
                System overview and management
              </p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  System Healthy
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-700"
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {systemStats.totalUsers} Active Users
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Shield className="h-16 w-16 md:h-24 md:w-24 text-red-500 relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Users",
            value: systemStats.totalUsers.toLocaleString(),
         
            changeType: "positive",
            icon: Users,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Active Donors",
            value: systemStats.totalDonors.toLocaleString(),
        
            changeType: "positive",
            icon: Droplets,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Pending Requests",
            value: systemStats.activeRequests.toString(),
         
            changeType: "warning",
            icon: AlertCircle,
            gradient: "from-orange-500 to-orange-600",
            bgGradient: "from-orange-50 to-orange-100",
          },
          {
            title: "Lives Impacted",
            value: systemStats.livesImpacted.toLocaleString(),
           
            changeType: "positive",
            icon: Heart,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
        ].map((stat, i) => (
          <Card key={i} className="card-hover border-0 shadow-lg">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
              
               
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

      {/* Recent Activity & System Alerts */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
        {/* Recent Blood Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-red-900">
                  Recent Blood Requests
                </CardTitle>
                <CardDescription className="text-red-600">
                  Latest requests requiring attention
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-red-100 rounded-xl">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.slice(0, 3).map((request, i) => (
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
                    {request.hospital} • {request.unitsNeeded} units •{" "}
                    {request.requestDate}
                  </p>
                  <p className="text-xs text-blue-600">
                    Status: {request.status}
                  </p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-xs px-2"
                  >
                    Manage
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
              View All Requests ({systemStats.activeRequests})
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-orange-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-orange-900">
                  System Alerts
                </CardTitle>
                <CardDescription className="text-orange-600">
                  Important system notifications
                </CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-orange-100 rounded-xl">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl transition-colors ${
                  alert.resolved
                    ? "bg-green-50/60"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`p-2 rounded-full ${
                      alert.type === "Critical"
                        ? "bg-red-100"
                        : alert.type === "Warning"
                        ? "bg-orange-100"
                        : "bg-blue-100"
                    }`}
                  >
                    {alert.type === "Critical" ? (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : alert.type === "Warning" ? (
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        alert.type === "Critical"
                          ? "destructive"
                          : alert.type === "Warning"
                          ? "default"
                          : "secondary"
                      }
                      className={`text-xs ${
                        alert.type === "Warning"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : ""
                      }`}
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {alert.time}
                    </span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  {!alert.resolved ? (
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-xs px-2"
                    >
                      Resolve
                    </Button>
                  ) : (
                    <Badge className="bg-green-500 text-white text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Resolved
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg md:text-xl font-bold text-blue-900">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-blue-600">
                Common administrative tasks
              </CardDescription>
            </div>
            <div className="p-2 md:p-3 bg-blue-100 rounded-xl">
              <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 md:h-20 flex-col bg-red-500 hover:bg-red-600 text-white">
              <Users className="h-5 w-5 md:h-6 md:w-6 mb-2" />
              <span className="text-xs md:text-sm">Manage Users</span>
            </Button>
            <Button className="h-16 md:h-20 flex-col bg-green-500 hover:bg-green-600 text-white">
              <Droplets className="h-5 w-5 md:h-6 md:w-6 mb-2" />
              <span className="text-xs md:text-sm">Donor Reports</span>
            </Button>
            <Button className="h-16 md:h-20 flex-col bg-purple-500 hover:bg-purple-600 text-white">
              <BarChart3 className="h-5 w-5 md:h-6 md:w-6 mb-2" />
              <span className="text-xs md:text-sm">Analytics</span>
            </Button>
            <Button className="h-16 md:h-20 flex-col bg-orange-500 hover:bg-orange-600 text-white">
              <Settings className="h-5 w-5 md:h-6 md:w-6 mb-2" />
              <span className="text-xs md:text-sm">System Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverviewSection;