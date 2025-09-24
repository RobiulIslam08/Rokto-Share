
// "use client";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";


// import {
//   Activity, Users, Droplets, Heart, BarChart3, Shield, Settings, History, Calendar, Search, Plus, AlertCircle, Award,
//   MessageSquare,
//   User
// } from "lucide-react";
// import { NavLink } from "react-router-dom";

// // Nav Items Data and Types
// type NavItem = { 
//     id: string; 
//     label: string; 
//     icon: React.ElementType; 
//     color: string; 
//     href: string; // প্রতিটি আইটেমের জন্য URL পাথ
// };

// const navItemsData: Record<'user' | 'donor' | 'admin', NavItem[]> = {
//     user: [
//         { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard" },
//         { id: "request", label: "Request Blood", icon: Plus, color: "text-red-600", href: "/dashboard/request-blood" },
//         { id: "history", label: "My Requests", icon: History, color: "text-green-600", href: "/dashboard/my-requests" },
//         { id: "donors", label: "Find Donors", icon: Search, color: "text-purple-600", href: "/find-blood-donner-page" }, // এটি একটি পাবলিক পেজ হতে পারে
//     ],
//     donor: [
//         { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard" },
//         { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600", href: "/dashboard/blood-requests" },
//         { id: "history", label: "Donation History", icon: History, color: "text-green-600", href: "/dashboard/donation-history" },
//         { id: "schedule", label: "My Schedule", icon: Calendar, color: "text-purple-600", href: "/dashboard/schedule" },
//     ],
//     admin: [
//         { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/admin" },
//         { id: "users", label: "User Management", icon: Users, color: "text-green-600", href: "/dashboard/admin/users" },
//         { id: "donors", label: "Donor Management", icon: Droplets, color: "text-red-600", href: "/dashboard/admin/donors" },
//         { id: "requests", label: "Request Management", icon: Heart, color: "text-purple-600", href: "/dashboard/admin/requests" },
//         { id: "analytics", label: "Analytics", icon: BarChart3, color: "text-orange-600", href: "/dashboard/admin/analytics" },
//         { id: "system", label: "System Health", icon: Shield, color: "text-cyan-600", href: "/dashboard/admin/system-health" },
//     ]
// };

// const commonNavItems: NavItem[] = [
//     { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600", href: "/dashboard/messages" },
//     { id: "profile", label: "My Profile", icon: User, color: "text-gray-600", href: "/dashboard/profile" },
//     { id: "settings", label: "Settings", icon: Settings, color: "text-gray-600", href: "/dashboard/settings" },
// ];


// interface DashboardSidebarProps {
//     userRole: 'user' | 'donor' | 'admin';
//     activeTab: string;
//     setActiveTab: (id: string) => void;
//     setSidebarOpen: (isOpen: boolean) => void;
// }

// export const DashboardSidebar = ({ userRole, setSidebarOpen }: DashboardSidebarProps) => {
//     const navItems = [...navItemsData[userRole], ...commonNavItems];

//     return (
//         <aside className="w-full h-full glass-effect border-r border-white/20 shadow-xl">
//             <nav className="space-y-3 p-6 h-full flex flex-col">
//                  <div className="mb-8">
//                     <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{userRole} Menu</h3>
//                 </div>
//                 <div className="flex-grow">
//                     {navItems.map((item) => (
//                         <NavLink
//                             key={item.id}
//                             to={item.href}
//                             end // এটি নিশ্চিত করে যে শুধুমাত্র সম্পূর্ণ পাথ মিললেই লিঙ্কটি অ্যাক্টিভ হবে
//                             onClick={() => setSidebarOpen(false)}
//                             className={({ isActive }) =>
//                                 cn(
//                                     "w-full justify-start h-12 text-left transition-all duration-200 flex items-center px-4 rounded-lg",
//                                     isActive
//                                         ? "bg-primary text-white shadow-lg shadow-primary/25"
//                                         : "hover:bg-primary/10 text-text"
//                                 )
//                             }
//                         >
//                             {({ isActive }) => (
//                                 <>
//                                     <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-white" : item.color)} />
//                                     <span className="font-medium">{item.label}</span>
//                                     {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
//                                 </>
//                             )}
//                         </NavLink>
//                     ))}
//                 </div>
//                 {/* Role specific card */}
//                 <div className="mt-auto">
//                     {userRole === 'user' && (
//                         <div className="p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-primary/20 text-center">
//                             <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"><AlertCircle className="mr-2 h-4 w-4" />Emergency Request</Button>
//                             <p className="text-xs text-primary/80 mt-2">For critical situations</p>
//                         </div>
//                     )}
//                      {userRole === 'donor' && (
//                         <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
//                             <div className="flex items-center space-x-3 mb-3"><div className="p-2 bg-green-500 rounded-lg"><Award className="h-4 w-4 text-white" /></div><div><p className="text-sm font-semibold text-green-900">Hero Donor</p><p className="text-xs text-green-600">15+ Donations</p></div></div>
//                         </div>
//                     )}
//                      {userRole === 'admin' && (
//                         <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
//                            <div className="flex items-center space-x-3 mb-3"><div className="p-2 bg-blue-500 rounded-lg"><Shield className="h-4 w-4 text-white" /></div><div><p className="text-sm font-semibold text-blue-900">System Status</p><p className="text-xs text-blue-600">All systems operational</p></div></div>
//                         </div>
//                     )}
//                 </div>
//             </nav>
//         </aside>
//     );
// };

"use client";


import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Activity, Users, Droplets, Heart,  Settings, History, Calendar, Plus,  User as UserIcon
} from "lucide-react";

type NavItem = { id: string; label: string; icon: React.ElementType; color: string; href: string; };
type UserRole = 'user' | 'donor' | 'admin';

const navItemsData: Record<UserRole, NavItem[]> = {
    user: [
        { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/user" },
        { id: "request", label: "Request Blood", icon: Plus, color: "text-red-600", href: "/dashboard/user/request-blood" },
        { id: "history", label: "My Requests", icon: History, color: "text-green-600", href: "/dashboard/user/my-requests" },
    ],
    donor: [
        { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600", href: "/dashboard/donor" },
        { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600", href: "/dashboard/donor/requests" },
        { id: "history", label: "Donation History", icon: History, color: "text-green-600", href: "/dashboard/donor/history" },
        { id: "schedule", label: "My Schedule", icon: Calendar, color: "text-purple-600", href: "/dashboard/donor/schedule" },
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
];

interface DashboardSidebarProps {
    userRole: UserRole;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const DashboardSidebar = ({ userRole, setSidebarOpen }: DashboardSidebarProps) => {
    const navItems = [...navItemsData[userRole], ...commonNavItems];

    return (
        <aside className="w-full h-full glass-effect border-r border-white/20 shadow-xl">
            <nav className="space-y-3 p-6 h-full flex flex-col">
                <div className="mb-8"><h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">{userRole} Menu</h3></div>
                <div className="flex-grow">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.href}
                            end={item.href.split('/').length <= 2} // বেস রুটের জন্য end prop
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                cn(
                                    "w-full justify-start h-12 text-left transition-all duration-200 flex items-center px-4 rounded-lg font-medium",
                                    isActive ? "bg-primary text-white shadow-lg shadow-primary/25" : "hover:bg-primary/10 text-text"
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
            </nav>
        </aside>
    );
};