/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { UserRole } from "@/types";
import { Button } from "../ui/button";
import { DashboardHeader } from "../dashboard/common/DashboardHeader";
import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";
import { useAppSelector } from "@/redux/hook";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<UserRole>("user");

  const userActualRole = user?.role || "user";

  // ✅ Donor always has access to both user and donor dashboards
  const allowedRoles: UserRole[] =
    userActualRole === "admin"
      ? ["user", "donor", "admin"]
      : userActualRole === "donor"
      ? ["user", "donor"]
      : ["user"];

  useEffect(() => {
    if (!user) {
      navigate("/login-page");
      return;
    }

    const pathSegments = location.pathname.split("/");
    const roleFromPath = pathSegments[2] as UserRole;

    // ✅ Common routes - don't redirect
    const commonRoutes = ["profile", "messages"];
    if (commonRoutes.includes(roleFromPath)) {
      return;
    }

    // ✅ If valid role in URL, set it as current view
    if (roleFromPath && allowedRoles.includes(roleFromPath)) {
      setCurrentView(roleFromPath);
      return;
    }

    // ✅ Only redirect if we're at /dashboard root (no role specified)
    if (location.pathname === "/dashboard" || !roleFromPath) {
      // For donors, default to donor dashboard
      const defaultRole = userActualRole === "donor" ? "donor" : userActualRole;
      setCurrentView(defaultRole);
      navigate(`/dashboard/${defaultRole}`, { replace: true });
    }
  }, [location.pathname, user]); // ✅ Remove navigate and allowedRoles from deps

  const handleRoleSwitch = (role: UserRole) => {
    if (!allowedRoles.includes(role)) return;

    setCurrentView(role);
    navigate(`/dashboard/${role}`);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Show switcher for donors and admins */}
      {allowedRoles.length > 1 && (
        <div className="fixed bottom-4 right-4 z-[100] bg-white p-2 rounded-lg shadow-lg flex gap-2 border">
          {allowedRoles.includes("user") && (
            <Button
              size="sm"
              onClick={() => handleRoleSwitch("user")}
              variant={currentView === "user" ? "default" : "outline"}
            >
              User
            </Button>
          )}
          {allowedRoles.includes("donor") && (
            <Button
              size="sm"
              onClick={() => handleRoleSwitch("donor")}
              variant={currentView === "donor" ? "default" : "outline"}
            >
              Donor
            </Button>
          )}
          {allowedRoles.includes("admin") && (
            <Button
              size="sm"
              onClick={() => handleRoleSwitch("admin")}
              variant={currentView === "admin" ? "default" : "outline"}
            >
              Admin
            </Button>
          )}
        </div>
      )}

      <DashboardHeader
        userRole={currentView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72"
            >
              <DashboardSidebar
                userRole={currentView}
                setSidebarOpen={setSidebarOpen}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex">
        <div className="hidden md:block w-72 flex-shrink-0">
          <DashboardSidebar
            userRole={currentView}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
