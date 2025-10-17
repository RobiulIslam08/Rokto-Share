"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Heart,
  Search,
  Bell,
  User,



  AlertCircle,
  Droplets,
  MessageSquare,
  History,

 
  Activity,

  Award,

  Menu,
  X,
} from "lucide-react"
import UserOverviewSection from "@/components/dashboard/User/UserOverviewSection"
import RequestHistorySection from "@/components/dashboard/User/RequestHistorySection"
import FindDonorsSection from "@/components/dashboard/User/FindDonorsSection"
import ProfileSection from "@/components/dashboard/common/ProfileSection"
import { userData } from "@/lib/dashboard/user/userData"
import { donorData } from "@/lib/dashboard/donor/donorData"
import MessagesSection from "@/components/dashboard/common/MessagesSection"
import DonorOverviewSection from "@/components/dashboard/Donor/DonorOverviewSection"
import BloodRequestsSection from "@/components/dashboard/Donor/BloodRequestsSection"
import DonationHistorySection from "@/components/dashboard/Donor/DonationHistorySection"








export  const UserDonorDashboardPage =  () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole, setUserRole] = useState<"user" | "donor">("user")
  const [availability, setAvailability] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userNavItems = [
    { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600" },
   
    { id: "history", label: "My Requests", icon: History, color: "text-green-600" },
    { id: "donors", label: "Find Donors", icon: Search, color: "text-purple-600" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600" },
    { id: "profile", label: "My Profile", icon: User, color: "text-gray-600" },
  ]

  const donorNavItems = [
    { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600" },
    { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600" },
    { id: "history", label: "Donation History", icon: History, color: "text-green-600" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600" },
    { id: "profile", label: "My Profile", icon: User, color: "text-gray-600" },
  ]

  const navItems = userRole === "user" ? userNavItems : donorNavItems

  return (
    <>
      <title>
        {userRole === "donor" ? "Donor Dashboard" : "My Dashboard"} | RoktoShare
      </title>
      <meta
        name="description"
        content="আপনার RoktoShare প্রোফাইল, রক্তের অনুরোধ, এবং দানের ইতিহাস পরিচালনা করুন। জীবন বাঁচানোর জন্য আপনার ব্যক্তিগত ড্যাশবোর্ড।"
      />
      
      {/* গুরুত্বপূর্ণ: এই ট্যাগটি সার্চ ইঞ্জিনকে এই ব্যক্তিগত পেজটি ইনডেক্স করা থেকে বিরত রাখে। 
        ব্যবহারকারীর ড্যাশবোর্ড পাবলিক সার্চ রেজাল্টে আসা উচিত নয়।
      */}
      <meta name="robots" content="noindex, nofollow, noarchive" />


         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
        <div className="flex h-16 md:h-20 items-center px-4 md:px-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-20"></div>
                <Heart className="h-8 w-8 md:h-10 md:w-10 text-red-500 relative z-10" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                   RoktoShare
                </h1>
                <p className="text-xs text-muted-foreground font-medium hidden md:block">
                  {userRole === "user" ? "User Dashboard" : "Donor Dashboard"}
                </p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 md:space-x-6">
            <div className="flex items-center space-x-2 md:space-x-3 bg-white/50 rounded-full p-1">
              <Button
                size="sm"
                variant={userRole === "user" ? "default" : "ghost"}
                className={`rounded-full text-xs md:text-sm px-2 md:px-4 h-8 md:h-9 ${
                  userRole === "user" ? "bg-blue-500 hover:bg-blue-600 text-white" : "hover:bg-white/50"
                }`}
                onClick={() => {
                  setUserRole("user")
                  setActiveTab("overview")
                }}
              >
                <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                User
              </Button>
              <Button
                size="sm"
                variant={userRole === "donor" ? "default" : "ghost"}
                className={`rounded-full text-xs md:text-sm px-2 md:px-4 h-8 md:h-9 ${
                  userRole === "donor" ? "bg-green-500 hover:bg-green-600 text-white" : "hover:bg-white/50"
                }`}
                onClick={() => {
                  setUserRole("donor")
                  setActiveTab("overview")
                }}
              >
                <Droplets className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                Donor
              </Button>
            </div>

            {userRole === "donor" && (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-xs font-medium">Available</span>
                <button
                  onClick={() => setAvailability(!availability)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    availability ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      availability ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            )}

            <div className="flex items-center space-x-2 md:space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-red-50 hover:text-red-600 transition-colors h-8 w-8 md:h-10 md:w-10"
              >
                <Search className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-red-50 hover:text-red-600 transition-colors h-8 w-8 md:h-10 md:w-10"
              >
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-red-500 text-white text-xs animate-pulse">
                  {userRole === "user" ? "2" : "5"}
                </Badge>
              </Button>
            </div>

            <div className="flex items-center space-x-2 md:space-x-3">
              <Avatar className="h-8 w-8 md:h-12 md:w-12 ring-2 ring-red-100">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-red-500 text-white font-semibold text-xs md:text-base">
                  {userRole === "user" ? "AH" : "AH"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">{userData.name}</p>
                <p className="text-xs text-muted-foreground">
                  Blood Type: {userData.bloodType} • {userRole === "donor" ? "Hero Donor" : "Member"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 md:w-72 glass-effect border-r border-white/20 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <nav className="space-y-2 md:space-y-3 p-4 md:p-6 pt-20 md:pt-6">
            <div className="mb-6 md:mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Menu</h3>
            </div>

            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-10 md:h-12 text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600"
                    : "hover:bg-white/50 hover:shadow-md"
                }`}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
              >
                <item.icon
                  className={`mr-2 md:mr-3 h-4 w-4 md:h-5 md:w-5 ${activeTab === item.id ? "text-white" : item.color}`}
                />
                <span className="font-medium text-sm md:text-base">{item.label}</span>
                {activeTab === item.id && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </Button>
            ))}

            {/* Emergency/Stats Card */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
              {userRole === "user" ? (
                <>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm">
                    <AlertCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Emergency Request
                  </Button>
                  <p className="text-xs text-red-600 mt-2 text-center">For critical situations</p>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                    <div className="p-1.5 md:p-2 bg-green-500 rounded-lg">
                      <Award className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-900">Hero Donor</p>
                      <p className="text-xs text-green-600">15+ Donations</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Lives Saved</span>
                      <span className="font-bold text-green-900">{donorData.livesImpacted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Rating</span>
                      <span className="font-bold text-green-900">{donorData.rating}⭐</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-[#cccccc] bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && (userRole === "user" ? <UserOverviewSection /> : <DonorOverviewSection />)}
          
            {activeTab === "requests" && userRole === "donor" && <BloodRequestsSection />}
            {activeTab === "history" && (userRole === "user" ? <RequestHistorySection /> : <DonationHistorySection />)}
            {activeTab === "donors" && userRole === "user" && <FindDonorsSection />}
            {activeTab === "messages" && <MessagesSection userRole={userRole} />}
            {activeTab === "profile" && <ProfileSection />}
          </div>
        </main>
      </div>
    </div>
    </>
 
  )
}
















