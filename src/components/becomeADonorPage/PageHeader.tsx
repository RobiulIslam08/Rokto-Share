
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft, Share2 } from "lucide-react"

export const PageHeader = () => {
  return (
    <div className="bg-white border-b border-red-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            হোমে ফিরে যান
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              রক্তদাতা হিসেবে নিবন্ধন
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