// pages/become-a-donor/components/Sidebar.tsx


import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Heart, Award, Target, CheckCircle, Phone, Mail, Clock } from "lucide-react"

const donationBenefits = [
  {
    icon: Heart,
    title: "জীবন বাঁচান",
    description: "একটি রক্তদান ৩টি জীবন বাঁচাতে পারে",
    color: "text-red-600 bg-red-50",
  },
  {
    icon: Award,
    title: "স্বাস্থ্য উপকারিতা",
    description: "নিয়মিত রক্তদান আপনার স্বাস্থ্যের জন্য ভালো",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Target,
    title: "সামাজিক দায়বদ্ধতা",
    description: "সমাজের কল্যাণে অবদান রাখুন",
    color: "text-blue-600 bg-blue-50",
  },
]

const eligibilityCriteria = [
  "বয়স ১৮-৬৫ বছরের মধ্যে হতে হবে",
  "ওজন কমপক্ষে ৪৫ কেজি হতে হবে",
  "হিমোগ্লোবিন ১২.৫ গ্রাম/ডেসিলিটার বা তার বেশি",
  "শেষ রক্তদানের ৯০ দিন পর আবার দান করতে পারবেন",
  "কোনো গুরুতর অসুখ থাকলে চিকিৎসকের পরামর্শ নিন",
  "গর্ভবতী বা স্তন্যদানকারী মহিলারা রক্তদান করতে পারবেন না",
]


export const Sidebar = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">রক্তদানের উপকারিতা</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {donationBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${benefit.color} flex items-center justify-center`}>
                        <benefit.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{benefit.title}</h4>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                যোগ্যতার শর্তাবলী
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
								{eligibilityCriteria.map((criteria, index) => (
								  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
									<CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
									{criteria}
								  </li>
								))}
							  </ul>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
     <CardContent className="p-6">
					  <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
						<Phone className="w-5 h-5" />
						সাহায্য প্রয়োজন?
					  </h3>
					  <div className="space-y-3 text-sm text-red-700">
						<div className="flex items-center gap-2">
						  <Phone className="w-4 h-4" />
						  <span>হটলাইন: ১৬২৬৩</span>
						</div>
						<div className="flex items-center gap-2">
						  <Mail className="w-4 h-4" />
						  <span>help@roktoshare.bd</span>
						</div>
						<div className="flex items-center gap-2">
						  <Clock className="w-4 h-4" />
						  <span>২৪/৭ সেবা</span>
						</div>
					  </div>
					</CardContent>
        </Card>
      </motion.div>
    </div>
  )
}