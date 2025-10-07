"use client";
import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { SuccessMessage } from "@/components/becomeADonorPage/SuccessMessage";
import { PageHeader } from "@/components/becomeADonorPage/PageHeader";
import { DonorForm } from "@/components/becomeADonorPage/DonorForm";
import { Sidebar } from "@/components/becomeADonorPage/Sidebar";

const BecomeADonorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
    bloodGroup: "",
    age: "",
    weight: "",
    lastDonation: "",
    division: "",
    district: "",
    upazila: "",
    medicalHistory: "",
    isAvailable: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Personal Info Validation
    if (!formData.name.trim()) {
      newErrors.name = "পূর্ণ নাম আবশ্যক";
    }
    if (!formData.email) {
      newErrors.email = "ইমেইল ঠিকানা আবশ্যক";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা দিন";
    }
    if (!formData.phone) {
      newErrors.phone = "মোবাইল নম্বর আবশ্যক";
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "সঠিক বাংলাদেশি ফোন নম্বর দিন";
    }

    // Health Info Validation
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    }
    if (!formData.age) {
      newErrors.age = "বয়স আবশ্যক";
    } else if (
      Number.parseInt(formData.age) < 18 ||
      Number.parseInt(formData.age) > 65
    ) {
      newErrors.age = "বয়স ১৮-৬৫ বছরের মধ্যে হতে হবে";
    }
    if (!formData.weight) {
      newErrors.weight = "ওজন আবশ্যক";
    } else if (Number.parseInt(formData.weight) < 45) {
      newErrors.weight = "ওজন কমপক্ষে ৪৫ কেজি হতে হবে";
    }

    // Location Validation
    if (!formData.division) {
      newErrors.division = "বিভাগ নির্বাচন করুন";
    }
    if (!formData.district) {
      newErrors.district = "জেলা নির্বাচন করুন";
    }
    if (!formData.upazila) {
      newErrors.upazila = "উপজেলা নির্বাচন করুন";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);

     console.log(formData)
  };

  if (showSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
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
  );
};

export default BecomeADonorPage;
