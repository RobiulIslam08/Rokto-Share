

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SuccessMessage } from "@/components/becomeADonorPage/SuccessMessage";
import { PageHeader } from "@/components/becomeADonorPage/PageHeader";
import { DonorForm } from "@/components/becomeADonorPage/DonorForm";
import { Sidebar } from "@/components/becomeADonorPage/Sidebar";

// Form Data Type (DonorForm থেকে import করতে পারেন)
type DonorFormData = {
  name: string;
  email: string;
  phone: string;
  emergencyContact?: string;
  bloodGroup: string;
  age: string;
  weight: string;
  lastDonation?: string;
  division: string;
  district: string;
  upazila: string;
  medicalHistory?: string;
  isAvailable: boolean;
};

const BecomeADonorPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Form submit handler - React Hook Form থেকে data আসবে
  const handleFormSubmit = async (data: DonorFormData) => {
    try {
      // API call করুন এখানে
      console.log("Form Data:", data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // আপনার API call
      // const response = await fetch('/api/donors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) throw new Error('Failed to register');
      
      // Success এর পরে
      setShowSuccess(true);
      
      // Optional: Toast notification
      // toast.success("রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে!");
      
    } catch (error) {
      console.error("Registration error:", error);
      // Error handling
      // toast.error("নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
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
              <DonorForm onSubmit={handleFormSubmit} />
            </motion.div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default BecomeADonorPage;