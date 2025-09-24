"use client";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { UserRole } from "@/types";
import { Button } from "../ui/button";
import { DashboardHeader } from "../dashboard/common/DashboardHeader";
import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";

const DashboardLayout = () => {
  // লগইন সিস্টেম থেকে এই ডেটা আসবে
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ডেমোর জন্য Role Switcher */}
      <div className="fixed bottom-4 right-4 z-[100] bg-white p-2 rounded-lg shadow-lg flex gap-2 border">
        <Button size="sm" onClick={() => setUserRole('user')} variant={userRole === 'user' ? 'default' : 'outline'}>User</Button>
        <Button size="sm" onClick={() => setUserRole('donor')} variant={userRole === 'donor' ? 'default' : 'outline'}>Donor</Button>
        <Button size="sm" onClick={() => setUserRole('admin')} variant={userRole === 'admin' ? 'default' : 'outline'}>Admin</Button>
      </div>

      <DashboardHeader userRole={userRole} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Mobile Sidebar-কে flex container থেকে বাইরে আনা হয়েছে */}
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
              <DashboardSidebar userRole={userRole} setSidebarOpen={setSidebarOpen} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 flex-shrink-0">
          <DashboardSidebar userRole={userRole} setSidebarOpen={setSidebarOpen} />
        </div>
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Nested Route-এর পেজগুলো এখানে রেন্ডার হবে */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;