import AdminOverviewSection from "@/components/dashboard/Admin/AdminOverviewSection";
import DonorManagementSection from "@/components/dashboard/Admin/DonorManagementSection";
import RequestManagementSection from "@/components/dashboard/Admin/RequestManagementSection";
import SettingsSection from "@/components/dashboard/Admin/SettingsSection";
import UserManagementSection from "@/components/dashboard/Admin/UserManagementSection";
import BloodRequestsSection from "@/components/dashboard/Donor/BloodRequestsSection";
import DonationHistorySection from "@/components/dashboard/Donor/DonationHistorySection";
import DonorOverviewSection from "@/components/dashboard/Donor/DonorOverviewSection";
import DonorRequestDetailsPage from "@/components/dashboard/Donor/DonorRequestDetailsPage";
import BloodRequestDetailsPage from "@/components/dashboard/User/BloodRequestDetailsPage";

import RequestHistorySection from "@/components/dashboard/User/RequestHistorySection";
import UserOverviewSection from "@/components/dashboard/User/UserOverviewSection";
import MessagesSection from "@/components/dashboard/common/MessagesSection";
import ProfileSection from "@/components/dashboard/common/ProfileSection";
import DashboardLayout from "@/components/layout/DashboardLayout";

import MainLayout from "@/components/layout/MainLayout";
import AboutPage from "@/pages/AboutPage";
import BecomeADonorPage from "@/pages/BecomeADonorPage";
import ContactPage from "@/pages/ContactPage";
import ErrorPage from "@/pages/ErrorPage";
import FindBloodDonnerPage from "@/pages/FindBloodDonnerPage";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
// import { AdminDashboardPage } from "@/pages/dashboard/AdminDashboardPage";
// import { UserDonorDashboardPage } from "@/pages/dashboard/UserDonorDashboardPage";

// এই দুটি পেইজ এখন আর প্রয়োজন নেই কারণ আমরা একটি কেন্দ্রীয় ড্যাশবোর্ড ব্যবহার করছি
// import { AdminDashboardPage } from "@/pages/dashboard/AdminDashboardPage";
// import { UserDonorDashboardPage } from "@/pages/dashboard/UserDonorDashboardPage";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "find-blood-donner-page",
        element: <FindBloodDonnerPage />,
      },
      {
        path: "become-a-donor-page",
        element: <BecomeADonorPage />,
      },
      {
        path: "about-page",
        element: <AboutPage />,
      },
      {
        path: "contact-page",
        element: <ContactPage />,
      },
      {
        path: "login-page",
        element: <LoginPage />,
      },
      {
        path: "register-page",
        element: <RegistrationPage />,
      },
      // {
      //   path: "admin-dashboard-page",
      //   element: <AdminDashboardPage />,
      // },
      // {
      //   path: "dashboard-page",
      //   element: <UserDonorDashboardPage />,
      // },
    ],
  },
  {
    // ড্যাশবোর্ডের জন্য প্রধান এবং কেন্দ্রীভূত লেআউট
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Common Routes for all roles
      { path: "profile", element: <ProfileSection userRole="user" /> },
      { path: "messages", element: <MessagesSection userRole="user" /> },
      
      {
            path: "request-details/:id",
            element: <BloodRequestDetailsPage />,
          },

      // Admin Routes (Nested)
      {
        path: "admin",
        children: [
          { index: true, element: <AdminOverviewSection /> }, // /dashboard/admin এর জন্য ডিফল্ট
          { path: "users", element: <UserManagementSection /> },
          { path: "donors", element: <DonorManagementSection /> },
          { path: "requests", element: <RequestManagementSection /> },
          { path: "settings", element: <SettingsSection /> },
        ],
      },

      // Donor Routes (Nested)
      {
        path: "donor",
        children: [
          { index: true, element: <DonorOverviewSection /> }, // /dashboard/donor এর জন্য ডিফল্ট
          { path: "donation-history", element: <DonationHistorySection /> },
          { path: "blood-requests", element: <BloodRequestsSection /> },
              { path: "request-details/:id", element: <DonorRequestDetailsPage /> }, 

        ],
      },

      // User (Requester) Routes (Nested)
      {
        path: "user",
        children: [
          { index: true, element: <UserOverviewSection /> }, // /dashboard/user এর জন্য ডিফল্ট
          { path: "my-requests", element: <RequestHistorySection /> },
          
        ],
      },
    ],
  },
]);
