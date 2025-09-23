"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Search,
  Bell,
  User,
  MapPin,
  Phone,
  Calendar,
  Clock,
  AlertCircle,
  Droplets,
  MessageSquare,
  History,
  Plus,
  Filter,
  Star,
  Activity,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  Users,
  Zap,
  Target,
  Menu,
  X,
} from "lucide-react"

const userData = {
  name: "Ahmed Hassan",
  bloodType: "O+",
  phone: "+880 1712-999888",
  email: "ahmed.hassan@email.com",
  address: "House 123, Road 15, Dhanmondi, Dhaka-1205",
  memberSince: "2023",
  totalRequests: 3,
  livesImpacted: 6,
  rating: 4.9,
  isVerified: true,
}

const donorData = {
  name: "Ahmed Hassan",
  bloodType: "O+",
  phone: "+880 1712-999888",
  email: "ahmed.hassan@email.com",
  address: "House 123, Road 15, Dhanmondi, Dhaka-1205",
  totalDonations: 15,
  livesImpacted: 45,
  lastDonation: "2024-02-15",
  nextEligible: "2024-05-15",
  memberSince: "2020",
  rating: 4.9,
  responseRate: "98%",
  isVerified: true,
}

const userRequestHistory = [
  {
    id: "REQ-U001",
    bloodType: "O+",
    unitsNeeded: 2,
    hospital: "Dhaka Medical College",
    requestDate: "2024-03-10",
    status: "Completed",
    urgency: "Critical",
    donorMatched: "Rahman Ali",
    completedDate: "2024-03-11",
  },
  {
    id: "REQ-U002",
    bloodType: "O+",
    unitsNeeded: 1,
    hospital: "Square Hospital",
    requestDate: "2024-02-15",
    status: "Completed",
    urgency: "Normal",
    donorMatched: "Karim Uddin",
    completedDate: "2024-02-16",
  },
]

const donationHistory = [
  {
    id: "DON-001",
    date: "2024-02-15",
    hospital: "Dhaka Medical College",
    recipient: "Ahmed Hassan",
    units: 1,
    status: "Completed",
    feedback: "Excellent donor, very cooperative",
    urgency: "Critical",
  },
  {
    id: "DON-002",
    date: "2024-01-10",
    hospital: "Square Hospital",
    recipient: "Fatima Begum",
    units: 2,
    status: "Completed",
    feedback: "Thank you for saving my life",
    urgency: "Urgent",
  },
]

const incomingRequests = [
  {
    id: "REQ-001",
    patient: "Rashid Ali",
    bloodType: "O+",
    unitsNeeded: 2,
    hospital: "Dhaka Medical College",
    urgency: "Critical",
    distance: "3.2 km",
    requestTime: "30 min ago",
    requesterPhone: "+880 1712-345678",
    condition: "Emergency Surgery",
  },
  {
    id: "REQ-002",
    patient: "Nasir Ahmed",
    bloodType: "O+",
    unitsNeeded: 1,
    hospital: "Square Hospital",
    urgency: "Urgent",
    distance: "5.8 km",
    requestTime: "2 hours ago",
    requesterPhone: "+880 1987-654321",
    condition: "Accident Victim",
  },
]

const availableDonors = [
  {
    name: "Rahman Ali",
    bloodType: "O+",
    location: "Dhanmondi, Dhaka",
    distance: "2.5 km",
    rating: 4.9,
    totalDonations: 15,
    lastDonation: "2 weeks ago",
    availability: "Available",
    phone: "+880 1712-345678",
    preferredTime: "Morning",
    isVerified: true,
  },
  {
    name: "Karim Uddin",
    bloodType: "O+",
    location: "Uttara, Dhaka",
    distance: "5.2 km",
    rating: 4.8,
    totalDonations: 12,
    lastDonation: "1 month ago",
    availability: "Available",
    phone: "+880 1555-123456",
    preferredTime: "Evening",
    isVerified: true,
  },
]

export  const UserDonorDashboardPage =  () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [userRole, setUserRole] = useState<"user" | "donor">("user")
  const [availability, setAvailability] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userNavItems = [
    { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600" },
    { id: "request", label: "Request Blood", icon: Heart, color: "text-red-600" },
    { id: "history", label: "My Requests", icon: History, color: "text-green-600" },
    { id: "donors", label: "Find Donors", icon: Search, color: "text-purple-600" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600" },
    { id: "profile", label: "My Profile", icon: User, color: "text-gray-600" },
  ]

  const donorNavItems = [
    { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600" },
    { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600" },
    { id: "history", label: "Donation History", icon: History, color: "text-green-600" },
    { id: "schedule", label: "My Schedule", icon: Calendar, color: "text-purple-600" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600" },
    { id: "profile", label: "My Profile", icon: User, color: "text-gray-600" },
  ]

  const navItems = userRole === "user" ? userNavItems : donorNavItems

  return (
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
                  BloodConnect
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && (userRole === "user" ? <UserOverviewSection /> : <DonorOverviewSection />)}
            {activeTab === "request" && userRole === "user" && <RequestBloodSection />}
            {activeTab === "requests" && userRole === "donor" && <BloodRequestsSection />}
            {activeTab === "history" && (userRole === "user" ? <RequestHistorySection /> : <DonationHistorySection />)}
            {activeTab === "donors" && userRole === "user" && <FindDonorsSection />}
            {activeTab === "schedule" && userRole === "donor" && <DonorScheduleSection />}
            {activeTab === "messages" && <MessagesSection userRole={userRole} />}
            {activeTab === "profile" && <ProfileSection userRole={userRole} />}
          </div>
        </main>
      </div>
    </div>
  )
}

function UserOverviewSection() {
  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, Ahmed!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2">Your blood donation journey continues</p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Profile Complete
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  <Droplets className="w-3 h-3 mr-1" />
                  Blood Type: O+
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Heart className="h-16 w-16 md:h-24 md:w-24 text-red-500 relative z-10" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Requests",
            value: "3",
            change: "All completed",
            changeType: "positive",
            icon: Heart,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Lives Saved",
            value: "6",
            change: "Through donations",
            changeType: "positive",
            icon: Target,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
          {
            title: "Response Time",
            value: "< 2hrs",
            change: "Average",
            changeType: "positive",
            icon: Clock,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Available Donors",
            value: "156",
            change: "In your area",
            changeType: "positive",
            icon: Search,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
          },
        ].map((stat, i) => (
          <Card key={i} className="card-hover border-0 shadow-lg">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
                  <stat.icon
                    className={`h-4 w-4 md:h-6 md:w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </div>
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50 text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">{stat.title}</h3>
                <p className="text-xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
        {/* Recent Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-red-900">Recent Requests</CardTitle>
                <CardDescription className="text-red-600">Your blood request history</CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-red-100 rounded-xl">
                <History className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRequestHistory.slice(0, 3).map((request, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 bg-red-50 font-bold text-sm md:text-lg px-2 md:px-3 py-1"
                  >
                    {request.bloodType}
                  </Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{request.id}</p>
                    <Badge className="bg-green-500 text-white text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {request.hospital} • {request.unitsNeeded} units • {request.requestDate}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Requests
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-blue-900">Quick Actions</CardTitle>
                <CardDescription className="text-blue-600">Common tasks and shortcuts</CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-blue-100 rounded-xl">
                <Zap className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-10 md:h-12">
              <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Request Blood Now
            </Button>
            <Button variant="outline" className="w-full h-10 md:h-12 bg-transparent">
              <Search className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Find Nearby Donors
            </Button>
            <Button variant="outline" className="w-full h-10 md:h-12 bg-transparent">
              <MessageSquare className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Contact Support
            </Button>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button variant="ghost" size="sm" className="text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                Schedule Request
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                <Bell className="mr-1 h-3 w-3" />
                Set Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DonorOverviewSection() {
  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-4 md:p-8 rounded-xl md:rounded-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, Ahmed!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mt-2">Thank you for being a life-saving hero</p>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Available for Donation
                </Badge>
                <Badge variant="outline" className="border-red-200 text-red-700">
                  <Award className="w-3 h-3 mr-1" />
                  Hero Donor
                </Badge>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  <Star className="w-3 h-3 mr-1" />
                  {donorData.rating} Rating
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block mt-4 lg:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Droplets className="h-16 w-16 md:h-24 md:w-24 text-red-500 relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Stats */}
      <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Donations",
            value: donorData.totalDonations.toString(),
            change: "Since " + donorData.memberSince,
            changeType: "positive",
            icon: Droplets,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Lives Impacted",
            value: donorData.livesImpacted.toString(),
            change: "3x multiplier",
            changeType: "positive",
            icon: Heart,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
          {
            title: "Response Rate",
            value: donorData.responseRate,
            change: "Excellent",
            changeType: "positive",
            icon: TrendingUp,
            gradient: "from-blue-500 to-blue-600",
            bgGradient: "from-blue-50 to-blue-100",
          },
          {
            title: "Next Eligible",
            value: "May 15",
            change: "2024",
            changeType: "neutral",
            icon: Calendar,
            gradient: "from-purple-500 to-purple-600",
            bgGradient: "from-purple-50 to-purple-100",
          },
        ].map((stat, i) => (
          <Card key={i} className="card-hover border-0 shadow-lg">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
                  <stat.icon
                    className={`h-4 w-4 md:h-6 md:w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}
                  />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "border-green-200 text-green-700 bg-green-50"
                      : "border-blue-200 text-blue-700 bg-blue-50"
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">{stat.title}</h3>
                <p className="text-xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incoming Requests & Recent Activity */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
        {/* Incoming Blood Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-red-900">Incoming Requests</CardTitle>
                <CardDescription className="text-red-600">People need your help</CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomingRequests.slice(0, 3).map((request, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 bg-red-50 font-bold text-sm md:text-lg px-2 md:px-3 py-1"
                  >
                    {request.bloodType}
                  </Badge>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{request.patient}</p>
                    <Badge
                      variant={
                        request.urgency === "Critical"
                          ? "destructive"
                          : request.urgency === "Urgent"
                            ? "default"
                            : "secondary"
                      }
                      className={`text-xs ${request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}`}
                    >
                      {request.urgency}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {request.hospital} • {request.distance} • {request.requestTime}
                  </p>
                  <p className="text-xs text-blue-600">{request.condition}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs px-2">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent px-2">
                    Details
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Requests ({incomingRequests.length})
            </Button>
          </CardContent>
        </Card>

        {/* Recent Donations */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg md:text-xl font-bold text-green-900">Recent Donations</CardTitle>
                <CardDescription className="text-green-600">Your donation history</CardDescription>
              </div>
              <div className="p-2 md:p-3 bg-green-100 rounded-xl">
                <History className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationHistory.slice(0, 3).map((donation, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-green-100">
                  <AvatarFallback className="bg-green-500 text-white font-semibold text-sm">
                    {donation.recipient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{donation.recipient}</p>
                    <Badge className="bg-green-500 text-white text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {donation.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {donation.hospital} • {donation.date} • {donation.units} unit(s)
                  </p>
                  <p className="text-xs text-green-600 italic">"{donation.feedback}"</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RequestBloodSection() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Request Blood
        </h2>
        <p className="text-muted-foreground mt-2">Submit a new blood donation request</p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl text-red-900">Blood Request Form</CardTitle>
              <CardDescription>Please fill in all required information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type *</label>
                  <select className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Units Needed *</label>
                  <Input
                    type="number"
                    placeholder="e.g., 2"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hospital/Medical Center *</label>
                <Input
                  placeholder="e.g., Dhaka Medical College Hospital"
                  className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Urgency Level *</label>
                <select className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Urgency</option>
                  <option value="Critical">Critical (Within 2 hours)</option>
                  <option value="Urgent">Urgent (Within 6 hours)</option>
                  <option value="Normal">Normal (Within 24 hours)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Patient Name *</label>
                  <Input
                    placeholder="Full name of patient"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number *</label>
                  <Input
                    placeholder="+880 1XXX-XXXXXX"
                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Information</label>
                <Textarea
                  placeholder="Any additional details about the patient's condition or special requirements..."
                  className="focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={4}
                />
              </div>

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white h-10 md:h-12">
                  <Heart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Submit Request
                </Button>
                <Button variant="outline" className="md:px-8 h-10 md:h-12 bg-transparent">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Guidelines */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-blue-900">Request Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Provide accurate patient information</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Select appropriate urgency level</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Include hospital contact details</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Be available for donor coordination</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-base md:text-lg text-red-900">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="p-3 md:p-4 bg-red-500 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center">
                  <Phone className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-900">24/7 Emergency Hotline</p>
                  <p className="text-xl md:text-2xl font-bold text-red-600">999</p>
                  <p className="text-sm text-red-700">For critical blood emergencies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BloodRequestsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">People who need your help</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Distance
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Clock className="mr-2 h-4 w-4" />
            Sort by Urgency
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {incomingRequests.map((request, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {request.id}
                    </Badge>
                    <Badge
                      variant={
                        request.urgency === "Critical"
                          ? "destructive"
                          : request.urgency === "Urgent"
                            ? "default"
                            : "secondary"
                      }
                      className={request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      {request.urgency}
                    </Badge>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">
                      {request.distance} away
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base md:text-lg">{request.patient}</h3>
                    <p className="text-muted-foreground text-sm">{request.condition}</p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-3 w-3" />
                      {request.hospital}
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {request.requestTime}
                    </span>
                    <span className="flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {request.requesterPhone}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-3">
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                    >
                      {request.bloodType}
                    </Badge>
                    <div className="text-sm mt-1">
                      <p className="font-medium">{request.unitsNeeded} units needed</p>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 min-w-[120px]">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Request
                    </Button>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function RequestHistorySection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Request History</h2>
          <p className="text-muted-foreground">Track all your blood donation requests</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {userRequestHistory.map((request, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {request.id}
                    </Badge>
                    <Badge
                      variant={
                        request.urgency === "Critical"
                          ? "destructive"
                          : request.urgency === "Urgent"
                            ? "default"
                            : "secondary"
                      }
                      className={request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                    >
                      {request.urgency}
                    </Badge>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <span className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {request.hospital}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        Requested: {request.requestDate}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Completed: {request.completedDate}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm">
                      <span className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        Donor: {request.donorMatched}
                      </span>
                      <span className="flex items-center">
                        <Droplets className="mr-2 h-4 w-4 text-red-500" />
                        {request.unitsNeeded} units received
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <Badge
                    variant="outline"
                    className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                  >
                    {request.bloodType}
                  </Badge>
                  <div className="flex flex-col md:flex-row lg:flex-col space-y-2 md:space-y-0 md:space-x-2 lg:space-x-0 lg:space-y-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Thank Donor
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DonationHistorySection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Donation History</h2>
          <p className="text-muted-foreground">Your life-saving contributions</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            <Award className="mr-2 h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-red-600">{donorData.totalDonations}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Total Donations</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-green-600">{donorData.livesImpacted}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Lives Impacted</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-blue-600">{donorData.rating}</div>
            <div className="text-xs md:text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold text-purple-600">4</div>
            <div className="text-xs md:text-sm text-muted-foreground">Years Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History List */}
      <div className="grid gap-4">
        {donationHistory.map((donation, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4 flex-1">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16 ring-2 ring-green-100 mx-auto md:mx-0">
                    <AvatarFallback className="bg-green-500 text-white text-sm md:text-lg font-semibold">
                      {donation.recipient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <h3 className="font-semibold text-base md:text-lg">{donation.recipient}</h3>
                        <Badge variant="outline" className="text-xs font-mono">
                          {donation.id}
                        </Badge>
                        <Badge
                          variant={
                            donation.urgency === "Critical"
                              ? "destructive"
                              : donation.urgency === "Urgent"
                                ? "default"
                                : "secondary"
                          }
                          className={donation.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                          {donation.urgency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-1">{donation.hospital}</p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <span className="flex items-center justify-center md:justify-start">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {donation.date}
                      </span>
                      <span className="flex items-center justify-center md:justify-start">
                        <Droplets className="mr-2 h-4 w-4 text-red-500" />
                        {donation.units} unit(s) donated
                      </span>
                      <Badge className="bg-green-500 hover:bg-green-600 mx-auto md:mx-0">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donation.status}
                      </Badge>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 italic">"{donation.feedback}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    View Certificate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function FindDonorsSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Find Blood Donors</h2>
          <p className="text-muted-foreground">Search for available donors in your area</p>
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Input placeholder="Search by location..." className="md:w-64" />
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="p-2 border rounded-lg text-sm">
              <option>All Blood Types</option>
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
            <select className="p-2 border rounded-lg text-sm">
              <option>Distance</option>
              <option>Within 5km</option>
              <option>Within 10km</option>
              <option>Within 20km</option>
            </select>
            <select className="p-2 border rounded-lg text-sm">
              <option>Availability</option>
              <option>Available Now</option>
              <option>Available This Week</option>
            </select>
            <Button className="bg-red-500 hover:bg-red-600">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donors List */}
      <div className="grid gap-4">
        {availableDonors.map((donor, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-4 flex-1">
                  <Avatar className="h-12 w-12 md:h-16 md:w-16 ring-2 ring-red-100 mx-auto md:mx-0">
                    <AvatarFallback className="bg-red-500 text-white text-sm md:text-lg font-semibold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3 text-center md:text-left flex-1">
                    <div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <h3 className="font-semibold text-base md:text-lg">{donor.name}</h3>
                        {donor.isVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center justify-center md:justify-start">
                          <MapPin className="mr-1 h-3 w-3" />
                          {donor.location}
                        </span>
                        <span className="flex items-center justify-center md:justify-start">
                          <Clock className="mr-1 h-3 w-3" />
                          {donor.distance} away
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm">
                      <div className="flex items-center justify-center md:justify-start space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{donor.rating}</span>
                      </div>
                      <span>{donor.totalDonations} donations</span>
                      <span>Last: {donor.lastDonation}</span>
                      <span>Prefers: {donor.preferredTime}</span>
                    </div>

                    <div className="flex justify-center md:justify-start">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3">
                  <Badge
                    variant="outline"
                    className="text-red-500 border-red-500 text-lg md:text-2xl px-3 md:px-4 py-1 md:py-2 font-bold"
                  >
                    {donor.bloodType}
                  </Badge>
                  <div className="flex flex-col space-y-2 min-w-[120px]">
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Contact Donor
                    </Button>
                    <Button variant="outline" className="w-full text-xs bg-transparent">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DonorScheduleSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Schedule</h2>
        <p className="text-muted-foreground">Manage your donation appointments and availability</p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No upcoming appointments</p>
                <Button className="mt-4 bg-red-500 hover:bg-red-600">Schedule Donation</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Preferred Days</label>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Button key={day} variant="outline" size="sm" className="text-xs bg-transparent">
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Preferred Time</label>
                  <select className="w-full p-2 border rounded-lg mt-2">
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 5PM)</option>
                    <option>Evening (5PM - 8PM)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Distance</label>
                  <select className="w-full p-2 border rounded-lg mt-2">
                    <option>Within 5km</option>
                    <option>Within 10km</option>
                    <option>Within 20km</option>
                    <option>Anywhere in city</option>
                  </select>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-red-900">Donation Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="p-3 md:p-4 bg-red-500 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="font-semibold text-base md:text-lg text-red-900">Eligible to Donate</h3>
                <p className="text-sm text-red-700">Next eligible: {donorData.nextEligible}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Last Donation</span>
                  <span className="font-medium">{donorData.lastDonation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Since</span>
                  <span className="font-medium">89 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Required Gap</span>
                  <span className="font-medium">90 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark Available
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <XCircle className="mr-2 h-4 w-4" />
                Mark Unavailable
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Break
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MessagesSection({ userRole }: { userRole: "user" | "donor" }) {
  const userMessages = [
    {
      from: "Rahman Ali",
      message: "I'm available for donation tomorrow morning. Please confirm the hospital location.",
      time: "2 hours ago",
      type: "donor",
      unread: true,
    },
    {
      from: "BloodConnect Support",
      message: "Your blood request REQ-U001 has been successfully completed. Thank you!",
      time: "1 day ago",
      type: "system",
      unread: false,
    },
  ]

  const donorMessages = [
    {
      from: "Ahmed Hassan",
      message: "Thank you so much for saving my life. I am forever grateful for your donation.",
      time: "1 hour ago",
      type: "recipient",
      unread: true,
    },
    {
      from: "BloodConnect Support",
      message: "Congratulations! You've reached 15 donations and earned the Hero Donor badge.",
      time: "2 days ago",
      type: "system",
      unread: false,
    },
  ]

  const messages = userRole === "user" ? userMessages : donorMessages

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">
          Communication with {userRole === "user" ? "donors and support team" : "recipients and support team"}
        </p>
      </div>

      <div className="grid gap-4 md:gap-4 lg:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex space-x-3 p-3 md:p-4 rounded-lg border transition-colors ${
                  msg.unread ? "bg-red-50 border-red-200" : "bg-gray-50"
                }`}
              >
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarFallback
                    className={
                      msg.type === "donor" || msg.type === "recipient"
                        ? "bg-green-500 text-white"
                        : msg.type === "system"
                          ? "bg-blue-500 text-white"
                          : "bg-purple-500 text-white"
                    }
                  >
                    {msg.from
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                    <p className={`text-sm font-medium ${msg.unread ? "text-red-900" : ""}`}>{msg.from}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-muted-foreground">{msg.time}</p>
                      {msg.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                    </div>
                  </div>
                  <p className={`text-sm ${msg.unread ? "text-red-800" : "text-muted-foreground"}`}>{msg.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              <Phone className="mr-2 h-4 w-4" />
              Emergency Hotline
            </Button>
            <div className="space-y-2 pt-4 border-t">
              <h4 className="font-medium text-sm">Message Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">{userRole === "user" ? "Donor Messages" : "Thank You Messages"}</span>
                  <Badge variant="outline">{userRole === "user" ? "3" : "8"}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">System Updates</span>
                  <Badge variant="outline">{userRole === "user" ? "1" : "3"}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Medical Team</span>
                  <Badge variant="outline">{userRole === "user" ? "2" : "5"}</Badge>
                </div>
                {userRole === "donor" && (
                  <div className="flex items-center justify-between p-2 rounded border">
                    <span className="text-sm">Urgent Requests</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ProfileSection({ userRole }: { userRole: "user" | "donor" }) {
  const currentData = userRole === "user" ? userData : donorData

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">
          Manage your {userRole === "user" ? "account" : "donor"} information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue={currentData.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Input defaultValue={currentData.bloodType} disabled />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue={currentData.phone} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue={currentData.email} />
                </div>
              </div>
              {userRole === "donor" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input defaultValue="28" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input defaultValue="70" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue={currentData.address} />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Update Profile</Button>
            </CardContent>
          </Card>

          {userRole === "user" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Primary Contact</label>
                    <Input placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Secondary Contact</label>
                    <Input placeholder="Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Save Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Health Checkup</label>
                    <Input defaultValue="2024-01-15" type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Health Status</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Fair</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Medical Conditions (if any)</label>
                  <Textarea placeholder="List any medical conditions or medications..." />
                </div>
                <Button variant="outline" className="bg-transparent">
                  Update Health Info
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card
            className={`border-0 shadow-lg bg-gradient-to-br ${userRole === "user" ? "from-red-50 to-red-100" : "from-green-50 to-green-100"}`}
          >
            <CardHeader>
              <CardTitle className={userRole === "user" ? "text-red-900" : "text-green-900"}>
                {userRole === "user" ? "Account Status" : "Donor Status"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar
                  className={`h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 ring-4 ${userRole === "user" ? "ring-red-200" : "ring-green-200"}`}
                >
                  <AvatarFallback
                    className={`${userRole === "user" ? "bg-red-500" : "bg-green-500"} text-white text-lg md:text-2xl`}
                  >
                    AH
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-base md:text-lg">{currentData.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {userRole === "user"
                    ? `Member since ${currentData.memberSince}`
                    : `Hero Donor since ${currentData.memberSince}`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Status</span>
                  <Badge className={userRole === "user" ? "bg-green-500" : "bg-green-500"}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                {userRole === "donor" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Donor Level</span>
                      <Badge className="bg-yellow-500">
                        <Award className="w-3 h-3 mr-1" />
                        Hero
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Donations</span>
                      <Badge variant="outline">{donorData.totalDonations}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{donorData.rating}</span>
                      </div>
                    </div>
                  </>
                )}
                {userRole === "user" && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Requests</span>
                    <Badge variant="outline">{userData.totalRequests}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {userRole === "donor" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Hero Donor</p>
                    <p className="text-xs text-muted-foreground">15+ donations</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Star className="h-6 w-6 md:h-8 md:w-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">5-Star Donor</p>
                    <p className="text-xs text-muted-foreground">Excellent rating</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Users className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Life Saver</p>
                    <p className="text-xs text-muted-foreground">45+ lives impacted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Updates</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Alerts</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Donor Responses</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
