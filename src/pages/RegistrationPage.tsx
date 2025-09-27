
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Heart, User, Mail, Lock, Phone, MapPin, Eye, EyeOff, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
// upazilas ইম্পোর্ট করা হয়েছে
import { bloodGroups, districts, divisions, upazilas } from "@/lib/locationData"

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Donor Info
    bloodGroup: "",
    age: "",
    weight: "",
    lastDonation: "",

    // Location
    division: "",
    district: "",
    upazila: "",


    // Agreements
    agreeTerms: false,
    agreePrivacy: false,
    agreeNotifications: true,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "নাম আবশ্যক"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে"
    }

    if (!formData.email) {
      newErrors.email = "ইমেইল আবশ্যক"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন"
    }

    if (!formData.phone) {
      newErrors.phone = "ফোন নম্বর আবশ্যক"
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক বাংলাদেশি ফোন নম্বর দিন"
    }

    if (!formData.password) {
      newErrors.password = "পাসওয়ার্ড আবশ্যক"
    } else if (formData.password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলছে না"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন"
    }

    if (!formData.age) {
      newErrors.age = "বয়স আবশ্যক"
    } else if (Number.parseInt(formData.age) < 18 || Number.parseInt(formData.age) > 65) {
      newErrors.age = "বয়স ১৮-৬৫ বছরের মধ্যে হতে হবে"
    }

    if (!formData.weight) {
      newErrors.weight = "ওজন আবশ্যক"
    } else if (Number.parseInt(formData.weight) < 45) {
      newErrors.weight = "ওজন কমপক্ষে ৪৫ কেজি হতে হবে"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.division) {
      newErrors.division = "বিভাগ নির্বাচন করুন"
    }

    if (!formData.district) {
      newErrors.district = "জেলা নির্বাচন করুন"
    }

    if (!formData.upazila.trim()) {
      newErrors.upazila = "উপজেলা আবশ্যক"
    }

  

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "শর্তাবলী মেনে নিতে হবে"
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = "গোপনীয়তা নীতি মেনে নিতে হবে"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    let isValid = false

    if (currentStep === 1) {
      isValid = validateStep1()
    } else if (currentStep === 2) {
      isValid = validateStep2()
    }

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep3()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to success page or dashboard
      window.location.href = "/dashboard"
    }, 3000)
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">ব্যক্তিগত তথ্য</h3>
        <p className="text-gray-600">আপনার মৌলিক তথ্য দিন</p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
          পূর্ণ নাম *
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="name"
            type="text"
            placeholder="আপনার পূর্ণ নাম লিখুন"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`pl-10 h-12 border-red-200 focus:border-red-400 ${errors.name ? "border-red-500" : ""}`}
          />
        </div>
        {errors.name && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          ইমেইল ঠিকানা *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="আপনার ইমেইল ঠিকানা"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`pl-10 h-12 border-red-200 focus:border-red-400 ${errors.email ? "border-red-500" : ""}`}
          />
        </div>
        {errors.email && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
          মোবাইল নম্বর *
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`pl-10 h-12 border-red-200 focus:border-red-400 ${errors.phone ? "border-red-500" : ""}`}
          />
        </div>
        {errors.phone && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </div>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
          পাসওয়ার্ড *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className={`pl-10 pr-10 h-12 border-red-200 focus:border-red-400 ${errors.password ? "border-red-500" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.password}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
          পাসওয়ার্ড নিশ্চিত করুন *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="পাসওয়ার্ড আবার লিখুন"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className={`pl-10 pr-10 h-12 border-red-200 focus:border-red-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.confirmPassword}
          </div>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">রক্তদানের তথ্য</h3>
        <p className="text-gray-600">আপনার স্বাস্থ্য সংক্রান্ত তথ্য দিন</p>
      </div>

      {/* Blood Group */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">রক্তের গ্রুপ *</Label>
        <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}>
          <SelectTrigger className={`h-12 w-full border-red-200 focus:border-red-400 ${errors.bloodGroup ? "border-red-500" : ""}`}>
            <SelectValue placeholder="আপনার রক্তের গ্রুপ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {bloodGroups.map((group) => (
              <SelectItem key={group} value={group}>
                <span className="font-semibold text-red-600 text-lg">{group}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.bloodGroup && (
          <div className="flex items-center gap-1 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.bloodGroup}
          </div>
        )}
      </div>

      {/* Age and Weight */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
            বয়স (বছর) *
          </Label>
          <Input
            id="age"
            type="number"
            placeholder="২৫"
            min="18"
            max="65"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className={`h-12 border-red-200 focus:border-red-400 ${errors.age ? "border-red-500" : ""}`}
          />
          {errors.age && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.age}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
            ওজন (কেজি) *
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="৬০"
            min="45"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            className={`h-12 border-red-200 focus:border-red-400 ${errors.weight ? "border-red-500" : ""}`}
          />
          {errors.weight && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.weight}
            </div>
          )}
        </div>
      </div>

      {/* Last Donation */}
      <div className="space-y-2">
        <Label htmlFor="lastDonation" className="text-sm font-medium text-gray-700">
          শেষ রক্তদানের তারিখ (ঐচ্ছিক)
        </Label>
        <Input
          id="lastDonation"
          type="date"
          value={formData.lastDonation}
          onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
          className="h-12 border-red-200 focus:border-red-400"
        />
        <p className="text-xs text-gray-500">যদি আগে কখনো রক্তদান না করে থাকেন তাহলে খালি রাখুন</p>
      </div>

      {/* Health Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          গুরুত্বপূর্ণ তথ্য
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• রক্তদানের জন্য আপনার বয়স ১৮-৬৫ বছরের মধ্যে হতে হবে</li>
          <li>• ওজন কমপক্ষে ৪৫ কেজি হতে হবে</li>
          <li>• শেষ রক্তদানের ৯০ দিন পর আবার রক্তদান করতে পারবেন</li>
          <li>• কোনো গুরুতর অসুখ থাকলে ডাক্তারের পরামর্শ নিন</li>
        </ul>
      </div>
    </div>
  )

  const renderStep3 = () => {
    // নির্বাচিত জেলার জন্য উপজেলার তালিকা খোঁজা হচ্ছে
    const availableUpazilas = upazilas[formData.district as keyof typeof upazilas]

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">ঠিকানা ও চূড়ান্ত করুন</h3>
          <p className="text-gray-600">আপনার ঠিকানা এবং সম্মতি</p>
        </div>

        {/* Division */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">বিভাগ *</Label>
          <Select
            value={formData.division}
            onValueChange={(value) => setFormData({ ...formData, division: value, district: "", upazila: "" })} // জেলা ও উপজেলা রিসেট
          >
            <SelectTrigger className={`h-12 w-full border-red-200 focus:border-red-400 ${errors.division ? "border-red-500" : ""}`}>
              <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.division && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.division}
            </div>
          )}
        </div>

        {/* District */}
        {formData.division && (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">জেলা *</Label>
            <Select
              value={formData.district}
              onValueChange={(value) => setFormData({ ...formData, district: value, upazila: "" })} // উপজেলা রিসেট
            >
              <SelectTrigger className={`h-12 w-full border-red-200 focus:border-red-400 ${errors.district ? "border-red-500" : ""}`}>
                <SelectValue placeholder="জেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {districts[formData.division as keyof typeof districts]?.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.district && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.district}
              </div>
            )}
          </div>
        )}

        {/* Upazila - পরিবর্তিত অংশ */}
        <div className="space-y-2">
          <Label htmlFor="upazila" className="text-sm font-medium text-gray-700">
            উপজেলা/থানা *
          </Label>
          {availableUpazilas ? (
            // যদি উপজেলার তালিকা পাওয়া যায়, তাহলে ড্রপডাউন দেখানো হবে
            <Select value={formData.upazila} onValueChange={(value) => setFormData({ ...formData, upazila: value })}>
              <SelectTrigger className={`h-12 w-full border-red-200 focus:border-red-400 ${errors.upazila ? "border-red-500" : ""}`}>
                <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                {availableUpazilas.map((upazila) => (
                  <SelectItem key={upazila} value={upazila}>
                    {upazila}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            // তালিকা না থাকলে ইনপুট ফিল্ড দেখানো হবে
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="upazila"
                type="text"
                placeholder="উপজেলা বা থানার নাম"
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                className={`pl-10 h-12 border-red-200 focus:border-red-400 ${errors.upazila ? "border-red-500" : ""}`}
              />
            </div>
          )}
          {errors.upazila && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.upazila}
            </div>
          )}
        </div>


        <Separator />

        {/* Agreements */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
              className="mt-1"
            />
            <Label htmlFor="agreeTerms" className="text-sm text-gray-700 leading-relaxed">
              আমি{" "}
              <Link to="/terms" className="text-red-600 hover:underline">
                ব্যবহারের শর্তাবলী
              </Link>{" "}
              পড়েছি এবং মেনে নিচ্ছি *
            </Label>
          </div>
          {errors.agreeTerms && (
            <div className="flex items-center gap-1 text-red-500 text-sm ml-6">
              <AlertCircle className="w-4 h-4" />
              {errors.agreeTerms}
            </div>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreePrivacy"
              checked={formData.agreePrivacy}
              onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
              className="mt-1"
            />
            <Label htmlFor="agreePrivacy" className="text-sm text-gray-700 leading-relaxed">
              আমি{" "}
              <Link to="/privacy" className="text-red-600 hover:underline">
                গোপনীয়তা নীতি
              </Link>{" "}
              পড়েছি এবং মেনে নিচ্ছি *
            </Label>
          </div>
          {errors.agreePrivacy && (
            <div className="flex items-center gap-1 text-red-500 text-sm ml-6">
              <AlertCircle className="w-4 h-4" />
              {errors.agreePrivacy}
            </div>
          )}

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreeNotifications"
              checked={formData.agreeNotifications}
              onCheckedChange={(checked) => setFormData({ ...formData, agreeNotifications: checked as boolean })}
              className="mt-1"
            />
            <Label htmlFor="agreeNotifications" className="text-sm text-gray-700 leading-relaxed">
              জরুরি রক্তের প্রয়োজনে আমাকে নোটিফিকেশন পাঠান (সুপারিশকৃত)
            </Label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-2xl">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান
        </Link>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              রক্তদাতা হিসেবে নিবন্ধন
            </CardTitle>
            <CardDescription className="text-gray-600">জীবন বাঁচানোর মহান কাজে যোগ দিন</CardDescription>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= currentStep ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-red-600" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    পূর্ববর্তী
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    পরবর্তী
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className="ml-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        নিবন্ধন হচ্ছে...
                      </div>
                    ) : (
                      "নিবন্ধন সম্পন্ন করুন"
                    )}
                  </Button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <Link to="/login-page" className="text-red-600 hover:text-red-700 font-semibold hover:underline">
                  লগইন করুন
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default RegistrationPage