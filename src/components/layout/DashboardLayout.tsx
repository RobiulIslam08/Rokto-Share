/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import type { UserRole } from "@/types";
// import { Button } from "../ui/button";
// import { DashboardHeader } from "../dashboard/common/DashboardHeader";
// import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";

// const DashboardLayout = () => {
//   // লগইন সিস্টেম থেকে এই ডেটা আসবে
//   const [userRole, setUserRole] = useState<UserRole>('user');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* ডেমোর জন্য Role Switcher */}
//       <div className="fixed bottom-4 right-4 z-[100] bg-white p-2 rounded-lg shadow-lg flex gap-2 border">
//         <Link to="user"><Button size="sm" onClick={() => setUserRole('user')} variant={userRole === 'user' ? 'default' : 'outline'}>User</Button></Link>
//        <Link to="donor">
//         <Button size="sm" onClick={() => setUserRole('donor')} variant={userRole === 'donor' ? 'default' : 'outline'}>Donor</Button></Link>
//         <Link to="admin"><Button size="sm" onClick={() => setUserRole('admin')} variant={userRole === 'admin' ? 'default' : 'outline'}>Admin</Button></Link>
//       </div>

//       <DashboardHeader userRole={userRole} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Mobile Sidebar-কে flex container থেকে বাইরে আনা হয়েছে */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 z-40 md:hidden"
//               onClick={() => setSidebarOpen(false)}
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="fixed inset-y-0 left-0 z-50 w-72"
//             >
//               <DashboardSidebar userRole={userRole} setSidebarOpen={setSidebarOpen} />
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
      
//       <div className="flex">
//         {/* Desktop Sidebar */}
//         <div className="hidden md:block w-72 flex-shrink-0">
//           <DashboardSidebar userRole={userRole} setSidebarOpen={setSidebarOpen} />
//         </div>
        
//         <main className="flex-1 p-8 overflow-y-auto">
//           {/* Nested Route-এর পেজগুলো এখানে রেন্ডার হবে */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
"use client";
import { useState, useEffect } from "react";
import {  Outlet, useNavigate, useLocation } from "react-router-dom";
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

  // ✅ Get user's actual role from Redux
  const userActualRole = user?.role || "user";

  // ✅ Determine allowed roles based on user's actual role
  const allowedRoles: UserRole[] = 
    userActualRole === "admin" 
      ? ["user", "donor", "admin"]
      : userActualRole === "donor"
      ? ["user", "donor"]
      : ["user"];

  // ✅ Set initial view based on URL or user role
  useEffect(() => {
    if (!user) {
      navigate("/login-page");
      return;
    }

    // Extract current role from URL path
    const pathSegments = location.pathname.split("/");
    const roleFromPath = pathSegments[2] as UserRole; // /dashboard/[role]/...

    if (roleFromPath && allowedRoles.includes(roleFromPath)) {
      setCurrentView(roleFromPath);
    } else {
      // Default to user's actual role if path doesn't contain valid role
      setCurrentView(userActualRole);
      navigate(`/dashboard/${userActualRole}`);
    }
  }, [location.pathname, user, userActualRole, navigate]);

  // ✅ Handle role switching
  const handleRoleSwitch = (role: UserRole) => {
    if (!allowedRoles.includes(role)) return;
    
    setCurrentView(role);
    navigate(`/dashboard/${role}`);
  };

  // ✅ Redirect to login if no user
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Dynamic Role Switcher - Only show allowed roles */}
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

      {/* Mobile Sidebar */}
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
        {/* Desktop Sidebar */}
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