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
import DashboardPage from "@/pages/dashboard/DashboardPage";
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
        // ড্যাশবোর্ডের জন্য একটিমাত্র প্রধান রুট
        // এই রুটটি এবং এর ভেতরের সকল রুট প্রোটেক্টেড হবে
        path: "/dashboard",
        element: <DashboardPage />,
        // এখানে Nested Route যোগ করা যেতে পারে যদি প্রতিটি ট্যাব একটি আলাদা URL হয়
        // children: [
        //   { index: true, element: <DashboardOverview /> },
        //   { path: "profile", element: <DashboardProfile /> },
        // ]
    },

]);







