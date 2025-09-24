// // // /* eslint-disable @typescript-eslint/no-explicit-any */
// // // "use client";
// // // import { useState, type ReactNode } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";
// // // import { DashboardHeader } from "../dashboard/common/DashboardHeader";


// // // interface DashboardLayoutProps {
// // //     children: ReactNode;
// // //     navItems: any[];
// // //     activeTab: string;
// // //     setActiveTab: (id: string) => void;
// // //     userRole: 'user' | 'donor' | 'admin';
// // // }

// // // export const DashboardLayout = ({ children, navItems, activeTab, setActiveTab, userRole }: DashboardLayoutProps) => {
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={userRole} />
// // //       <div className="flex">
// // //         <AnimatePresence>
// // //           {sidebarOpen && (
// // //             <>
// // //               <motion.div
// // //                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// // //                 className="fixed inset-0 bg-black/60 z-40 md:hidden"
// // //                 onClick={() => setSidebarOpen(false)}
// // //               />
// // //               <motion.div
// // //                 initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
// // //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// // //                 className="fixed inset-y-0 left-0 z-50 w-72"
// // //               >
// // //                 <DashboardSidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
// // //               </motion.div>
// // //             </>
// // //           )}
// // //         </AnimatePresence>
// // //         <div className="hidden md:block w-72 flex-shrink-0">
// // //           <DashboardSidebar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
// // //         </div>
// // //         <main className="flex-1 p-8 overflow-y-auto">
// // //           <AnimatePresence mode="wait">
// // //             <motion.div
// // //               key={activeTab}
// // //               initial={{ opacity: 0, y: 20 }}
// // //               animate={{ opacity: 1, y: 0 }}
// // //               exit={{ opacity: 0, y: -20 }}
// // //               transition={{ duration: 0.5, ease: "easeOut" }}
// // //             >
// // //               {children}
// // //             </motion.div>
// // //           </AnimatePresence>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // };
// // "use client";
// // import { useState, type ReactNode } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { DashboardHeader } from "../dashboard/common/DashboardHeader";
// // import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";
// // import type { UserRole } from "@/types";


// // interface DashboardLayoutProps {
// //     children: ReactNode;
// //     userRole: UserRole;
// //     activeTab: string;
// //     setActiveTab: (id: string) => void;
// // }

// // export const DashboardLayout = ({ children, userRole, activeTab, setActiveTab }: DashboardLayoutProps) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <DashboardHeader
// //         sidebarOpen={sidebarOpen} 
// //         setSidebarOpen={setSidebarOpen} 
// //         userRole={userRole}
// //       />
// //       <div className="flex">
// //         {/* Mobile Sidebar & Overlay */}
// //         <AnimatePresence>
// //           {sidebarOpen && (
// //             <>
// //               <motion.div
// //                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //                 className="fixed inset-0 bg-black/60 z-40 md:hidden"
// //                 onClick={() => setSidebarOpen(false)}
// //               />
// //               <motion.div
// //                 initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
// //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
// //                 className="fixed inset-y-0 left-0 z-50 w-72"
// //               >
// //                 <DashboardSidebar
// //                     userRole={userRole} 
// //                     activeTab={activeTab} 
// //                     setActiveTab={setActiveTab} 
// //                     setSidebarOpen={setSidebarOpen} 
// //                 />
// //               </motion.div>
// //             </>
// //           )}
// //         </AnimatePresence>

// //         {/* Desktop Sidebar */}
// //         <div className="hidden md:block w-72 flex-shrink-0">
// //           <DashboardSidebar 
// //             userRole={userRole} 
// //             activeTab={activeTab} 
// //             setActiveTab={setActiveTab} 
// //             setSidebarOpen={setSidebarOpen} 
// //           />
// //         </div>

// //         {/* Main Content */}
// //         <main className="flex-1 p-8 overflow-y-auto">
// //           <AnimatePresence mode="wait">
// //             <motion.div
// //               key={activeTab}
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.5, ease: "easeOut" }}
// //             >
// //               {children}
// //             </motion.div>
// //           </AnimatePresence>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };
// "use client";
// import { useState, type ReactNode } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import type { UserRole } from "@/types";
// import { DashboardHeader } from "../dashboard/common/DashboardHeader";
// import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";


// interface DashboardLayoutProps {
//     children: ReactNode;
//     userRole: UserRole;
//     setUserRole: (role: UserRole) => void;
// }

// export const DashboardLayout = ({ children, userRole, setUserRole }: DashboardLayoutProps) => {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState("overview");
//     const [availability, setAvailability] = useState(true);

//     return (
//         <div className="min-h-screen bg-background">
//             <DashboardHeader
//                 sidebarOpen={sidebarOpen} 
//                 setSidebarOpen={setSidebarOpen} 
//                 userRole={userRole}
//                 setUserRole={setUserRole}
//                 setActiveTab={setActiveTab}
//                 availability={availability}
//                 setAvailability={setAvailability}
//             />
//             <div className="flex">
//                 <AnimatePresence>
//                     {sidebarOpen && (
//                         <>
//                             <motion.div
//                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                                 className="fixed inset-0 bg-black/60 z-40 md:hidden"
//                                 onClick={() => setSidebarOpen(false)}
//                             />
//                             <motion.div
//                                 initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
//                                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                                 className="fixed inset-y-0 left-0 z-50 w-72"
//                             >
//                                 <DashboardSidebar userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
//                             </motion.div>
//                         </>
//                     )}
//                 </AnimatePresence>
//                 <div className="hidden md:block w-72 flex-shrink-0">
//                     <DashboardSidebar userRole={userRole} activeTab={activeTab} setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} />
//                 </div>
//                 <main className="flex-1 p-8 overflow-y-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

"use client";
import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { UserRole } from "@/types";
import { Button } from "../ui/button";
import { DashboardHeader } from "../dashboard/common/DashboardHeader";
import { DashboardSidebar } from "../dashboard/common/DashboardSidebar";


const DashboardLayout = () => {
    // লগইন সিস্টেম থেকে এই ডেটা আসবে
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userRole, setUserRole] = useState<UserRole>('admin');
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // যদি ব্যবহারকারী লগইন করা না থাকে, তাকে লগইন পেজে পাঠিয়ে দেওয়া হবে
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* ডেমোর জন্য Role Switcher */}
            <div className="fixed bottom-4 right-4 z-[100] bg-white p-2 rounded-lg shadow-lg flex gap-2 border">
                <Button size="sm" onClick={() => setUserRole('user')} variant={userRole === 'user' ? 'default' : 'outline'}>User</Button>
                <Button size="sm" onClick={() => setUserRole('donor')} variant={userRole === 'donor' ? 'default' : 'outline'}>Donor</Button>
                <Button size="sm" onClick={() => setUserRole('admin')} variant={userRole === 'admin' ? 'default' : 'outline'}>Admin</Button>
            </div>

            <DashboardHeader userRole={userRole} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex">
                {/* Mobile Sidebar */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 z-40 md:hidden"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="fixed inset-y-0 left-0 z-50 w-72">
                                <DashboardSidebar userRole={userRole} setSidebarOpen={setSidebarOpen} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
                
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