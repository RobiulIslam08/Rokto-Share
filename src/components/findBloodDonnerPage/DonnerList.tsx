/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { DonnerCard } from "./DonnerCard";


type DonnerListProps = {
  donors: any[];
};

export const DonnerList = ({ donors }: DonnerListProps) => {
  return (
    <div className="lg:col-span-3">
      <div className="space-y-6">
        {donors.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                কোন রক্তদাতা পাওয়া যায়নি
              </h3>
              <p className="text-gray-500">
                অন্য ফিল্টার ব্যবহার করে আবার চেষ্টা করুন
              </p>
            </CardContent>
          </Card>
        ) : (
          donors.map((donor, index) => (
            <DonnerCard key={donor.id} donor={donor} index={index} />
          ))
        )}
      </div>
    </div>
  );
};