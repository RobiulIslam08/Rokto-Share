

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"


export const PageHeader = () => {
  return (
    <div className="bg-white border-b border-red-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
         
          <div className="flex items-center gap-2">
            
            <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              রক্তদাতা হিসেবে নিবন্ধন করুন
            </h1>
          </div>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
            <Share2 className="w-4 h-4 mr-2" />
            শেয়ার করুন
          </Button>
        </div>
      </div>
    </div>
  )
}