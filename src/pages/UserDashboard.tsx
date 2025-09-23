/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Zap,
  Target,
} from "lucide-react"

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
  {
    id: "REQ-U003",
    bloodType: "O+",
    unitsNeeded: 3,
    hospital: "BIRDEM Hospital",
    requestDate: "2024-01-20",
    status: "Completed",
    urgency: "Urgent",
    donorMatched: "Multiple Donors",
    completedDate: "2024-01-21",
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
  {
    name: "Nasir Ahmed",
    bloodType: "O+",
    location: "Gulshan, Dhaka",
    distance: "3.8 km",
    rating: 4.7,
    totalDonations: 8,
    lastDonation: "3 weeks ago",
    availability: "Available",
    phone: "+880 1987-654321",
    preferredTime: "Afternoon",
    isVerified: true,
  },
]

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")


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
                <p className="text-xs text-muted-foreground font-medium">User Dashboard</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-6">
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
                  2
                </Badge>
              </Button>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 ring-2 ring-red-100">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-red-500 text-white font-semibold">AH</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-semibold">Ahmed Hassan</p>
                <p className="text-xs text-muted-foreground">Blood Type: O+</p>
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
              { id: "request", label: "Request Blood", icon: Heart, color: "text-red-600" },
              { id: "history", label: "My Requests", icon: History, color: "text-green-600" },
              { id: "donors", label: "Find Donors", icon: Search, color: "text-purple-600" },
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

            {/* Emergency Request Button */}
            <div className="mt-8 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold">
                <AlertCircle className="mr-2 h-4 w-4" />
                Emergency Request
              </Button>
              <p className="text-xs text-red-600 mt-2 text-center">For critical situations</p>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="animate-fade-in">
            {activeTab === "overview" && <UserOverviewSection />}
            {activeTab === "request" && <RequestBloodSection />}
            {activeTab === "history" && <RequestHistorySection />}
            {activeTab === "donors" && <FindDonorsSection />}
            {activeTab === "messages" && <UserMessagesSection />}
            {activeTab === "profile" && <UserProfileSection />}
          </div>
        </main>
      </div>
    </div>
  )
}

function UserOverviewSection() {
  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl"></div>
        <div className="relative p-8 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Welcome Back, Ahmed!
              </h2>
              <p className="text-lg text-muted-foreground mt-2">Your blood donation journey continues</p>
              <div className="flex items-center space-x-4 mt-4">
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
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
                <Heart className="h-24 w-24 text-red-500 relative z-10" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
                  <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
                </div>
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Requests */}
        <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-red-900">Recent Requests</CardTitle>
                <CardDescription className="text-red-600">Your blood request history</CardDescription>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <History className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userRequestHistory.slice(0, 3).map((request, i) => (
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
                    <p className="text-sm font-semibold">{request.id}</p>
                    <Badge className="bg-green-500 text-white">
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
                <CardTitle className="text-xl font-bold text-blue-900">Quick Actions</CardTitle>
                <CardDescription className="text-blue-600">Common tasks and shortcuts</CardDescription>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-12">
              <Heart className="mr-2 h-5 w-5" />
              Request Blood Now
            </Button>
            <Button variant="outline" className="w-full h-12 bg-transparent">
              <Search className="mr-2 h-5 w-5" />
              Find Nearby Donors
            </Button>
            <Button variant="outline" className="w-full h-12 bg-transparent">
              <MessageSquare className="mr-2 h-5 w-5" />
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

function RequestBloodSection() {
  const [formData, setFormData] = useState({
    bloodType: "",
    unitsNeeded: "",
    hospital: "",
    urgency: "",
    patientName: "",
    contactNumber: "",
    additionalInfo: "",
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Request Blood
        </h2>
        <p className="text-muted-foreground mt-2">Submit a new blood donation request</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Request Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl text-red-900">Blood Request Form</CardTitle>
              <CardDescription>Please fill in all required information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type *</label>
                  <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
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
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option value="">Select Urgency</option>
                  <option value="Critical">Critical (Within 2 hours)</option>
                  <option value="Urgent">Urgent (Within 6 hours)</option>
                  <option value="Normal">Normal (Within 24 hours)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="flex space-x-4">
                <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white h-12">
                  <Heart className="mr-2 h-5 w-5" />
                  Submit Request
                </Button>
                <Button variant="outline" className="px-8 h-12 bg-transparent">
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
              <CardTitle className="text-lg text-blue-900">Request Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Provide accurate patient information</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Select appropriate urgency level</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Include hospital contact details</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p>Be available for donor coordination</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-lg text-red-900">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="p-4 bg-red-500 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-red-900">24/7 Emergency Hotline</p>
                  <p className="text-2xl font-bold text-red-600">999</p>
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

function RequestHistorySection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Request History</h2>
          <p className="text-muted-foreground">Track all your blood donation requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
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
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {request.status}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-6 text-sm">
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
                    <div className="flex items-center space-x-4 text-sm">
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

                <div className="text-right space-y-3">
                  <Badge variant="outline" className="text-red-500 border-red-500 text-2xl px-4 py-2 font-bold">
                    {request.bloodType}
                  </Badge>
                  <div className="flex space-x-2">
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

function FindDonorsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Find Blood Donors</h2>
          <p className="text-muted-foreground">Search for available donors in your area</p>
        </div>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search by location..." className="w-64" />
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-4">
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
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-red-100">
                    <AvatarFallback className="bg-red-500 text-white text-lg font-semibold">
                      {donor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-lg">{donor.name}</h3>
                        {donor.isVerified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {donor.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {donor.distance} away
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{donor.rating}</span>
                      </div>
                      <span>{donor.totalDonations} donations</span>
                      <span>Last: {donor.lastDonation}</span>
                      <span>Prefers: {donor.preferredTime}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-3">
                  <Badge variant="outline" className="text-red-500 border-red-500 text-2xl px-4 py-2 font-bold">
                    {donor.bloodType}
                  </Badge>
                  <div className="space-y-2">
                    <Button className="w-full bg-red-500 hover:bg-red-600">
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

function UserMessagesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <p className="text-muted-foreground">Communication with donors and support team</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
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
              {
                from: "Dr. Nasir Ahmed",
                message: "Patient is stable now. Thank you for your quick response in arranging the donation.",
                time: "2 days ago",
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
                      msg.type === "donor"
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
                  <span className="text-sm">Donor Messages</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">System Updates</span>
                  <Badge variant="outline">1</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded border">
                  <span className="text-sm">Medical Team</span>
                  <Badge variant="outline">2</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UserProfileSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
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
                  <Input defaultValue="Ahmed Hassan" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Input defaultValue="O+" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue="+880 1712-999888" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue="ahmed.hassan@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue="House 123, Road 15, Dhanmondi, Dhaka-1205" />
              </div>
              <Button className="bg-red-500 hover:bg-red-600">Update Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Contact</label>
                  <Input placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+880 1XXX-XXXXXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Secondary Contact</label>
                  <Input placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+880 1XXX-XXXXXX" />
                </div>
              </div>
              <Button variant="outline">Save Emergency Contacts</Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
            <CardHeader>
              <CardTitle className="text-red-900">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-red-200">
                  <AvatarFallback className="bg-red-500 text-white text-2xl">AH</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Ahmed Hassan</h3>
                <p className="text-sm text-muted-foreground">Member since 2023</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile Complete</span>
                  <Badge className="bg-green-500">100%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Status</span>
                  <Badge className="bg-green-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Requests</span>
                  <Badge variant="outline">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

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
        </div>
      </div>
    </div>
  )
}
