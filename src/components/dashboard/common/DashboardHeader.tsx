"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import type { UserRole } from "@/types";
import { useGetUserProfileQuery } from "@/redux/features/user/userApi";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userRole: UserRole;
  availability?: boolean;
  setAvailability?: (available: boolean) => void;
}

export const DashboardHeader = ({
  setSidebarOpen,
  userRole,
  availability,
  setAvailability,
}: DashboardHeaderProps) => {
  // ✅ Get logged-in user data from Redux
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: userProfileData,
   
  } = useGetUserProfileQuery(undefined, {
    skip: false,
  });


  // ✅ Real user data (demo data removed)
  const currentUser = {
    name: user?.name || "Guest User",
    email: user?.email || "",
    role: user?.role || userRole,
    bloodType: userProfileData?.data?.bloodGroup || null,
  };

  const title =
    currentUser.role === "admin" ? "RoktoShare Admin" : "RoktoShare";
  const subtitle =
    currentUser.role === "admin"
      ? "Admin Panel"
      : currentUser.role === "donor"
      ? "Donor Dashboard"
      : "User Dashboard";

  return (
    <header className="sticky top-0 z-30 glass-effect border-b border-white/10 shadow-lg">
      <div className="flex h-20 items-center px-4 md:px-8 justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
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
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-xs text-muted-foreground font-medium hidden md:block">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-2 md:space-x-6">
          {/* ✅ Donor Availability Toggle */}
          {userRole === "donor" && setAvailability && (
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-sm font-medium">Available</span>
              <button
                onClick={() => setAvailability(!availability)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  availability ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    availability ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          )}

          {/* ✅ User Profile Section with Real Data */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage
                src={`/avatars/${currentUser.name
                  .split(" ")[0]
                  .toLowerCase()}.png`}
              />
              <AvatarFallback className="bg-red-500 text-white font-semibold">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              {currentUser.email && (
                <p className="text-xs text-muted-foreground">
                  {currentUser.email}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {currentUser.role === "donor"
                    ? "Donor"
                    : currentUser.role === "admin"
                    ? "Admin"
                    : "User"}
                </Badge>
                {currentUser.bloodType && (
                  <Badge
                    variant="outline"
                    className="text-xs text-red-600 border-red-300"
                  >
                    {currentUser.bloodType}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
