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
  Filter,
  Star,
  Activity,
  CheckCircle,
  XCircle,
  Award,
  TrendingUp,
  Users,
} from "lucide-react"

const donorStats = {
  totalDonations: 15,
  livesImpacted: 45,
  lastDonation: "2024-02-15",
  nextEligible: "2024-05-15",
  bloodType: "O+",
  memberSince: "2020",
  rating: 4.9,
  responseRate: "98%",
}

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
  {
    id: "DON-003",
    date: "2023-12-05",
    hospital: "BIRDEM Hospital",
    recipient: "Karim Ahmed",
    units: 1,
    status: "Completed",
    feedback: "Very professional and caring donor",
    urgency: "Normal",
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
  {
    id: "REQ-003",
    patient: "Salma Khatun",
    bloodType: "O+",
    unitsNeeded: 1,
    hospital: "Holy Family Hospital",
    urgency: "Normal",
    distance: "7.1 km",
    requestTime: "5 hours ago",
    requesterPhone: "+880 1555-123456",
    condition: "Routine Surgery",
  },
]

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [availability, setAvailability] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/30">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
        <div className="flex h-20 items-center px-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-20"></div>
                <Heart className="h-10 w-10 text-red-500 relative z-10" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  BloodConnect
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Donor Dashboard</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-6">
            {/* Availability Toggle */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Available for Donation</span>
              <button
                onClick={() => setAvailability(!availability)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  availability ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    availability ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 transition-colors">
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs animate-pulse">
                  5
                </Badge>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-red-100">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-red-500 text-white font-semibold">RA</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Rahman Ali</p>
                <p className="text-xs text-muted-foreground">Blood Type: O+ • Hero Donor</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 glass-effect border-r border-white/20 shadow-xl">
          <nav className="space-y-3 p-6">
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Menu</h3>
            </div>

            {[
              { id: "overview", label: "Dashboard", icon: Activity, color: "text-blue-600" },
              { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600" },
              { id: "history", label: "Donation History", icon: History, color: "text-green-600" },
              { id: "schedule", label: "My Schedule", icon: Calendar, color: "text-purple-600" },
              { id: "messages", label: "Messages", icon: MessageSquare, color: "text-orange-600" },
              { id: "profile", label: "My Profile", icon: User, color: "text-gray-600" },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-12 text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600"
                    : "hover:bg-white/50 hover:shadow-md"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-white" : item.color}`} />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
              </Button>
            ))}

            {/* Donor Stats Card */}
            <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Award className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-900">Hero Donor</p>
                  <p className="text-xs text-green-600">15+ Donations</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">Lives Saved</span>
                  <span className="font-bold text-green-900">{donorStats.livesImpacted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Rating</span>
                  <span className="font-bold text-green-900">{donorStats.rating}⭐</span>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && <DonorOverviewSection />}
            {activeTab === "requests" && <BloodRequestsSection />}
            {activeTab === "history" && <DonationHistorySection />}
            {activeTab === "schedule" && <DonorScheduleSection />}
            {activeTab === "messages" && <DonorMessagesSection />}
            {activeTab === "profile" && <DonorProfileSection />}
          </div>
        </main>
      </div>
    </div>
  )
}

function DonorOverviewSection() {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, Rahman!
              </h2>
              <p className="text-lg text-muted-foreground mt-2">Thank you for being a life-saving hero</p>
              <div className="flex items-center space-x-4 mt-4">
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
                  {donorStats.rating} Rating
                </Badge>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Droplets className="h-24 w-24 text-red-500 relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Donations",
            value: donorStats.totalDonations.toString(),
            change: "Since " + donorStats.memberSince,
            changeType: "positive",
            icon: Droplets,
            gradient: "from-red-500 to-red-600",
            bgGradient: "from-red-50 to-red-100",
          },
          {
            title: "Lives Impacted",
            value: donorStats.livesImpacted.toString(),
            change: "3x multiplier",
            changeType: "positive",
            icon: Heart,
            gradient: "from-green-500 to-green-600",
            bgGradient: "from-green-50 to-green-100",
          },
          {
            title: "Response Rate",
            value: donorStats.responseRate,
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
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    stat.changeType === "positive"
                      ? "border-green-200 text-green-700 bg-green-50"
                      : "border-blue-200 text-blue-700 bg-blue-50"
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Incoming Requests & Recent Activity */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Incoming Blood Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-red-900">Incoming Requests</CardTitle>
                <CardDescription className="text-red-600">People need your help</CardDescription>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {incomingRequests.slice(0, 3).map((request, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <div className="flex-shrink-0">
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 bg-red-50 font-bold text-lg px-3 py-1"
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
                      className={request.urgency === "Urgent" ? "bg-orange-500 hover:bg-orange-600" : ""}
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
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
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
                <CardTitle className="text-xl font-bold text-green-900">Recent Donations</CardTitle>
                <CardDescription className="text-green-600">Your donation history</CardDescription>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <History className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {donationHistory.slice(0, 3).map((donation, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
              >
                <Avatar className="h-12 w-12 ring-2 ring-green-100">
                  <AvatarFallback className="bg-green-500 text-white font-semibold">
                    {donation.recipient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{donation.recipient}</p>
                    <Badge className="bg-green-500 text-white">
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

function BloodRequestsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blood Requests</h2>
          <p className="text-muted-foreground">People who need your help</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter by Distance
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Sort by Urgency
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {incomingRequests.map((request, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
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
                    <h3 className="font-semibold text-lg">{request.patient}</h3>
                    <p className="text-muted-foreground">{request.condition}</p>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
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

                <div className="text-right space-y-3">
                  <div className="text-center">
                    <Badge variant="outline" className="text-red-500 border-red-500 text-2xl px-4 py-2 font-bold">
                      {request.bloodType}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{request.unitsNeeded} units needed</p>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Accept Request
                    </Button>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
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

function DonationHistorySection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Donation History</h2>
          <p className="text-muted-foreground">Your life-saving contributions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
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
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{donorStats.totalDonations}</div>
            <div className="text-sm text-muted-foreground">Total Donations</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{donorStats.livesImpacted}</div>
            <div className="text-sm text-muted-foreground">Lives Impacted</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{donorStats.rating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-sm text-muted-foreground">Years Active</div>
          </CardContent>
        </Card>
      </div>

      {/* Donation History List */}
      <div className="grid gap-4">
        {donationHistory.map((donation, i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-green-100">
                    <AvatarFallback className="bg-green-500 text-white text-lg font-semibold">
                      {donation.recipient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{donation.recipient}</h3>
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

                    <div className="flex items-center space-x-6 text-sm">
                      <span className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {donation.date}
                      </span>
                      <span className="flex items-center">
                        <Droplets className="mr-2 h-4 w-4 text-red-500" />
                        {donation.units} unit(s) donated
                      </span>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donation.status}
                      </Badge>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 italic">"{donation.feedback}"</p>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-current" />
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

function DonorScheduleSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Schedule</h2>
        <p className="text-muted-foreground">Manage your donation appointments and availability</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-8">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
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
                <div className="p-4 bg-red-500 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-red-900">Eligible to Donate</h3>
                <p className="text-sm text-red-700">Next eligible: {donorStats.nextEligible}</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Last Donation</span>
                  <span className="font-medium">{donorStats.lastDonation}</span>
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

function DonorMessagesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communication with recipients and support team</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
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
              {
                from: "Dr. Sarah Khan",
                message: "The patient is doing well after the transfusion. Thank you for your quick response.",
                time: "1 week ago",
                type: "medical",
                unread: false,
              },
            ].map((msg, i) => (
              <div
                key={i}
                className={`flex space-x-3 p-4 rounded-lg border transition-colors ${
                  msg.unread ? "bg-red-50 border-red-200" : "bg-gray-50"
                }`}
              >
                <Avatar>
                  <AvatarFallback
                    className={
                      msg.type === "recipient"
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
                  <div className="flex items-center justify-between">
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
            <CardTitle>Message Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Thank You Messages</span>
                </div>
                <Badge variant="outline">8</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">System Updates</span>
                </div>
                <Badge variant="outline">3</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium">Medical Team</span>
                </div>
                <Badge variant="outline">5</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium">Urgent Requests</span>
                </div>
                <Badge variant="destructive">2</Badge>
              </div>
            </div>
            <Button className="w-full bg-red-500 hover:bg-red-600">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DonorProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">Manage your donor information and preferences</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue="Rahman Ali" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Input defaultValue="O+" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue="+880 1712-345678" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue="rahman.ali@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input defaultValue="28" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input defaultValue="70" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue="House 456, Road 27, Dhanmondi, Dhaka-1209" />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Update Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Health Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              <Button variant="outline">Update Health Info</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="text-green-900">Donor Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-green-200">
                  <AvatarFallback className="bg-green-500 text-white text-2xl">RA</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Rahman Ali</h3>
                <p className="text-sm text-muted-foreground">Hero Donor since 2020</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Status</span>
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Donor Level</span>
                  <Badge className="bg-yellow-500">
                    <Award className="w-3 h-3 mr-1" />
                    Hero
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Donations</span>
                  <Badge variant="outline">{donorStats.totalDonations}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{donorStats.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <Award className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="font-medium text-sm">Hero Donor</p>
                  <p className="text-xs text-muted-foreground">15+ donations</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <Star className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="font-medium text-sm">5-Star Donor</p>
                  <p className="text-xs text-muted-foreground">Excellent rating</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Users className="h-8 w-8 text-green-500" />
                <div>
                  <p className="font-medium text-sm">Life Saver</p>
                  <p className="text-xs text-muted-foreground">45+ lives impacted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
