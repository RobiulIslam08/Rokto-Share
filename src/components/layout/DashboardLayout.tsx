/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";


interface DashboardLayoutProps {
    children: ReactNode;
    navItems: any[];
    activeTab: string;
    setActiveTab: (id: string) => void;
    userRole: 'user' | 'donor' | 'admin';
}

export const DashboardLayout = ({ children, navItems, activeTab, setActiveTab, userRole }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={userRole} />
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-72"
              >
                <DashboardSidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <div className="hidden md:block w-72 flex-shrink-0">
          <DashboardSidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
        </div>
        <main className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};