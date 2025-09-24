"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Heart,
  Search,
  Bell,
  Droplets,
  Activity,
 
  Users,
  Menu,
  X,
  Settings,
  BarChart3,
  Shield,

 
} from "lucide-react";
import { systemStats } from "@/lib/dashboard/admin/adminData";
import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";
import UserManagementSection from "@/components/dashboard/Admin/UserManagementSection";
import DonorManagementSection from "@/components/dashboard/Admin/DonorManagementSection";
import RequestManagementSection from "@/components/dashboard/Admin/RequestManagementSection";
import AnalyticsSection from "@/components/dashboard/Admin/AnalyticsSection";
import SystemHealthSection from "@/components/dashboard/Admin/SystemHealthSection";
import SettingsSection from "@/components/dashboard/Admin/SettingsSection";

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




