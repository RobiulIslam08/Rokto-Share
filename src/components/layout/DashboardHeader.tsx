"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Shield, Bell, Search, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

type UserRole = 'user' | 'donor' | 'admin';

interface DashboardHeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    userRole: UserRole;
    // বাস্তবে এখানে user object পাস করা হবে
}

export const DashboardHeader = ({ sidebarOpen, setSidebarOpen, userRole }: DashboardHeaderProps) => {
    // ডেমো ডেটা
    const userData = { name: "Ahmed Hassan", avatarFallback: "AH" };
    const donorData = { name: "Rahman Ali", avatarFallback: "RA" };
    const adminData = { name: "Admin User", avatarFallback: "AD" };

    const currentUser = userRole === 'admin' ? adminData : (userRole === 'donor' ? donorData : userData);
    const logoIcon = userRole === 'admin' ? Shield : Heart;
    const title = userRole === 'admin' ? "RoktoShare Admin" : "RoktoShare";
    const subtitle = userRole === 'admin' ? "System Administration Panel" : (userRole === 'donor' ? "Donor Dashboard" : "User Dashboard");
    
    return (
        <header className="sticky top-0 z-30 glass-effect border-b border-white/20 shadow-lg">
            <div className="flex h-20 items-center px-4 md:px-8 justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary rounded-full animate-pulse-slow opacity-20"></div>
                            <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                                {React.createElement(logoIcon, { className: "h-10 w-10 text-primary relative z-10" })}
                            </motion.div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                                {title}
                            </h1>
                            <p className="text-xs text-muted-foreground font-medium hidden md:block">{subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10"><Search className="h-5 w-5" /></Button>
                        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-primary/10">
                            <Bell className="h-5 w-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-primary text-white text-xs animate-pulse">3</Badge>
                        </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                            <AvatarImage src={`/avatars/${currentUser.avatarFallback.toLowerCase()}.png`} />
                            <AvatarFallback className="bg-primary/20 text-primary font-semibold">{currentUser.avatarFallback}</AvatarFallback>
                        </Avatar>
                        <div className="hidden lg:block">
                            <p className="text-sm font-semibold">{currentUser.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};