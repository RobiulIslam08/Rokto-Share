
"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Shield, Bell, Search, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import type { UserRole } from "@/types";
import { Link } from "react-router-dom";


interface DashboardHeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userRole: UserRole;
    // setUserRole: (role: UserRole) => void;
    // setActiveTab: (tab: string) => void;
    availability?: boolean;
    setAvailability?: (available: boolean) => void;
}

export const DashboardHeader = ({ sidebarOpen, setSidebarOpen, userRole, availability, setAvailability }: DashboardHeaderProps) => {
    const userData = { name: "Ahmed Hassan", bloodType: "O+" };
    const donorData = { name: "Rahman Ali", bloodType: "O+" };
    const adminData = { name: "Admin User", bloodType: "N/A" };

    const currentUser = userRole === 'admin' ? adminData : (userRole === 'donor' ? donorData : userData);
    const logoIcon = userRole === 'admin' ? Shield : Heart;
    const title = userRole === 'admin' ? "RoktoShare Admin" : "RoktoShare";
    const subtitle = userRole === 'admin' ? "Admin Panel" : (userRole === 'donor' ? "Donor Dashboard" : "User Dashboard");
    
    return (
        <header className="sticky top-0 z-30 glass-effect border-b border-white/10 shadow-lg">
            <div className="flex h-20 items-center px-4 md:px-8 justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <div className="flex items-center space-x-3">
                       <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-500/30">
                <Heart className="w-7 h-7 text-white animate-pulse group-hover:animate-bounce" />
              </div>
            </div>
        
          </Link>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">{title}</h1>
                            <p className="text-xs text-muted-foreground font-medium hidden md:block">{subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex items-center space-x-2 md:space-x-6">
                    {/* <div className="flex items-center space-x-2 bg-white/50 rounded-full p-1">
                        <Button size="sm" variant={userRole === "user" ? "default" : "ghost"}
                            className="rounded-full text-xs md:text-sm px-3 md:px-4 h-9 bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={() => { setUserRole("user"); setActiveTab("overview"); }}>
                            <UserIcon className="h-4 w-4 mr-1" /> User
                        </Button>
                        <Button size="sm" variant={userRole === "donor" ? "default" : "ghost"}
                            className="rounded-full text-xs md:text-sm px-3 md:px-4 h-9 bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => { setUserRole("donor"); setActiveTab("overview"); }}>
                            <Droplets className="h-4 w-4 mr-1" /> Donor
                        </Button>
                    </div> */}

                    {userRole === "donor" && setAvailability && (
                        <div className="hidden md:flex items-center space-x-2">
                            <span className="text-sm font-medium">Available</span>
                            <button onClick={() => setAvailability(!availability)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${availability ? "bg-green-500" : "bg-gray-300"}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${availability ? "translate-x-6" : "translate-x-1"}`} />
                            </button>
                        </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10"><Search className="h-5 w-5"/></Button>
                        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10">
                            <Bell className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-500 text-white text-xs animate-pulse">
                                {userRole === "user" ? "2" : "5"}
                            </Badge>
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={`/avatars/${currentUser.name.split(' ')[0].toLowerCase()}.png`} />
                            <AvatarFallback className="bg-red-500 text-white font-semibold">{currentUser.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="text-sm font-semibold">{currentUser.name}</p>
                            <p className="text-xs text-muted-foreground">Blood Type: {currentUser.bloodType}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};