// pages/become-a-donor/components/SuccessMessage.tsx


import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="text-center shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">সফলভাবে নিবন্ধিত!</h2>
            <p className="text-gray-600 mb-6">আপনার রক্তদাতা হিসেবে নিবন্ধন সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            <div className="space-y-3">
              <Link to="/dashboard/user">
                <Button className="w-full bg-green-600 hover:bg-green-700">ড্যাশবোর্ডে যান</Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full border-gray-200 bg-transparent">হোমে ফিরে যান</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}