/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bloodGroups, districts, divisions } from "@/lib/locationData";
import { Search, Filter } from "lucide-react";
 // Data আলাদা ফাইল থেকে আসবে

type FilterSidebarProps = {
  filters: any;
  setFilters: (filters: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  isVisible: boolean;
};

export const FilterSidebar = ({
  filters,
  setFilters,
  searchQuery,
  setSearchQuery,
  resetFilters,
  isVisible,
}: FilterSidebarProps) => {
  return (
    <div className={`lg:block ${isVisible ? "block" : "hidden"}`}>
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
                className="pl-10 w-full focus-visible:ring-0 focus-visible:ring-red-400 focus-visible:ring-offset-0 focus-visible:border-red-400"
              />
            </div>
          </div>

          {/* Blood Group */}
          <div className="space-y-2">
            <label className="text-sm font-medium">রক্তের গ্রুপ</label>
            <Select
              value={filters.bloodGroup}
              onValueChange={(value) =>
                setFilters({ ...filters, bloodGroup: value })
              }
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
              onValueChange={(value) =>
                setFilters({ ...filters, division: value, district: "all" })
              }
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
                onValueChange={(value) =>
                  setFilters({ ...filters, district: value })
                }
              >
                <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                  <SelectValue placeholder="সব জেলা" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব জেলা</SelectItem>
                  {districts[
                    filters.division as keyof typeof districts
                  ]?.map((district) => (
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
              onValueChange={(value) =>
                setFilters({ ...filters, availability: value })
              }
            >
              <SelectTrigger className="border-red-200 focus:border-red-400 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব রক্তদাতা</SelectItem>
                <SelectItem value="available">এখন রক্ত দিতে পারবেন</SelectItem>
                <SelectItem value="unavailable">
                  এখন রক্ত দিতে পারবেন না
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            onClick={resetFilters}
          >
            ফিল্টার রিসেট করুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};