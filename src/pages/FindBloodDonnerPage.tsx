import { useState, useEffect } from "react";
import { DonnerFinderHeader } from "@/components/findBloodDonnerPage/DonnerFinderHeader";
import { FilterSidebar } from "@/components/findBloodDonnerPage/FilterSidebar";
import { DonnerList } from "@/components/findBloodDonnerPage/DonnerList";
import { useGetAllDonorsQuery } from "@/redux/features/donor/donorApi";
import { Loader2 } from "lucide-react";

const FindBloodDonnerPage = () => {
  const [filters, setFilters] = useState({
    bloodGroup: "all",
    division: "all",
    district: "all",
    upazila: "all",
    availability: "all",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // RTK Query hook with all filters
  const { data, isLoading, isFetching, error } = useGetAllDonorsQuery({
    bloodGroup: filters.bloodGroup,
    division: filters.division,
    district: filters.district,
    upazila: filters.upazila,
    availability: filters.availability,
    searchTerm: searchQuery,
    page: page,
    limit: 10,
  });

  const resetFilters = () => {
    setFilters({
      bloodGroup: "all",
      division: "all",
      district: "all",
      upazila: "all",
      availability: "all",
    });
    setSearchQuery("");
    setPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters, searchQuery]);

  return (
    <>
      <title>রক্ত দাতা খুজুন | RoktoShare</title>
      <meta name="description" content="আপনার এলাকার রক্তদাতাদের খুঁজুন।" />
      <meta
        name="keywords"
        content="RoktoShare, blood connect, রক্ত সৈনিক, find blood donator, blood donation management,রক্তদান, ব্লাড ব্যাংক, বাংলাদেশের রক্তদান সংস্থা, জীবন বাঁচানো"
      />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        {/* Header */}
        <DonnerFinderHeader
          donorCount={data?.meta?.total || 0}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resetFilters={resetFilters}
              isVisible={showFilters}
            />

            {/* Donors List */}
            {isLoading || isFetching ? (
              <div className="lg:col-span-3 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">রক্তদাতা খুঁজছি...</p>
                </div>
              </div>
            ) : error ? (
              <div className="lg:col-span-3 flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-red-600 text-lg">
                    কিছু ভুল হয়েছে। আবার চেষ্টা করুন।
                  </p>
                </div>
              </div>
            ) : (
              <DonnerList
                donors={data?.data || []}
                meta={data?.meta}
                page={page}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindBloodDonnerPage;