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
  Droplets,
  Activity,
  CheckCircle,
  Users,
  Menu,
  X,
  Settings,
  BarChart3,
  Shield,
  Database,
  Mail,
  FileText,
  Download,
  Upload,
  AlertTriangle,
  Globe,
} from "lucide-react";
import { systemStats } from "@/lib/dashboard/admin/adminData";
import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";
import UserManagementSection from "@/components/dashboard/Admin/UserManagementSection";
import DonorManagementSection from "@/components/dashboard/Admin/DonorManagementSection";
import RequestManagementSection from "@/components/dashboard/Admin/RequestManagementSection";
import AnalyticsSection from "@/components/dashboard/Admin/AnalyticsSection";

export const AdminDashboardPage = () => {
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
                  RoktoShare Admin
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
            className="fixed inset-0 bg-[#cccccc]  z-30 md:hidden"
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
};

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
