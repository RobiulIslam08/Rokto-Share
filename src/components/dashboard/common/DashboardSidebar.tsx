
"use client";


import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Activity, Users, Droplets, Heart,  Settings, History,   User as UserIcon,
  Shield,
  Award,
  AlertCircle,
  X,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = { id: string; label: string; icon: React.ElementType; color: string; href: string; };
type UserRole = 'user' | 'donor' | 'admin';

const navItemsData: Record<UserRole, NavItem[]> = {
    user: [
        { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/user" },
       
        { id: "history", label: "My Requests", icon: History, color: "text-green-600", href: "/dashboard/user/my-requests" },
    ],
    donor: [
        { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/donor" },
        { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600", href: "/dashboard/donor/blood-requests" },
        { id: "history", label: "Donation History", icon: History, color: "text-green-600", href: "/dashboard/donor/donation-history" },
       
    ],
    admin: [
        { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/admin" },
        { id: "users", label: "User Management", icon: Users, color: "text-green-600", href: "/dashboard/admin/users" },
        { id: "donors", label: "Donor Management", icon: Droplets, color: "text-red-600", href: "/dashboard/admin/donors" },
        { id: "requests", label: "Request Management", icon: Heart, color: "text-purple-600", href: "/dashboard/admin/requests" },
    ]
};

const commonNavItems: NavItem[] = [
    { id: "profile", label: "My Profile", icon: UserIcon, color: "text-gray-600", href: "/dashboard/profile" },
    { id: "settings", label: "Settings", icon: Settings, color: "text-gray-600", href: "/dashboard/settings" },
    { id: "home-page", label: "Go To Home", icon: Home, color: "text-gray-600", href: "/" },
];

interface DashboardSidebarProps {
    userRole: UserRole;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const DashboardSidebar = ({ userRole, setSidebarOpen }: DashboardSidebarProps) => {
    const navItems = [...navItemsData[userRole], ...commonNavItems];

    return (
        <aside className="w-full h-full border-r border-white/20 shadow-xl bg-[#e5e7eb]">
            <nav className="space-y-2 md:space-y-3 p-6 h-full flex flex-col">
                <div className="mb-8"><h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{userRole} Menu</h3></div>
                 <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
                <div className="flex-grow space-y-2 md:space-y-3">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.href}
                            end // বেস রুটের জন্য end prop
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    "w-full justify-start h-12 text-left transition-all duration-200 flex items-center px-4 rounded-lg font-medium",
                                    isActive ?  "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600" : "hover:bg-white/50 hover:shadow-md"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : item.color)} />
                                    <span>{item.label}</span>
                                    {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
                {/* Role specific card (অপরিবর্তিত) */}
				 <div className="mt-auto">
                    {userRole === 'user' && (
                        <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-primary/20 text-center">
                          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm">
                    <AlertCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Emergency Request
                  </Button>
                  <p className="text-xs text-red-600 mt-2 text-center">For critical situations</p>
                        </div>
                    )}
                     {userRole === 'donor' && (
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                            <div className="flex items-center space-x-3 mb-3"><div className="p-2 bg-green-500 rounded-lg"><Award className="h-4 w-4 text-white" /></div><div><p className="text-sm font-semibold text-green-900">Hero Donor</p><p className="text-xs text-green-600">15+ Donations</p></div></div>
                        </div>
                    )}
                     {userRole === 'admin' && (
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                           <div className="flex items-center space-x-3 mb-3"><div className="p-2 bg-blue-500 rounded-lg"><Shield className="h-4 w-4 text-white" /></div><div><p className="text-sm font-semibold text-blue-900">System Status</p><p className="text-xs text-blue-600">All systems operational</p></div></div>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
};