"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Heart,
  Search,
  Bell,
  AlertCircle,
  Droplets,
  MessageSquare,
  Plus,
  Filter,
  Activity,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  Zap,
  Menu,
  X,
  Settings,
  BarChart3,
  PieChart,
  Shield,
  Database,
  Mail,
  FileText,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

// Mock data for admin dashboard
const systemStats = {
  totalUsers: 2847,
  totalDonors: 1523,
  activeRequests: 47,
  completedRequests: 892,
  totalDonations: 1205,
  livesImpacted: 3615,
  responseRate: "94%",
  systemUptime: "99.9%",
};

const recentUsers = [
  {
    id: "USR-001",
    name: "Ahmed Hassan",
    email: "ahmed@email.com",
    bloodType: "O+",
    joinDate: "2024-03-15",
    status: "Active",
    verified: true,
    requests: 3,
  },
  {
    id: "USR-002",
    name: "Fatima Begum",
    email: "fatima@email.com",
    bloodType: "A+",
    joinDate: "2024-03-14",
    status: "Active",
    verified: false,
    requests: 1,
  },
  {
    id: "USR-003",
    name: "Rahman Ali",
    email: "rahman@email.com",
    bloodType: "B+",
    joinDate: "2024-03-13",
    status: "Inactive",
    verified: true,
    requests: 0,
  },
];

const recentDonors = [
  {
    id: "DON-001",
    name: "Karim Uddin",
    email: "karim@email.com",
    bloodType: "O+",
    joinDate: "2020-01-15",
    status: "Active",
    verified: true,
    donations: 25,
    rating: 4.9,
    lastDonation: "2024-02-20",
  },
  {
    id: "DON-002",
    name: "Nasir Ahmed",
    email: "nasir@email.com",
    bloodType: "A-",
    joinDate: "2021-06-10",
    status: "Active",
    verified: true,
    donations: 18,
    rating: 4.8,
    lastDonation: "2024-03-01",
  },
  {
    id: "DON-003",
    name: "Rashid Ali",
    email: "rashid@email.com",
    bloodType: "B-",
    joinDate: "2022-03-20",
    status: "Inactive",
    verified: false,
    donations: 5,
    rating: 4.5,
    lastDonation: "2023-12-15",
  },
];

const recentRequests = [
  {
    id: "REQ-001",
    patient: "Ahmed Hassan",
    requester: "Fatima Hassan",
    bloodType: "O+",
    unitsNeeded: 2,
    hospital: "Dhaka Medical College",
    urgency: "Critical",
    status: "Pending",
    requestDate: "2024-03-15",
    assignedDonor: null,
  },
  {
    id: "REQ-002",
    patient: "Nasir Ahmed",
    requester: "Rashida Ahmed",
    bloodType: "A+",
    unitsNeeded: 1,
    hospital: "Square Hospital",
    urgency: "Urgent",
    status: "Assigned",
    requestDate: "2024-03-14",
    assignedDonor: "Karim Uddin",
  },
  {
    id: "REQ-003",
    patient: "Rahman Ali",
    requester: "Salma Ali",
    bloodType: "B+",
    unitsNeeded: 3,
    hospital: "Apollo Hospital",
    urgency: "Normal",
    status: "Completed",
    requestDate: "2024-03-13",
    assignedDonor: "Nasir Ahmed",
  },
];

const systemAlerts = [
  {
    id: "ALT-001",
    type: "Critical",
    message: "Low O- blood type donors in Dhaka area",
    time: "30 min ago",
    resolved: false,
  },
  {
    id: "ALT-002",
    type: "Warning",
    message: "Server response time increased by 15%",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: "ALT-003",
    type: "Info",
    message: "Monthly backup completed successfully",
    time: "1 day ago",
    resolved: true,
  },
];

export const  AdminDashboardPage = () =>{
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: Activity,
      color: "text-blue-600",
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      color: "text-green-600",
    },
    {
      id: "donors",
      label: "Donor Management",
      icon: Droplets,
      color: "text-red-600",
    },
    {
      id: "requests",
      label: "Blood Requests",
      icon: Heart,
      color: "text-purple-600",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      color: "text-orange-600",
    },
    {
      id: "system",
      label: "System Health",
      icon: Shield,
      color: "text-cyan-600",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
        <div className="flex h-16 md:h-20 items-center px-4 md:px-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-20"></div>
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-red-500 relative z-10" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  BloodConnect Admin
                </h1>
                <p className="text-xs text-muted-foreground font-medium hidden md:block">
                  System Administration Panel
                </p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-50 hover:text-red-600 transition-colors h-8 w-8 md:h-10 md:w-10"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-red-50 hover:text-red-600 transition-colors h-8 w-8 md:h-10 md:w-10"
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-red-500 text-white text-xs animate-pulse">
                  3
                </Badge>
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-3">
              <Avatar className="h-8 w-8 md:h-12 md:w-12 ring-2 ring-red-100">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-red-500 text-white font-semibold text-xs md:text-base">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-muted-foreground">
                  System Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 md:w-72 glass-effect border-r border-white/20 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          <nav className="space-y-2 md:space-y-3 p-4 md:p-6 pt-20 md:pt-6">
            <div className="mb-6 md:mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Admin Menu
              </h3>
            </div>

            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-10 md:h-12 text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600"
                    : "hover:bg-white/50 hover:shadow-md"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
              >
                <item.icon
                  className={`mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 ${
                    activeTab === item.id ? "text-white" : item.color
                  }`}
                />
                <span className="font-medium text-sm md:text-base">
                  {item.label}
                </span>
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Button>
            ))}

            {/* System Status Card */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-100">
              <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                <div className="p-1.5 md:p-2 bg-green-500 rounded-lg">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">
                    System Status
                  </p>
                  <p className="text-xs text-green-600">
                    All systems operational
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Uptime</span>
                  <span className="font-bold text-green-900">
                    {systemStats.systemUptime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Active Users</span>
                  <span className="font-bold text-green-900">1,247</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && <AdminOverviewSection />}
            {activeTab === "users" && <UserManagementSection />}
            {activeTab === "donors" && <DonorManagementSection />}
            {activeTab === "requests" && <RequestManagementSection />}
            {activeTab === "analytics" && <AnalyticsSection />}
            {activeTab === "system" && <SystemHealthSection />}
            {activeTab === "settings" && <SettingsSection />}
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminOverviewSection() {
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
            change: "+12% this month",
            changeType: "positive",
            icon: Users,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Active Donors",
            value: systemStats.totalDonors.toLocaleString(),
            change: "+8% this month",
            changeType: "positive",
            icon: Droplets,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Pending Requests",
            value: systemStats.activeRequests.toString(),
            change: "Needs attention",
            changeType: "warning",
            icon: AlertCircle,
            gradient: "from-orange-500 to-orange-600",
            bgGradient: "from-orange-50 to-orange-100",
          },
          {
            title: "Lives Impacted",
            value: systemStats.livesImpacted.toLocaleString(),
            change: "+45 this week",
            changeType: "positive",
            icon: Heart,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
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
                      : stat.changeType === "warning"
                      ? "border-orange-200 text-orange-700 bg-orange-50"
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
}

function UserManagementSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            User Management
          </h2>
          <p className="text-muted-foreground">
            Manage all registered users and their accounts
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input placeholder="Search users..." className="md:w-64" />
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {systemStats.totalUsers}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Total Users
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              2,456
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Active Users
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-orange-600">
              391
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Inactive Users
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">
              2,234
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Verified Users
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>
            Latest user registrations and account status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user, i) => (
              <div
                key={i}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-gray-200">
                    <AvatarFallback className="bg-blue-500 text-white font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.verified && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>ID: {user.id}</span>
                      <span>Blood: {user.bloodType}</span>
                      <span>Joined: {user.joinDate}</span>
                      <span>Requests: {user.requests}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                    className={
                      user.status === "Active"
                        ? "bg-green-500 hover:bg-green-600"
                        : ""
                    }
                  >
                    {user.status}
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
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              Showing 3 of {systemStats.totalUsers} users
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
}

function DonorManagementSection() {
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
}

function RequestManagementSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Blood Request Management
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage all blood donation requests
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input placeholder="Search requests..." className="md:w-64" />
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Status
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <AlertCircle className="mr-2 h-4 w-4" />
            Emergency Alert
          </Button>
        </div>
      </div>

      {/* Request Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-orange-600">
              {systemStats.activeRequests}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Pending Requests
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">
              {systemStats.completedRequests}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Completed
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">12</div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Critical
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">
              {systemStats.responseRate}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Success Rate
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
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
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 bg-red-50 font-bold text-lg px-3 py-1"
                  >
                    {request.bloodType}
                  </Badge>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{request.patient}</h3>
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
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Requester: {request.requester}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>ID: {request.id}</span>
                      <span>Hospital: {request.hospital}</span>
                      <span>Units: {request.unitsNeeded}</span>
                      <span>Date: {request.requestDate}</span>
                    </div>
                    {request.assignedDonor && (
                      <p className="text-sm text-green-600">
                        Assigned to: {request.assignedDonor}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      request.status === "Completed"
                        ? "default"
                        : request.status === "Assigned"
                        ? "secondary"
                        : "outline"
                    }
                    className={
                      request.status === "Completed"
                        ? "bg-green-500 hover:bg-green-600"
                        : request.status === "Assigned"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "border-orange-300 text-orange-700"
                    }
                  >
                    {request.status}
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
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground">
              Showing 3 of{" "}
              {systemStats.activeRequests + systemStats.completedRequests}{" "}
              requests
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
}

function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Analytics & Reports
        </h2>
        <p className="text-muted-foreground">
          System performance metrics and insights
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">User Growth</span>
                <span className="text-sm font-bold text-green-600">+12%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Donor Growth</span>
                <span className="text-sm font-bold text-green-600">+8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Request Volume</span>
                <span className="text-sm font-bold text-blue-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-blue-500" />
              Blood Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">O+ (Universal)</span>
                <span className="text-sm font-bold">35%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">A+</span>
                <span className="text-sm font-bold">28%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">B+</span>
                <span className="text-sm font-bold">22%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Others</span>
                <span className="text-sm font-bold">15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-purple-500" />
              Platform Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Smartphone className="mr-1 h-3 w-3" />
                  Mobile
                </span>
                <span className="text-sm font-bold">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Monitor className="mr-1 h-3 w-3" />
                  Desktop
                </span>
                <span className="text-sm font-bold">25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm flex items-center">
                  <Tablet className="mr-1 h-3 w-3" />
                  Tablet
                </span>
                <span className="text-sm font-bold">7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Key metrics for the current month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-blue-700">New Users</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">89</div>
                <div className="text-sm text-red-700">New Donors</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">234</div>
                <div className="text-sm text-green-700">Requests Fulfilled</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">702</div>
                <div className="text-sm text-purple-700">Lives Impacted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Technical performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Uptime</span>
                <Badge className="bg-green-500">
                  {systemStats.systemUptime}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <Badge
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  245ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Performance</span>
                <Badge className="bg-blue-500">Optimal</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Rate</span>
                <Badge
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  0.02%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>
            Download detailed reports and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">User Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Donor Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Request Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col bg-transparent">
              <Download className="h-5 w-5 mb-2" />
              <span className="text-sm">Full Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SystemHealthSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          System Health
        </h2>
        <p className="text-muted-foreground">
          Monitor system performance and infrastructure
        </p>
      </div>

      {/* System Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-lg font-bold text-green-600">Operational</div>
            <div className="text-sm text-muted-foreground">All Systems</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-lg font-bold text-blue-600">Healthy</div>
            <div className="text-sm text-muted-foreground">Database</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-purple-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-lg font-bold text-purple-600">Online</div>
            <div className="text-sm text-muted-foreground">API Services</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-orange-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Mail className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-lg font-bold text-orange-600">Active</div>
            <div className="text-sm text-muted-foreground">Notifications</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Real-time system performance data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">CPU Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Memory Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "62%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Disk Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Network I/O</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent System Events</CardTitle>
            <CardDescription>Latest system activities and logs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Database backup completed
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Activity className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System update deployed</p>
                  <p className="text-xs text-muted-foreground">6 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    High memory usage detected
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Administrative tools and maintenance options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-16 flex-col bg-blue-500 hover:bg-blue-600 text-white">
              <Database className="h-5 w-5 mb-2" />
              <span className="text-sm">Backup Database</span>
            </Button>
            <Button className="h-16 flex-col bg-green-500 hover:bg-green-600 text-white">
              <Upload className="h-5 w-5 mb-2" />
              <span className="text-sm">System Update</span>
            </Button>
            <Button className="h-16 flex-col bg-orange-500 hover:bg-orange-600 text-white">
              <AlertTriangle className="h-5 w-5 mb-2" />
              <span className="text-sm">Clear Cache</span>
            </Button>
            <Button className="h-16 flex-col bg-purple-500 hover:bg-purple-600 text-white">
              <FileText className="h-5 w-5 mb-2" />
              <span className="text-sm">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          System Settings
        </h2>
        <p className="text-muted-foreground">
          Configure system preferences and administrative options
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic system configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">System Name</label>
              <Input defaultValue="BloodConnect" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Email</label>
              <Input defaultValue="admin@bloodconnect.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Emergency Hotline</label>
              <Input defaultValue="999" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">System Timezone</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Asia/Dhaka (GMT+6)</option>
                <option>UTC (GMT+0)</option>
                <option>Asia/Kolkata (GMT+5:30)</option>
              </select>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Emergency Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">System Maintenance Alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              System security and access control
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Session Timeout (minutes)
              </label>
              <Input defaultValue="30" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Policy</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                <option>Medium (6+ chars, mixed case, numbers)</option>
                <option>Basic (6+ chars)</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Two-Factor Authentication</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Login Attempt Monitoring</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">IP Whitelist</span>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600">
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Database and data handling options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Data Retention Period (days)
              </label>
              <Input defaultValue="365" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Backup Frequency</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto Backup</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Encryption</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Audit Logging</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Database className="mr-2 h-4 w-4" />
                Backup Now
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Current system details and version information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">v2.1.0</div>
              <div className="text-sm text-blue-700">System Version</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {systemStats.systemUptime}
              </div>
              <div className="text-sm text-green-700">Uptime</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">
                PostgreSQL
              </div>
              <div className="text-sm text-purple-700">Database</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-600">AWS</div>
              <div className="text-sm text-orange-700">Cloud Provider</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
