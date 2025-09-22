
import { useState, useEffect } from "react";


import { DonnerFinderHeader } from "@/components/findBloodDonnerPage/DonnerFinderHeader";
import { FilterSidebar } from "@/components/findBloodDonnerPage/FilterSidebar";
import { DonnerList } from "@/components/findBloodDonnerPage/DonnerList";



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
    lastDonation: "2025-07-15",
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
];

const FindBloodDonnerPage = () => {
  const [filters, setFilters] = useState({
    bloodGroup: "all",
    division: "all",
    district: "all",
    availability: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDonors, setFilteredDonors] = useState(mockDonors);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = mockDonors;

    // Filter by blood group
    if (filters.bloodGroup !== "all") {
      filtered = filtered.filter(
        (donor) => donor.bloodGroup === filters.bloodGroup
      );
    }

    // Filter by division
    if (filters.division !== "all") {
      filtered = filtered.filter(
        (donor) => donor.location.division === filters.division
      );
    }

    // Filter by district
    if (filters.district !== "all") {
      filtered = filtered.filter(
        (donor) => donor.location.district === filters.district
      );
    }

    // Filter by availability
    if (filters.availability === "available") {
      filtered = filtered.filter((donor) => donor.isAvailable);
    } else if (filters.availability === "unavailable") {
      filtered = filtered.filter((donor) => !donor.isAvailable);
    }

    // Search by name
    if (searchQuery) {
      filtered = filtered.filter((donor) =>
        donor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDonors(filtered);
  }, [filters, searchQuery]);

 const resetFilters = () => {
    setFilters({
      bloodGroup: "all",
      division: "all",
      district: "all",
      availability: "all",
    });
    setSearchQuery("");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <DonnerFinderHeader donorCount={filteredDonors.length}
        onToggleFilters={() => setShowFilters(!showFilters)}></DonnerFinderHeader>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
        <FilterSidebar  filters={filters}
            setFilters={setFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            resetFilters={resetFilters}
            isVisible={showFilters}/>

          {/* Donors List */}
          <DonnerList donors={filteredDonors}/>
        </div>
      </div>
    </div>
  );
};

export default FindBloodDonnerPage;
