/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Filter,
  Heart,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const divisions = ["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ"]

const districts = {
  ঢাকা: [
    "ঢাকা",
    "গাজীপুর",
    "নারায়ণগঞ্জ",
    "মানিকগঞ্জ",
    "মুন্সিগঞ্জ",
    "নরসিংদী",
    "টাঙ্গাইল",
    "কিশোরগঞ্জ",
    "মাদারীপুর",
    "শরীয়তপুর",
    "ফরিদপুর",
    "রাজবাড়ী",
    "গোপালগঞ্জ",
  ],
  চট্টগ্রাম: ["চট্টগ্রাম", "কক্সবাজার", "রাঙ্গামাটি", "বান্দরবান", "খাগড়াছড়ি", "ফেনী", "লক্ষ্মীপুর", "কুমিল্লা", "নোয়াখালী", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর"],
  রাজশাহী: ["রাজশাহী", "নাটোর", "নওগাঁ", "চাঁপাইনবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ", "বগুড়া", "জয়পুরহাট"],
  খুলনা: ["খুলনা", "বাগেরহাট", "সাতক্ষীরা", "যশোর", "মাগুরা", "নড়াইল", "চুয়াডাঙ্গা", "মেহেরপুর", "কুষ্টিয়া", "ঝিনাইদহ"],
  বরিশাল: ["বরিশাল", "পটুয়াখালী", "ভোলা", "বরগুনা", "ঝালকাঠি", "পিরোজপুর"],
  সিলেট: ["সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ"],
  রংপুর: ["রংপুর", "দিনাজপুর", "ঠাকুরগাঁও", "পঞ্চগড়", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী"],
  ময়মনসিংহ: ["ময়মনসিংহ", "জামালপুর", "শেরপুর", "নেত্রকোনা"],
}

// Mock donor data
const mockDonors = [
  {
    id: 1,
    name: "মোহাম্মদ রহিম",
    bloodGroup: "O+",
    location: {
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "ধানমন্ডি",
    },
    phone: "01712345678",
    email: "rahim@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    totalDonations: 15,
    lastDonation: "2024-01-15",
    isAvailable: true,
    age: 28,
    weight: 65,
    verified: true,
  },
  {
    id: 2,
    name: "ফাতেমা খাতুন",
    bloodGroup: "B+",
    location: {
      division: "চট্টগ্রাম",
      district: "চট্টগ্রাম",
      upazila: "নাসিরাবাদ",
    },
    phone: "01812345678",
    email: "fatema@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    totalDonations: 22,
    lastDonation: "2024-01-10",
    isAvailable: true,
    age: 32,
    weight: 55,
    verified: true,
  },
  {
    id: 3,
    name: "আহমেদ করিম",
    bloodGroup: "A-",
    location: {
      division: "সিলেট",
      district: "সিলেট",
      upazila: "সিলেট সদর",
    },
    phone: "01912345678",
    email: "ahmed@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    totalDonations: 8,
    lastDonation: "2024-01-20",
    isAvailable: false,
    age: 25,
    weight: 70,
    verified: true,
  },
  {
    id: 4,
    name: "সালমা বেগম",
    bloodGroup: "AB+",
    location: {
      division: "রাজশাহী",
      district: "রাজশাহী",
      upazila: "বোয়ালিয়া",
    },
    phone: "01612345678",
    email: "salma@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5.0,
    totalDonations: 30,
    lastDonation: "2024-01-05",
    isAvailable: true,
    age: 35,
    weight: 60,
    verified: true,
  },
]

const FindBloodDonnerPage = () => {
	 const [filters, setFilters] = useState({
    bloodGroup: "all",
    division: "all",
    district: "all",
    availability: "all",
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDonors, setFilteredDonors] = useState(mockDonors)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = mockDonors

    // Filter by blood group
    if (filters.bloodGroup !== "all") {
      filtered = filtered.filter((donor) => donor.bloodGroup === filters.bloodGroup)
    }

    // Filter by division
    if (filters.division !== "all") {
      filtered = filtered.filter((donor) => donor.location.division === filters.division)
    }

    // Filter by district
    if (filters.district !== "all") {
      filtered = filtered.filter((donor) => donor.location.district === filters.district)
    }

    // Filter by availability
    if (filters.availability === "available") {
      filtered = filtered.filter((donor) => donor.isAvailable)
    } else if (filters.availability === "unavailable") {
      filtered = filtered.filter((donor) => !donor.isAvailable)
    }

    // Search by name
    if (searchQuery) {
      filtered = filtered.filter((donor) => donor.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredDonors(filtered)
  }, [filters, searchQuery])

  const getAvailabilityStatus = (donor: any) => {
    if (!donor.isAvailable) {
      return {
        text: "অনুপলব্ধ",
        color: "bg-red-100 text-red-700",
        icon: AlertCircle,
      }
    }

    const lastDonation = new Date(donor.lastDonation)
    const daysSinceLastDonation = Math.floor((Date.now() - lastDonation.getTime()) / (1000 * 60 * 60 * 24))

    if (daysSinceLastDonation < 90) {
      return {
        text: `${90 - daysSinceLastDonation} দিন পর`,
        color: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      }
    }

    return {
      text: "উপলব্ধ",
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
    }
  }
	return (
		    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-red-100 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                রক্তদাতা খুঁজুন
              </h1>
              <p className="text-gray-600 mt-1">{filteredDonors.length} জন রক্তদাতা পাওয়া গেছে</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              ফিল্টার
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-red-600" />
                  ফিল্টার অপশন
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">নাম দিয়ে খুঁজুন</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="রক্তদাতার নাম লিখুন"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10  w-full focus-visible:ring-0 focus-visible:ring-red-400 focus-visible:ring-offset-0 focus-visible:border-red-400"
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <div className="space-y-2 ">
                  <label className="text-sm font-medium">রক্তের গ্রুপ</label>
                  <Select

                    value={filters.bloodGroup}
                    onValueChange={(value) => setFilters({ ...filters, bloodGroup: value })}
                  >
                    <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                      <SelectValue placeholder="সব গ্রুপ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব গ্রুপ</SelectItem>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          <span className="font-semibold text-red-600">{group}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Division */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">বিভাগ</label>
                  <Select
                    value={filters.division}
                    onValueChange={(value) => setFilters({ ...filters, division: value, district: "all" })}
                  >
                    <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                      <SelectValue placeholder="সব বিভাগ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব বিভাগ</SelectItem>
                      {divisions.map((division) => (
                        <SelectItem key={division} value={division}>
                          {division}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District */}
                {filters.division !== "all" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">জেলা</label>
                    <Select
                      value={filters.district}
                      onValueChange={(value) => setFilters({ ...filters, district: value })}
                    >
                      <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                        <SelectValue placeholder="সব জেলা" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">সব জেলা</SelectItem>
                        {districts[filters.division as keyof typeof districts]?.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">প্রাপ্যতা</label>
                  <Select
                    value={filters.availability}
                    onValueChange={(value) => setFilters({ ...filters, availability: value })}
                  >
                    <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সবাই</SelectItem>
                      <SelectItem value="available">উপলব্ধ</SelectItem>
                      <SelectItem value="unavailable">অনুপলব্ধ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => {
                    setFilters({
                      bloodGroup: "all",
                      division: "all",
                      district: "all",
                      availability: "all",
                    })
                    setSearchQuery("")
                  }}
                >
                  ফিল্টার রিসেট করুন
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Donors List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {filteredDonors.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">কোন রক্তদাতা পাওয়া যায়নি</h3>
                    <p className="text-gray-500">অন্য ফিল্টার ব্যবহার করে আবার চেষ্টা করুন</p>
                  </CardContent>
                </Card>
              ) : (
                filteredDonors.map((donor, index) => {
                  const status = getAvailabilityStatus(donor)
                  const StatusIcon = status.icon

                  return (
                    <motion.div
                      key={donor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center gap-6">
                            {/* Avatar and Basic Info */}
                            <div className="flex items-center gap-4">
                              <Avatar className="w-16 h-16 border-2 border-red-100">
                                <AvatarImage src={donor.avatar || "/placeholder.svg"} alt={donor.name} />
                                <AvatarFallback className="bg-red-100 text-red-600 text-lg font-semibold">
                                  {donor.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-xl font-semibold text-gray-800">{donor.name}</h3>
                                  {donor.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{donor.age} বছর</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>
                                      {donor.location.upazila}, {donor.location.district}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Blood Group and Status */}
                            <div className="flex flex-col items-center gap-2 md:ml-auto">
                              <Badge className="bg-red-600 text-white text-lg px-4 py-2 font-bold">
                                {donor.bloodGroup}
                              </Badge>
                              <div
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                              >
                                <StatusIcon className="w-3 h-3" />
                                {status.text}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-4" />

                          {/* Stats and Contact */}
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Heart className="w-4 h-4 text-red-500" />
                                <span>{donor.totalDonations} বার দান</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span>{donor.rating} রেটিং</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>শেষ দান: {new Date(donor.lastDonation).toLocaleDateString("bn-BD")}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                কল করুন
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                              >
                                <Mail className="w-4 h-4 mr-2" />
                                ইমেইল
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700" disabled={!donor.isAvailable}>
                                অনুরোধ পাঠান
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
	);
};

export default FindBloodDonnerPage;

