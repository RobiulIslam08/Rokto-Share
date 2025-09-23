

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  HeadphonesIcon,
  Heart,
  Zap,
  Shield,
  Users,
} from "lucide-react"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const contactMethods = [
  {
    icon: Phone,
    title: "ফোন",
    description: "সরাসরি যোগাযোগ",
    value: "০১৭xxxxxxxx",
    color: "text-red-600 bg-red-50",
    gradient: "from-red-500 to-red-600",
  },
  {
    icon: Mail,
    title: "ইমেইল",
    description: "যেকোনো প্রশ্নের জন্য",
    value: "contact@roktoshare.com",
    color: "text-rose-600 bg-rose-50",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    icon: MessageSquare,
    title: "মেসেজ",
    description: "তাৎক্ষণিক উত্তর",
    value: "এখনই মেসেজ করুন",
    color: "text-pink-600 bg-pink-50",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    icon: Heart,
    title: "সেবা",
    description: "রক্তদান সহায়তা",
    value: "২৪/৭ উপলব্ধ",
    color: "text-red-700 bg-red-100",
    gradient: "from-red-600 to-red-700",
  },
]

const faqItems = [
  {
    question: "কিভাবে রক্তদাতা হিসেবে যুক্ত হব?",
    answer: "আমাদের প্ল্যাটফর্মে সহজেই নিবন্ধন করে রক্তদাতা হিসেবে যুক্ত হতে পারেন।",
  },
  {
    question: "রক্তদানের জন্য কোনো ফি লাগে?",
    answer: "না, এটি সম্পূর্ণ বিনামূল্যে। রক্তদান একটি মানবিক সেবা।",
  },
  {
    question: "জরুরি প্রয়োজনে কত দ্রুত সাহায্য পাব?",
    answer: "আমরা যত দ্রুত সম্ভব উপযুক্ত রক্তদাতার তথ্য প্রদান করার চেষ্টা করি।",
  },
  {
    question: "আমার তথ্য কি নিরাপদ থাকবে?",
    answer: "হ্যাঁ, আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা নিশ্চিত করা হয়।",
  },
]


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = "নাম আবশ্যক"
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

    if (!formData.subject.trim()) {
      newErrors.subject = "বিষয় আবশ্যক"
    }

    if (!formData.category) {
      newErrors.category = "বিভাগ নির্বাচন করুন"
    }

    if (!formData.message.trim()) {
      newErrors.message = "বার্তা আবশ্যক"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="max-w-md w-full"
        >
          <Card className="text-center shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-500" />

            <CardContent className="p-8 relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4"
              >
                বার্তা পাঠানো হয়েছে!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6 leading-relaxed"
              >
                আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমি শীঘ্রই আপনার সাথে যোগাযোগ করব।
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-3"
              >
                <Link to="/">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    হোমে ফিরে যান
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => setShowSuccess(false)}
                >
                  আরেকটি বার্তা পাঠান
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-200/20 to-rose-200/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-pink-200/20 to-red-200/20 rounded-full blur-xl"
        />
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-red-100 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              হোমে ফিরে যান
            </Link>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
            >
              যোগাযোগ করুন
            </motion.h1>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div
               animate={{ y: [0, -10, 0] }}
              className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
            >
              <HeadphonesIcon className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
            >
              আমার সাথে যোগাযোগ করুন
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              রক্তদান সেবায় আপনার যেকোনো প্রশ্ন, পরামর্শ বা সহায়তার জন্য আমি এখানে আছি। একসাথে আমরা জীবন বাঁচানোর এই মহৎ কাজে এগিয়ে চলি।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {[
                { icon: Heart, label: "রক্তদাতা", value: "১০০+" },
                { icon: Users, label: "সেবা গ্রহীতা", value: "৫০+" },
                { icon: Zap, label: "দ্রুত সেবা", value: "২৪/৭" },
                { icon: Shield, label: "নিরাপত্তা", value: "১০০%" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-red-100"
                >
                  <stat.icon className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white/60 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              যোগাযোগের মাধ্যম
            </h3>
            <p className="text-gray-600">আপনার সুবিধামতো যেকোনো মাধ্যমে যোগাযোগ করুন</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white/80 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <CardContent className="p-6 relative">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-full ${method.color} flex items-center justify-center shadow-lg`}
                    >
                      <method.icon className="w-8 h-8" />
                    </motion.div>

                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <p className="font-semibold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                      {method.value}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-500 animate-pulse" />

                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Send className="w-6 h-6 text-red-600" />
                    </motion.div>
                    বার্তা পাঠান
                  </CardTitle>
                  <CardDescription>আপনার প্রশ্ন বা মতামত আমাকে জানান</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">নাম *</Label>
                        <Input
                          id="name"
                          placeholder="আপনার নাম"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 ${errors.name ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                        />
                        {errors.name && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">ইমেইল *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 ${errors.email ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                        />
                        {errors.email && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">ফোন নম্বর *</Label>
                        <Input
                          id="phone"
                          placeholder="01XXXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                        />
                        {errors.phone && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.phone}
                          </motion.div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>বিভাগ *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger
                            className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 ${errors.category ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                          >
                            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">সাধারণ প্রশ্ন</SelectItem>
                            <SelectItem value="donation">রক্তদান সংক্রান্ত</SelectItem>
                            <SelectItem value="emergency">জরুরি সহায়তা</SelectItem>
                            <SelectItem value="feedback">মতামত ও পরামর্শ</SelectItem>
                            <SelectItem value="technical">প্রযুক্তিগত সমস্যা</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.category && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-1 text-red-500 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.category}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">বিষয় *</Label>
                      <Input
                        id="subject"
                        placeholder="আপনার বার্তার বিষয়"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 ${errors.subject ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                      />
                      {errors.subject && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1 text-red-500 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.subject}
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">বার্তা *</Label>
                      <Textarea
                        id="message"
                        placeholder="আপনার বিস্তারিত বার্তা লিখুন"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`form-input transition-all duration-300 focus:ring-2 focus:ring-red-500 resize-none ${errors.message ? "border-red-500" : "border-gray-200 focus:border-red-500"}`}
                      />
                      {errors.message && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1 text-red-500 text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </motion.div>
                      )}
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            পাঠানো হচ্ছে...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            বার্তা পাঠান
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info & FAQ */}
            <div className="space-y-8">
              {/* Personal Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-500" />

                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-red-600" />
                      যোগাযোগের তথ্য
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">অবস্থান</h4>
                        <p className="text-gray-600">ঢাকা, বাংলাদেশ</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">সেবার সময়</h4>
                        <p className="text-gray-600">
                          <span className="text-red-600 font-medium">জরুরি সেবা: ২৪/৭</span>
                          <br />
                          সাধারণ যোগাযোগ: সকাল ৯টা - রাত ৯টা
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-gray-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">আমাদের লক্ষ্য</h4>
                        <p className="text-gray-600">রক্তদানের মাধ্যমে জীবন বাঁচানো এবং মানবিক সেবা প্রদান করা।</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-500" />

                  <CardHeader>
                    <CardTitle className="text-xl">প্রায়শই জিজ্ঞাসিত প্রশ্ন</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {faqItems.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="border-b border-gray-100 pb-4 last:border-b-0"
                      >
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-start gap-2">
                          <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 text-sm ml-6">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
