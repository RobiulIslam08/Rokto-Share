/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { DonnerCard } from "./DonnerCard";

type DonnerListProps = {
  donors: any[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  page: number;
  setPage: (page: number) => void;
};

export const DonnerList = ({ donors, meta, page, setPage }: DonnerListProps) => {
  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!meta) return [];
    
    const pages: (number | string)[] = [];
    const { totalPage } = meta;
    
    if (totalPage <= 7) {
      // Show all pages if total pages <= 7
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    
    // Always show first page
    pages.push(1);
    
    if (page > 3) {
      pages.push('...');
    }
    
    // Show pages around current page
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPage - 1, page + 1); i++) {
      pages.push(i);
    }
    
    if (page < totalPage - 2) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPage > 1) {
      pages.push(totalPage);
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="lg:col-span-3">
      <div className="space-y-6">
        {donors.length === 0 ? (
          <Card className="text-center py-12 border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                কোন রক্তদাতা পাওয়া যায়নি
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                আপনার নির্বাচিত ফিল্টারের সাথে কোনো রক্তদাতা খুঁজে পাওয়া যায়নি। অন্য ফিল্টার ব্যবহার করে আবার চেষ্টা করুন।
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Donor Cards */}
            <div className="space-y-4">
              {donors.map((donor, index) => (
                <DonnerCard key={donor.id} donor={donor} index={index} />
              ))}
            </div>

            {/* Modern Pagination */}
            {meta && meta.totalPage > 1 && (
              <Card className="border-red-100 bg-white shadow-sm">
                <CardContent className="py-4">
                  {/* Desktop Pagination */}
                  <div className="hidden md:flex justify-between items-center">
                    {/* Left side - Info */}
                    <div className="text-sm text-gray-600">
                      পেজ <span className="font-semibold text-red-600">{page}</span> / {meta.totalPage} 
                      <span className="mx-2">•</span>
                      মোট <span className="font-semibold">{meta.total}</span> জন রক্তদাতা
                    </div>

                    {/* Center - Page Numbers */}
                    <div className="flex items-center gap-1">
                      {/* First Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className="h-9 w-9 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="প্রথম পেজ"
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </Button>

                      {/* Previous Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="h-9 w-9 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="আগের পেজ"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      {/* Page Numbers */}
                      {pageNumbers.map((pageNum, idx) => (
                        pageNum === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                            •••
                          </span>
                        ) : (
                          <Button
                            key={pageNum}
                            variant={pageNum === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setPage(pageNum as number)}
                            className={`h-9 min-w-[36px] ${
                              pageNum === page
                                ? "bg-red-600 hover:bg-red-700 text-white shadow-md"
                                : "hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        )
                      ))}

                      {/* Next Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(page + 1)}
                        disabled={page === meta.totalPage}
                        className="h-9 w-9 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="পরের পেজ"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      {/* Last Page */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPage(meta.totalPage)}
                        disabled={page === meta.totalPage}
                        className="h-9 w-9 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        title="শেষ পেজ"
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Right side - Range Info */}
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">{(page - 1) * meta.limit + 1}</span>
                      {' '}-{' '}
                      <span className="font-medium">{Math.min(page * meta.limit, meta.total)}</span>
                      {' '}দেখানো হচ্ছে
                    </div>
                  </div>

                  {/* Mobile Pagination */}
                  <div className="md:hidden space-y-3">
                    {/* Info */}
                    <div className="text-center text-sm text-gray-600">
                      পেজ <span className="font-semibold text-red-600">{page}</span> / {meta.totalPage}
                      <span className="mx-2">•</span>
                      মোট <span className="font-semibold">{meta.total}</span> জন
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(1)}
                        disabled={page === 1}
                        className="flex-1 max-w-[100px] border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <ChevronsLeft className="w-4 h-4 mr-1" />
                        প্রথম
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        আগের
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={page === meta.totalPage}
                        className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        পরের
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(meta.totalPage)}
                        disabled={page === meta.totalPage}
                        className="flex-1 max-w-[100px] border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        শেষ
                        <ChevronsRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>

                    {/* Page Numbers for Mobile (Compact) */}
                    <div className="flex justify-center items-center gap-1 flex-wrap">
                      {pageNumbers.slice(0, 5).map((pageNum, idx) => (
                        pageNum === '...' ? (
                          <span key={`ellipsis-mobile-${idx}`} className="px-1 text-gray-400 text-xs">
                            •••
                          </span>
                        ) : (
                          <Button
                            key={pageNum}
                            variant={pageNum === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setPage(pageNum as number)}
                            className={`h-8 w-8 text-xs ${
                              pageNum === page
                                ? "bg-red-600 hover:bg-red-700 text-white"
                                : "hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        )
                      ))}
                    </div>

                    {/* Range Info */}
                    <div className="text-center text-xs text-gray-500">
                      {(page - 1) * meta.limit + 1} - {Math.min(page * meta.limit, meta.total)} দেখানো হচ্ছে
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};