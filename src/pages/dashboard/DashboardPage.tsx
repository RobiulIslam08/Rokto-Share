// // // "use client";
// // // import { useState } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { DashboardLayout } from "@/components/layout/DashboardLayout";

// // // // প্রতিটি ভূমিকার জন্য পেজ কম্পোনেন্টগুলো ইম্পোর্ট করুন
// // // // import AdminOverview from "./admin/AdminOverview";
// // // // import DonorOverview from "./donor/DonorOverview";
// // // // import UserOverview from "./user/UserOverview";

// // // const DashboardPage = () => {
// // //     const [userRole, setUserRole] = useState<'user' | 'donor' | 'admin'>('admin');
// // //     const [activeTab, setActiveTab] = useState('overview');

// // //     const renderContent = () => {
// // //         // এখানে ভূমিকা এবং সক্রিয় ট্যাব অনুযায়ী সঠিক কম্পোনেন্ট দেখান
// // //         if (userRole === 'admin') return <div>Admin Overview Content</div>; // <AdminOverview />
// // //         if (userRole === 'donor') return <div>Donor Overview Content</div>; // <DonorOverview />
// // //         return <div>User Overview Content</div>; // <UserOverview />
// // //     };

// // //     return (
// // //         <div>
// // //             {/* ডেমোর জন্য Role Switcher */}
// // //             <div className="fixed bottom-4 right-4 z-[100] bg-white p-2 rounded-lg shadow-lg flex gap-2">
// // //                 <Button size="sm" onClick={() => { setUserRole('user'); setActiveTab('overview'); }} variant={userRole === 'user' ? 'default' : 'outline'}>User</Button>
// // //                 <Button size="sm" onClick={() => { setUserRole('donor'); setActiveTab('overview'); }} variant={userRole === 'donor' ? 'default' : 'outline'}>Donor</Button>
// // //                 <Button size="sm" onClick={() => { setUserRole('admin'); setActiveTab('overview'); }} variant={userRole === 'admin' ? 'default' : 'outline'}>Admin</Button>
// // //             </div>

// // //             <DashboardLayout
// // //                 userRole={userRole}
// // //                 activeTab={activeTab}
// // //                 setActiveTab={setActiveTab}
// // //                 navItems={[]} // এই ডেমোর জন্য খালি রাখা হয়েছে, DashboardSidebar এর ভেতর থেকে আসবে
// // //             >
// // //                 {renderContent()}
// // //             </DashboardLayout>
// // //         </div>
// // //     );
// // // };

// // // export default DashboardPage;

// // "use client";
// // import { useState } from "react";

// // import type { UserRole } from "@/types";
// // import { DashboardLayout } from "@/components/layout/DashboardLayout";
// // import UserOverviewSection from "@/components/dashboard/User/UserOverviewSection";
// // import DonorOverviewSection from "@/components/dashboard/Donor/DonorOverviewSection";
// // import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";



// // // প্রতিটি ভূমিকার জন্য পেজ কম্পোনেন্টগুলো ইম্পোর্ট করুন

// // // import UserManagement from "@/components/dashboard/admin/UserManagement"; // উদাহরণ

// // const DashboardPage = () => {
// //     // লগইন সিস্টেম থেকে এই ভূমিকাটি আসবে। ডেমোর জন্য আমরা state ব্যবহার করছি।
// //     const [userRole] = useState<UserRole>('user');
// //     const [activeTab, setActiveTab] = useState('overview');

// //     // এই ফাংশনটি সক্রিয় ট্যাব অনুযায়ী সঠিক কম্পোনেন্ট রেন্ডার করবে
// //     const renderContent = () => {
// //         // এখানে ভূমিকা এবং সক্রিয় ট্যাব অনুযায়ী আপনার সকল ড্যাশবোর্ড কম্পোনেন্ট যুক্ত করুন
// //         if (userRole === 'admin') {
// //             switch(activeTab) {
// //                 case 'overview': return <AdminOverviewSection />;
// //                 // case 'users': return <UserManagement />;
// //                 // ... অন্যান্য অ্যাডমিন ট্যাব
// //                 default: return <AdminOverviewSection />;
// //             }
// //         }
// //         if (userRole === 'donor') {
// //             switch(activeTab) {
// //                 case 'overview': return <DonorOverviewSection />;
// //                 // ... অন্যান্য ডোনার ট্যাব
// //                 default: return <DonorOverviewSection />;
// //             }
// //         }
// //         if (userRole === 'user') { // 'user' এর পরিবর্তে 'requester' ব্যবহার করা হলো
// //             switch(activeTab) {
// //                 case 'overview': return <UserOverviewSection />;
// //                 // ... অন্যান্য ইউজার ট্যাব
// //                 default: return <UserOverviewSection />;
// //             }
// //         }
// //     };

// //     return (
// //         <div>
// //             {/* ডেমোর জন্য Role Switcher (এটি আপনি পরে বাদ দিতে পারেন) */}
            

// //             <DashboardLayout
// //                 userRole={userRole}
// //                 activeTab={activeTab}
// //                 setActiveTab={setActiveTab}
// //             >
// //                 {renderContent()}
// //             </DashboardLayout>
// //         </div>
// //     );
// // };

// // export default DashboardPage;
// "use client";
// import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";
// import DonorOverviewSection from "@/components/dashboard/Donor/DonorOverviewSection";
// import UserOverviewSection from "@/components/dashboard/User/UserOverviewSection";
// import DashboardLayout from "@/components/layout/DashboardLayout";

// import type { UserRole } from "@/types";
// import { useState } from "react";


// const DashboardPage = () => {
//     const [userRole, setUserRole] = useState<UserRole>('admin');
    
//     const renderContent = () => {
//         if (userRole === 'admin') return <AdminOverviewSection />;
//         if (userRole === 'donor') return <DonorOverviewSection />;
//         return <UserOverviewSection />;
//     };

//     return (
//         <DashboardLayout userRole={userRole} setUserRole={setUserRole}>
//             {renderContent()}
//         </DashboardLayout>
//     );
// };

// export default DashboardPage;