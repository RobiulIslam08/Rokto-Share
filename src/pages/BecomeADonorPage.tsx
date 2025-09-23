
"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { SuccessMessage } from "@/components/becomeADonorPage/SuccessMessage"
import { PageHeader } from "@/components/becomeADonorPage/PageHeader"
import { DonorForm } from "@/components/becomeADonorPage/DonorForm"
import { Sidebar } from "@/components/becomeADonorPage/Sidebar"


const BecomeADonorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    age: "",
    weight: "",
    division: "",
    district: "",
    address: "",
    lastDonation: "",
    medicalHistory: "",
    isAvailable: true,
    emergencyContact: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    // আপনার validation লজিক এখানে অপরিবর্তিত থাকবে
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "নাম আবশ্যক"
    // ... অন্যান্য সকল validation ...
    if (!formData.address.trim()) newErrors.address = "ঠিকানা আবশ্যক"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
    }, 2000)
  }

  if (showSuccess) {
    return <SuccessMessage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <DonorForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </motion.div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default BecomeADonorPage