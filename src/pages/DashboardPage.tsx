
// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Heart,
//   Users,
//   MessageSquare,
//   Bell,
//   Search,
//   Filter,
//   Calendar,
//   MapPin,
//   Phone,
//   Mail,
//   Activity,
//   TrendingUp,
//   UserCheck,
//   AlertCircle,
//   Droplets,
//   Clock,
//   Award,
//   Zap,
//   Target,
//   BarChart3,
// } from "lucide-react"

// const donorsData = [
//   {
//     name: "Mohammad Rahman",
//     bloodType: "O+",
//     phone: "+880 1712-345678",
//     email: "rahman@email.com",
//     location: "Dhanmondi, Dhaka",
//     lastDonation: "2024-01-15",
//     totalDonations: 12,
//     status: "Available",
//     age: 28,
//     weight: 70,
//     memberSince: "2020",
//     nextEligible: "2024-04-15",
//     preferredTime: "Morning",
//     isEmergencyContact: true,
//     avatar: "/placeholder.svg?height=64&width=64",
//   },
//   {
//     name: "Ayesha Khatun",
//     bloodType: "A-",
//     phone: "+880 1987-654321",
//     email: "ayesha@email.com",
//     location: "Gulshan, Dhaka",
//     lastDonation: "2024-02-20",
//     totalDonations: 8,
//     status: "Not Available",
//     age: 25,
//     weight: 55,
//     memberSince: "2021",
//     nextEligible: "2024-05-20",
//     preferredTime: "Evening",
//     isEmergencyContact: false,
//     avatar: "/placeholder.svg?height=64&width=64",
//   },
//   {
//     name: "Karim Uddin",
//     bloodType: "B+",
//     phone: "+880 1555-123456",
//     email: "karim@email.com",
//     location: "Uttara, Dhaka",
//     lastDonation: "2024-01-30",
//     totalDonations: 15,
//     status: "Available",
//     age: 32,
//     weight: 75,
//     memberSince: "2019",
//     nextEligible: "2024-04-30",
//     preferredTime: "Afternoon",
//     isEmergencyContact: true,
//     avatar: "/placeholder.svg?height=64&width=64",
//   },
// ]

// const recipientsData = [
//   {
//     name: "Ahmed Hassan",
//     patientId: "P-2024-001",
//     bloodType: "O+",
//     phone: "+880 1712-999888",
//     hospital: "Dhaka Medical College",
//     lastReceived: "2024-03-10",
//     unitsReceived: 3,
//     condition: "Surgery",
//     status: "Stable",
//   },
//   {
//     name: "Fatima Begum",
//     patientId: "P-2024-002",
//     bloodType: "A-",
//     phone: "+880 1987-777666",
//     hospital: "Square Hospital",
//     lastReceived: "2024-03-08",
//     unitsReceived: 2,
//     condition: "Accident",
//     status: "Critical",
//   },
// ]

// const adminsData = [
//   {
//     name: "Dr. Nasir Ahmed",
//     role: "Chief Medical Officer",
//     email: "nasir@bloodconnect.com",
//     phone: "+880 1711-555444",
//     joinDate: "2023-01-15",
//     lastActive: "2 hours ago",
//     permissions: ["user_management", "request_approval", "system_config"],
//     status: "Active",
//     managedRequests: 156,
//   },
//   {
//     name: "Sarah Khan",
//     role: "Operations Manager",
//     email: "sarah@bloodconnect.com",
//     phone: "+880 1988-333222",
//     joinDate: "2023-03-20",
//     lastActive: "1 day ago",
//     permissions: ["donor_management", "communication"],
//     status: "Active",
//     managedRequests: 89,
//   },
// ]

// export default function BloodDonationDashboard() {
//   const [activeTab, setActiveTab] = useState("overview")

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/30">
//       <header className="sticky top-0 z-50 glass-effect border-b border-white/20 shadow-lg">
//         <div className="flex h-20 items-center px-8">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-3">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-20"></div>
//                 <Heart className="h-10 w-10 text-red-500 relative z-10" fill="currentColor" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
//                   BloodConnect
//                 </h1>
//                 <p className="text-xs text-muted-foreground font-medium">Saving Lives Together</p>
//               </div>
//             </div>
//           </div>

//           <div className="ml-auto flex items-center space-x-6">
//             <div className="flex items-center space-x-3">
//               <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600 transition-colors">
//                 <Search className="h-5 w-5" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="relative hover:bg-red-50 hover:text-red-600 transition-colors"
//               >
//                 <Bell className="h-5 w-5" />
//                 <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs animate-pulse">
//                   3
//                 </Badge>
//               </Button>
//             </div>
//             <div className="flex items-center space-x-3">
//               <Avatar className="h-12 w-12 ring-2 ring-red-100">
//                 <AvatarImage src="/placeholder.svg?height=48&width=48" />
//                 <AvatarFallback className="bg-red-500 text-white font-semibold">AD</AvatarFallback>
//               </Avatar>
//               <div className="hidden md:block">
//                 <p className="text-sm font-semibold">Admin User</p>
//                 <p className="text-xs text-muted-foreground">System Administrator</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         <aside className="w-72 glass-effect border-r border-white/20 shadow-xl">
//           <nav className="space-y-3 p-6">
//             <div className="mb-8">
//               <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Navigation</h3>
//             </div>

//             {[
//               { id: "overview", label: "Overview", icon: BarChart3, color: "text-blue-600" },
//               { id: "profiles", label: "Profiles", icon: Users, color: "text-green-600" },
//               { id: "requests", label: "Blood Requests", icon: Heart, color: "text-red-600" },
//               { id: "messages", label: "Messages", icon: MessageSquare, color: "text-purple-600" },
//               { id: "notifications", label: "Notifications", icon: Bell, color: "text-orange-600" },
//             ].map((item) => (
//               <Button
//                 key={item.id}
//                 variant={activeTab === item.id ? "default" : "ghost"}
//                 className={`w-full justify-start h-12 text-left transition-all duration-200 ${
//                   activeTab === item.id
//                     ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600"
//                     : "hover:bg-white/50 hover:shadow-md"
//                 }`}
//                 onClick={() => setActiveTab(item.id)}
//               >
//                 <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? "text-white" : item.color}`} />
//                 <span className="font-medium">{item.label}</span>
//                 {activeTab === item.id && <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>}
//               </Button>
//             ))}

//             <div className="mt-12 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="p-2 bg-red-500 rounded-lg">
//                   <Target className="h-4 w-4 text-white" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-red-900">Quick Stats</p>
//                   <p className="text-xs text-red-600">Today's Impact</p>
//                 </div>
//               </div>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-red-700">Lives Saved</span>
//                   <span className="font-bold text-red-900">47</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-red-700">Active Donors</span>
//                   <span className="font-bold text-red-900">156</span>
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </aside>

//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="animate-fade-in">
//             {activeTab === "overview" && <OverviewSection />}
//             {activeTab === "profiles" && <ProfilesSection />}
//             {activeTab === "requests" && <RequestsSection />}
//             {activeTab === "messages" && <MessagesSection />}
//             {activeTab === "notifications" && <NotificationsSection />}
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// function OverviewSection() {
//   return (
//     <div className="space-y-8 animate-slide-up">
//       <div className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl"></div>
//         <div className="relative p-8 rounded-2xl">
//           <div className="flex items-center justify-between">
//             <div>
//               <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
//                 Dashboard Overview
//               </h2>
//               <p className="text-lg text-muted-foreground mt-2">Welcome to your blood donation management dashboard</p>
//               <div className="flex items-center space-x-4 mt-4">
//                 <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
//                   <Zap className="w-3 h-3 mr-1" />
//                   System Online
//                 </Badge>
//                 <Badge variant="outline" className="border-blue-200 text-blue-700">
//                   <Clock className="w-3 h-3 mr-1" />
//                   Last Updated: 2 min ago
//                 </Badge>
//               </div>
//             </div>
//             <div className="hidden lg:block">
//               <div className="relative">
//                 <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse opacity-20"></div>
//                 <Droplets className="h-24 w-24 text-red-500 relative z-10" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {[
//           {
//             title: "Total Donors",
//             value: "2,847",
//             change: "+12%",
//             changeType: "positive",
//             icon: Users,
//             gradient: "from-blue-500 to-blue-600",
//             bgGradient: "from-blue-50 to-blue-100",
//           },
//           {
//             title: "Active Requests",
//             value: "47",
//             change: "+3 new today",
//             changeType: "warning",
//             icon: Heart,
//             gradient: "from-red-500 to-red-600",
//             bgGradient: "from-red-50 to-red-100",
//           },
//           {
//             title: "Successful Donations",
//             value: "1,234",
//             change: "+8%",
//             changeType: "positive",
//             icon: TrendingUp,
//             gradient: "from-green-500 to-green-600",
//             bgGradient: "from-green-50 to-green-100",
//           },
//           {
//             title: "Pending Messages",
//             value: "23",
//             change: "5 urgent",
//             changeType: "critical",
//             icon: MessageSquare,
//             gradient: "from-purple-500 to-purple-600",
//             bgGradient: "from-purple-50 to-purple-100",
//           },
//         ].map((stat, i) => (
//           <Card key={i} className="card-hover border-0 shadow-lg">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgGradient}`}>
//                   <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
//                 </div>
//                 <Badge
//                   variant="outline"
//                   className={`${
//                     stat.changeType === "positive"
//                       ? "border-green-200 text-green-700 bg-green-50"
//                       : stat.changeType === "warning"
//                         ? "border-orange-200 text-orange-700 bg-orange-50"
//                         : "border-red-200 text-red-700 bg-red-50"
//                   }`}
//                 >
//                   {stat.change}
//                 </Badge>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground mb-2">{stat.title}</h3>
//                 <p className="text-3xl font-bold text-foreground">{stat.value}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid gap-8 lg:grid-cols-2">
//         <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-red-50/30">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-xl font-bold text-red-900">Recent Blood Requests</CardTitle>
//                 <CardDescription className="text-red-600">Latest urgent blood donation requests</CardDescription>
//               </div>
//               <div className="p-3 bg-red-100 rounded-xl">
//                 <Heart className="h-6 w-6 text-red-600" />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {[
//               {
//                 name: "Ahmed Rahman",
//                 bloodType: "O+",
//                 location: "Dhaka Medical",
//                 urgency: "Critical",
//                 time: "5 min ago",
//               },
//               {
//                 name: "Fatima Khan",
//                 bloodType: "A-",
//                 location: "Square Hospital",
//                 urgency: "Urgent",
//                 time: "12 min ago",
//               },
//               { name: "Karim Uddin", bloodType: "B+", location: "BIRDEM", urgency: "Normal", time: "1 hour ago" },
//             ].map((request, i) => (
//               <div
//                 key={i}
//                 className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
//               >
//                 <Avatar className="h-12 w-12 ring-2 ring-red-100">
//                   <AvatarFallback className="bg-red-500 text-white font-semibold">
//                     {request.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 space-y-1">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-semibold">{request.name}</p>
//                     <Badge
//                       variant="outline"
//                       className={`text-xs ${
//                         request.urgency === "Critical"
//                           ? "border-red-200 text-red-700 bg-red-50"
//                           : request.urgency === "Urgent"
//                             ? "border-orange-200 text-orange-700 bg-orange-50"
//                             : "border-blue-200 text-blue-700 bg-blue-50"
//                       }`}
//                     >
//                       {request.urgency}
//                     </Badge>
//                   </div>
//                   <p className="text-xs text-muted-foreground">
//                     {request.location} • {request.time}
//                   </p>
//                 </div>
//                 <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50 font-bold text-lg px-3 py-1">
//                   {request.bloodType}
//                 </Badge>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         <Card className="card-hover border-0 shadow-xl bg-gradient-to-br from-white to-green-50/30">
//           <CardHeader className="pb-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <CardTitle className="text-xl font-bold text-green-900">Active Donors</CardTitle>
//                 <CardDescription className="text-green-600">Recently registered and active donors</CardDescription>
//               </div>
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Users className="h-6 w-6 text-green-600" />
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {[
//               { name: "Rashid Ali", bloodType: "O+", lastDonation: "2 weeks ago", status: "Available", donations: 15 },
//               { name: "Nasir Ahmed", bloodType: "A+", lastDonation: "1 month ago", status: "Available", donations: 8 },
//               {
//                 name: "Salma Begum",
//                 bloodType: "B-",
//                 lastDonation: "3 weeks ago",
//                 status: "Not Available",
//                 donations: 12,
//               },
//             ].map((donor, i) => (
//               <div
//                 key={i}
//                 className="flex items-center space-x-4 p-4 rounded-xl bg-white/60 hover:bg-white/80 transition-colors"
//               >
//                 <Avatar className="h-12 w-12 ring-2 ring-green-100">
//                   <AvatarFallback className="bg-green-500 text-white font-semibold">
//                     {donor.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 space-y-1">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-semibold">{donor.name}</p>
//                     <div className="flex items-center space-x-2">
//                       <Award className="h-4 w-4 text-yellow-500" />
//                       <span className="text-xs font-medium text-yellow-600">{donor.donations} donations</span>
//                     </div>
//                   </div>
//                   <p className="text-xs text-muted-foreground">Last: {donor.lastDonation}</p>
//                 </div>
//                 <div className="text-right space-y-2">
//                   <Badge variant="outline" className="text-red-600 border-red-300 bg-red-50 font-bold">
//                     {donor.bloodType}
//                   </Badge>
//                   <Badge
//                     variant={donor.status === "Available" ? "default" : "secondary"}
//                     className={`text-xs ${
//                       donor.status === "Available" ? "bg-green-500 hover:bg-green-600" : "bg-gray-400"
//                     }`}
//                   >
//                     {donor.status}
//                   </Badge>
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// function ProfilesSection() {
  

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">User & Donor Profiles</h2>
//           <p className="text-muted-foreground">Manage user accounts and donor information</p>
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button variant="outline" size="sm">
//             <Filter className="mr-2 h-4 w-4" />
//             Filter
//           </Button>
//           <Button variant="outline" size="sm">
//             <Search className="mr-2 h-4 w-4" />
//             Search
//           </Button>
//           <Button size="sm" className="bg-red-500 hover:bg-red-600">
//             <UserCheck className="mr-2 h-4 w-4" />
//             Add User
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="donors" className="space-y-4">
//         <TabsList className="grid w-full grid-cols-3">
//           <TabsTrigger value="donors">Donors ({donorsData.length})</TabsTrigger>
//           <TabsTrigger value="recipients">Recipients (15)</TabsTrigger>
//           <TabsTrigger value="admins">Admins (3)</TabsTrigger>
//         </TabsList>

//         <TabsContent value="donors" className="space-y-4">
//           <div className="grid gap-4">
//             {donorsData.map((donor, i) => (
//               <Card key={i} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <Avatar className="h-16 w-16">
//                         <AvatarImage src={donor.avatar || "/placeholder.svg"} />
//                         <AvatarFallback className="bg-red-500 text-white text-lg">
//                           {donor.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="space-y-3">
//                         <div>
//                           <h3 className="font-semibold text-lg">{donor.name}</h3>
//                           <p className="text-sm text-muted-foreground">
//                             Age: {donor.age} • Weight: {donor.weight}kg
//                           </p>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                           <div className="flex items-center text-muted-foreground">
//                             <Phone className="mr-2 h-4 w-4" />
//                             {donor.phone}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Mail className="mr-2 h-4 w-4" />
//                             {donor.email}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <MapPin className="mr-2 h-4 w-4" />
//                             {donor.location}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             Last: {donor.lastDonation}
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-4">
//                           <div className="flex items-center space-x-2">
//                             <div className="h-2 w-2 rounded-full bg-green-500"></div>
//                             <span className="text-sm text-green-600 font-medium">Verified Donor</span>
//                           </div>
//                           {donor.isEmergencyContact && (
//                             <Badge variant="outline" className="text-red-500 border-red-500">
//                               Emergency Contact
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right space-y-3">
//                       <div className="text-center">
//                         <Badge variant="outline" className="text-red-500 border-red-500 text-2xl px-4 py-2 font-bold">
//                           {donor.bloodType}
//                         </Badge>
//                       </div>

//                       <div className="space-y-1">
//                         <p className="text-sm font-medium">{donor.totalDonations} donations</p>
//                         <p className="text-xs text-muted-foreground">Since {donor.memberSince}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <Badge
//                           variant={donor.status === "Available" ? "default" : "secondary"}
//                           className={donor.status === "Available" ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"}
//                         >
//                           {donor.status}
//                         </Badge>

//                         <div className="flex space-x-1">
//                           <Button size="sm" variant="outline" className="text-xs bg-transparent">
//                             View Profile
//                           </Button>
//                           <Button size="sm" className="text-xs bg-red-500 hover:bg-red-600">
//                             Contact
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4 pt-4 border-t">
//                     <div className="grid grid-cols-3 gap-4 text-sm">
//                       <div>
//                         <p className="text-muted-foreground">Health Status</p>
//                         <p className="font-medium text-green-600">Excellent</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Next Eligible</p>
//                         <p className="font-medium">{donor.nextEligible}</p>
//                       </div>
//                       <div>
//                         <p className="text-muted-foreground">Preferred Time</p>
//                         <p className="font-medium">{donor.preferredTime}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="recipients" className="space-y-4">
//           <div className="grid gap-4">
//             {recipientsData.map((recipient, i) => (
//               <Card key={i} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <Avatar className="h-16 w-16">
//                         <AvatarFallback className="bg-blue-500 text-white text-lg">
//                           {recipient.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="space-y-3">
//                         <div>
//                           <h3 className="font-semibold text-lg">{recipient.name}</h3>
//                           <p className="text-sm text-muted-foreground">Patient ID: {recipient.patientId}</p>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                           <div className="flex items-center text-muted-foreground">
//                             <Phone className="mr-2 h-4 w-4" />
//                             {recipient.phone}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <MapPin className="mr-2 h-4 w-4" />
//                             {recipient.hospital}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             Received: {recipient.lastReceived}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Activity className="mr-2 h-4 w-4" />
//                             Condition: {recipient.condition}
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right space-y-3">
//                       <Badge variant="outline" className="text-red-500 border-red-500 text-2xl px-4 py-2 font-bold">
//                         {recipient.bloodType}
//                       </Badge>

//                       <div className="space-y-1">
//                         <p className="text-sm font-medium">{recipient.unitsReceived} units received</p>
//                         <Badge variant={recipient.status === "Stable" ? "default" : "destructive"}>
//                           {recipient.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="admins" className="space-y-4">
//           <div className="grid gap-4">
//             {adminsData.map((admin, i) => (
//               <Card key={i} className="hover:shadow-md transition-shadow">
//                 <CardContent className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4">
//                       <Avatar className="h-16 w-16">
//                         <AvatarFallback className="bg-purple-500 text-white text-lg">
//                           {admin.name
//                             .split(" ")
//                             .map((n) => n[0])
//                             .join("")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="space-y-3">
//                         <div>
//                           <h3 className="font-semibold text-lg">{admin.name}</h3>
//                           <p className="text-sm text-muted-foreground">{admin.role}</p>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 text-sm">
//                           <div className="flex items-center text-muted-foreground">
//                             <Mail className="mr-2 h-4 w-4" />
//                             {admin.email}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Phone className="mr-2 h-4 w-4" />
//                             {admin.phone}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Calendar className="mr-2 h-4 w-4" />
//                             Joined: {admin.joinDate}
//                           </div>
//                           <div className="flex items-center text-muted-foreground">
//                             <Activity className="mr-2 h-4 w-4" />
//                             Last Active: {admin.lastActive}
//                           </div>
//                         </div>

//                         <div className="flex items-center space-x-2">
//                           <Badge variant="outline" className="text-green-600 border-green-600">
//                             {admin.permissions.length} Permissions
//                           </Badge>
//                           <Badge variant={admin.status === "Active" ? "default" : "secondary"}>{admin.status}</Badge>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="text-right space-y-3">
//                       <div className="space-y-1">
//                         <p className="text-sm font-medium">Managed Requests</p>
//                         <p className="text-2xl font-bold text-purple-600">{admin.managedRequests}</p>
//                       </div>

//                       <div className="flex space-x-1">
//                         <Button size="sm" variant="outline" className="text-xs bg-transparent">
//                           Edit Permissions
//                         </Button>
//                         <Button size="sm" variant="outline" className="text-xs bg-transparent">
//                           View Activity
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function RequestsSection() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight">Blood Requests</h2>
//           <p className="text-muted-foreground">Manage blood donation requests and matching</p>
//         </div>
//         <Button>
//           <Heart className="mr-2 h-4 w-4" />
//           New Request
//         </Button>
//       </div>

//       <div className="grid gap-4">
//         {[
//           {
//             id: "REQ-001",
//             patient: "Ahmed Hassan",
//             bloodType: "O+",
//             unitsNeeded: 3,
//             hospital: "Dhaka Medical College Hospital",
//             urgency: "Critical",
//             requestDate: "2024-03-15",
//             status: "Active",
//             contact: "+880 1712-345678",
//           },
//           {
//             id: "REQ-002",
//             patient: "Fatima Begum",
//             bloodType: "A-",
//             unitsNeeded: 2,
//             hospital: "Square Hospital",
//             urgency: "Urgent",
//             requestDate: "2024-03-14",
//             status: "Matched",
//             contact: "+880 1987-654321",
//           },
//           {
//             id: "REQ-003",
//             patient: "Karim Ahmed",
//             bloodType: "B+",
//             unitsNeeded: 1,
//             hospital: "BIRDEM General Hospital",
//             urgency: "Normal",
//             requestDate: "2024-03-13",
//             status: "Completed",
//             contact: "+880 1555-123456",
//           },
//         ].map((request, i) => (
//           <Card key={i}>
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between">
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-4">
//                     <Badge variant="outline" className="text-xs">
//                       {request.id}
//                     </Badge>
//                     <Badge
//                       variant={
//                         request.urgency === "Critical"
//                           ? "destructive"
//                           : request.urgency === "Urgent"
//                             ? "default"
//                             : "secondary"
//                       }
//                       className={request.urgency === "Urgent" ? "bg-warning text-white" : ""}
//                     >
//                       {request.urgency}
//                     </Badge>
//                     <Badge
//                       variant={
//                         request.status === "Active" ? "default" : request.status === "Matched" ? "secondary" : "outline"
//                       }
//                       className={
//                         request.status === "Active"
//                           ? "bg-blood-primary"
//                           : request.status === "Matched"
//                             ? "bg-warning text-white"
//                             : "bg-success text-white"
//                       }
//                     >
//                       {request.status}
//                     </Badge>
//                   </div>

//                   <div>
//                     <h3 className="font-semibold text-lg">{request.patient}</h3>
//                     <p className="text-muted-foreground">{request.hospital}</p>
//                   </div>

//                   <div className="flex items-center space-x-6 text-sm">
//                     <span className="flex items-center">
//                       <Phone className="mr-1 h-3 w-3" />
//                       {request.contact}
//                     </span>
//                     <span className="flex items-center">
//                       <Calendar className="mr-1 h-3 w-3" />
//                       {request.requestDate}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="text-right space-y-2">
//                   <div className="text-center">
//                     <Badge variant="outline" className="text-blood-primary border-blood-primary text-xl px-4 py-2">
//                       {request.bloodType}
//                     </Badge>
//                   </div>
//                   <div className="text-sm">
//                     <p className="font-medium">{request.unitsNeeded} units needed</p>
//                   </div>
//                   <div className="space-x-2">
//                     <Button size="sm" variant="outline">
//                       View Details
//                     </Button>
//                     {request.status === "Active" && <Button size="sm">Find Donors</Button>}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// function MessagesSection() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
//         <p className="text-muted-foreground">Communication between donors, recipients, and admins</p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Messages</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {[
//               {
//                 from: "Rahman Ali",
//                 message: "I am available for blood donation this weekend. Please let me know if needed.",
//                 time: "2 hours ago",
//                 type: "donor",
//               },
//               {
//                 from: "Dr. Nasir Ahmed",
//                 message: "Urgent: Need O+ blood for emergency surgery. Patient in critical condition.",
//                 time: "4 hours ago",
//                 type: "urgent",
//               },
//               {
//                 from: "Fatima Khan",
//                 message: "Thank you for arranging the blood donation. The patient is now stable.",
//                 time: "1 day ago",
//                 type: "recipient",
//               },
//             ].map((msg, i) => (
//               <div key={i} className="flex space-x-3 p-3 rounded-lg border">
//                 <Avatar>
//                   <AvatarFallback
//                     className={
//                       msg.type === "urgent"
//                         ? "bg-blood-primary text-white"
//                         : msg.type === "donor"
//                           ? "bg-success text-white"
//                           : "bg-secondary"
//                     }
//                   >
//                     {msg.from
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 space-y-1">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium">{msg.from}</p>
//                     <p className="text-xs text-muted-foreground">{msg.time}</p>
//                   </div>
//                   <p className="text-sm text-muted-foreground">{msg.message}</p>
//                   {msg.type === "urgent" && (
//                     <Badge variant="destructive" className="text-xs">
//                       <AlertCircle className="mr-1 h-3 w-3" />
//                       Urgent
//                     </Badge>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Message Categories</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <div className="flex items-center justify-between p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-3 w-3 rounded-full bg-blood-primary"></div>
//                   <span className="text-sm font-medium">Urgent Requests</span>
//                 </div>
//                 <Badge variant="destructive">5</Badge>
//               </div>

//               <div className="flex items-center justify-between p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-3 w-3 rounded-full bg-success"></div>
//                   <span className="text-sm font-medium">Donor Responses</span>
//                 </div>
//                 <Badge variant="secondary">12</Badge>
//               </div>

//               <div className="flex items-center justify-between p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-3 w-3 rounded-full bg-info"></div>
//                   <span className="text-sm font-medium">General Inquiries</span>
//                 </div>
//                 <Badge variant="outline">8</Badge>
//               </div>

//               <div className="flex items-center justify-between p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <div className="h-3 w-3 rounded-full bg-warning"></div>
//                   <span className="text-sm font-medium">Thank You Messages</span>
//                 </div>
//                 <Badge variant="outline">15</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// function NotificationsSection() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
//         <p className="text-muted-foreground">System alerts and user notifications</p>
//       </div>

//       <div className="space-y-4">
//         {[
//           {
//             title: "New Blood Request",
//             message: "Critical O+ blood needed at Dhaka Medical College Hospital",
//             time: "5 minutes ago",
//             type: "critical",
//             read: false,
//           },
//           {
//             title: "Donor Match Found",
//             message: "Found 3 potential donors for patient Ahmed Hassan",
//             time: "1 hour ago",
//             type: "success",
//             read: false,
//           },
//           {
//             title: "Donation Completed",
//             message: "Blood donation successfully completed for REQ-002",
//             time: "3 hours ago",
//             type: "info",
//             read: true,
//           },
//           {
//             title: "New Donor Registration",
//             message: "Rashid Ahmed (A+) has registered as a new donor",
//             time: "5 hours ago",
//             type: "info",
//             read: true,
//           },
//           {
//             title: "System Maintenance",
//             message: "Scheduled maintenance will occur tonight from 2-4 AM",
//             time: "1 day ago",
//             type: "warning",
//             read: true,
//           },
//         ].map((notification, i) => (
//           <Card key={i} className={`${!notification.read ? "border-blood-primary" : ""}`}>
//             <CardContent className="p-4">
//               <div className="flex items-start space-x-4">
//                 <div
//                   className={`h-2 w-2 rounded-full mt-2 ${
//                     notification.type === "critical"
//                       ? "bg-blood-primary"
//                       : notification.type === "success"
//                         ? "bg-success"
//                         : notification.type === "warning"
//                           ? "bg-warning"
//                           : "bg-info"
//                   }`}
//                 ></div>

//                 <div className="flex-1 space-y-1">
//                   <div className="flex items-center justify-between">
//                     <h4
//                       className={`text-sm font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
//                     >
//                       {notification.title}
//                     </h4>
//                     <span className="text-xs text-muted-foreground">{notification.time}</span>
//                   </div>
//                   <p className={`text-sm ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
//                     {notification.message}
//                   </p>
//                   {notification.type === "critical" && (
//                     <Badge variant="destructive" className="text-xs">
//                       <AlertCircle className="mr-1 h-3 w-3" />
//                       Critical
//                     </Badge>
//                   )}
//                 </div>

//                 {!notification.read && (
//                   <Button variant="ghost" size="sm">
//                     Mark as Read
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }





import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, User, Droplets, Settings } from "lucide-react"
import BloodDonationDashboard from "./BloodDonationDashboard";
import UserDashboard from "./UserDashboard";
import DonorDashboard from "./DonorDashboard";
const DashboardPage = () => {
	 const [activeView, setActiveView] = useState<"selector" | "admin" | "user" | "donor">("selector")

  if (activeView === "admin") {
    return <BloodDonationDashboard />
  }

  if (activeView === "user") {
    return <UserDashboard />
  }

  if (activeView === "donor") {
    return <DonorDashboard />
  }

  // Dashboard Selector
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/20 to-orange-50/30 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse-slow opacity-20"></div>
              <Heart className="h-16 w-16 text-red-500 relative z-10" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                BloodConnect
              </h1>
              <p className="text-lg text-muted-foreground font-medium">Saving Lives Together</p>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Choose Your Dashboard</h2>
            <p className="text-muted-foreground text-lg">Select your role to access the appropriate dashboard</p>
          </div>
        </div>

        {/* Dashboard Options */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* User Dashboard */}
          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-white to-blue-50/30"
            onClick={() => setActiveView("user")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-blue-900">User Dashboard</CardTitle>
              <CardDescription className="text-blue-600">For people who need blood</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Request blood donations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Track request history</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Find nearby donors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Emergency requests</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Badge className="bg-blue-500 hover:bg-blue-600 w-full justify-center py-2">
                  Access User Dashboard
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Donor Dashboard */}
          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-white to-green-50/30"
            onClick={() => setActiveView("donor")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
                <Droplets className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-green-900">Donor Dashboard</CardTitle>
              <CardDescription className="text-green-600">For blood donors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>View blood requests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Donation history</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Manage availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Track impact</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Badge className="bg-green-500 hover:bg-green-600 w-full justify-center py-2">
                  Access Donor Dashboard
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Admin Dashboard */}
          <Card
            className="cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105 bg-gradient-to-br from-white to-red-50/30"
            onClick={() => setActiveView("admin")}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-red-100 rounded-full w-20 h-20 flex items-center justify-center">
                <Settings className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-red-900">Admin Dashboard</CardTitle>
              <CardDescription className="text-red-600">For system administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Manage all users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Monitor requests</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>System analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Communication hub</span>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Badge className="bg-red-500 hover:bg-red-600 w-full justify-center py-2">Access Admin Dashboard</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-4 mt-12">
          <Card className="border-0 shadow-md bg-white/60">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">2,847</div>
              <div className="text-sm text-muted-foreground">Total Donors</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/60">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <div className="text-sm text-muted-foreground">Lives Saved</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/60">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">47</div>
              <div className="text-sm text-muted-foreground">Active Requests</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md bg-white/60">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-muted-foreground">
            BloodConnect - Connecting donors with those in need • Saving lives together
          </p>
        </div>
      </div>
    </div>
  )
};

export default DashboardPage;