import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type HeaderProps = {
  donorCount: number;
  onToggleFilters: () => void;
};

export const DonnerFinderHeader = ({
  donorCount,
  onToggleFilters,
}: HeaderProps) => {
  return (
    <div className="bg-white border-b border-red-100 sticky  z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl py-1 font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              রক্তদাতা খুঁজুন
            </h1>
            <p className="text-gray-600 mt-1">{donorCount} জন রক্তদাতা পাওয়া গেছে</p>
          </div>
          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="border-red-200 text-red-600 hover:bg-red-50 lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            ফিল্টার
          </Button>
        </div>
      </div>
    </div>
  );
};