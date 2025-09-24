import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";
import SettingsSection from "@/components/dashboard/Admin/SettingsSection";
import UserManagementSection from "@/components/dashboard/Admin/UserManagementSection";
import DonationHistorySection from "@/components/dashboard/Donor/DonationHistorySection";
import DonorOverviewSection from "@/components/dashboard/Donor/DonorOverviewSection";
import RequestHistorySection from "@/components/dashboard/User/RequestHistorySection";
import UserOverviewSection from "@/components/dashboard/User/UserOverviewSection";
import MessagesSection from "@/components/dashboard/common/MessagesSection";
import ProfileSection from "@/components/dashboard/common/ProfileSection";
import DashboardLayout from "@/components/layout/DashboardLayout";

import MainLayout from "@/components/layout/MainLayout";
import AboutPage from "@/pages/AboutPage";
import BecomeADonorPage from "@/pages/BecomeADonorPage";
import ContactPage from "@/pages/ContactPage";
// import DashboardPage from "@/pages/DashboardPage";
import ErrorPage from "@/pages/ErrorPage";
import FindBloodDonnerPage from "@/pages/FindBloodDonnerPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import { AdminDashboardPage } from "@/pages/dashboard/AdminDashboardPage";
import  { UserDonorDashboardPage } from "@/pages/dashboard/UserDonorDashboardPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout/>,
		errorElement:<ErrorPage/>,
		children: [
			{
				index:true,
				element:<HomePage/>
			},
			{
				path:'/find-blood-donner-page',
				element:<FindBloodDonnerPage/>
			},
			{
				path:'/become-a-donor-page',
				element:<BecomeADonorPage/>
			},
			{
				path:'/about-page',
				element:<AboutPage/>
			},
			{
				path:'/contact-page',
				element:<ContactPage/>
			},
			{
				path:'/login-page',
				element:<LoginPage/>
			},
			{
				path:'/register-page',
				element:<RegistrationPage/>
			},
			// {
			// 	path:'/dashboard-page',
			// 	element:<DashboardPage/>
			// },
			{
				path:'/dashboard-page',
				element:<UserDonorDashboardPage/>
			},
			{
				path:'/admin-dashboard-page',
				element:<AdminDashboardPage/>
			},

			
		]
	},
	 {
        // ড্যাশবোর্ডের জন্য প্রধান লেআউট
        // এই সম্পূর্ণ রুটটি একটি PrivateRoute দিয়ে সুরক্ষিত করা উচিত
        path: "/dashboard",
        element: <DashboardLayout  />, 
        errorElement: <ErrorPage />,
        children: [
            // Common Routes for all roles
            { path: "profile", element: <ProfileSection userRole="user" /> },
            { path: "messages", element: <MessagesSection userRole="user"/> },
            { path: "settings", element: <SettingsSection /> },

            // Admin Routes
            { path: "admin", element: <AdminOverviewSection /> }, // ডিফল্ট অ্যাডমিন পেজ
            { path: "admin/overview", element: <AdminOverviewSection /> },
            { path: "admin/users", element: <UserManagementSection /> },
            // ... অন্যান্য অ্যাডমিন রুট

            // Donor Routes
            { path: "donor", element: <DonorOverviewSection /> }, // ডিফল্ট ডোনার পেজ
            { path: "donor/overview", element: <DonorOverviewSection /> },
            { path: "donor/donation-history", element: <DonationHistorySection /> },
            // ... অন্যান্য ডোনার রুট

            // User (Requester) Routes
            { path: "", element: <UserOverviewSection /> }, // ডিফল্ট ইউজার পেজ
            { path: "user/overview", element: <UserOverviewSection /> },
            { path: "user/my-requests", element: <RequestHistorySection /> },
            // ... অন্যান্য ইউজার রুট
        ]
    },

]);







