/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import { SuccessMessage } from "@/components/becomeADonorPage/SuccessMessage";
// import { PageHeader } from "@/components/becomeADonorPage/PageHeader";
// import { DonorForm } from "@/components/becomeADonorPage/DonorForm";
// import { Sidebar } from "@/components/becomeADonorPage/Sidebar";

// // Form Data Type (DonorForm থেকে import করতে পারেন)
// type DonorFormData = {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   bloodGroup: string;
//   age: number;
//   weight: number;
//   division: string;
//   district: string;
//   upazila: string;
//   isAvailable: boolean;
//   lastDonation?: string;
//   medicalHistory?: string;
// };

// const BecomeADonorPage = () => {
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Form submit handler - React Hook Form থেকে data আসবে
//   const handleFormSubmit = async (data: DonorFormData) => {
//     try {
//       // API call করুন এখানে
//       console.log("Form Data:", data);

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000));

//       // আপনার API call
//       // const response = await fetch('/api/donors', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(data),
//       // });

//       // if (!response.ok) throw new Error('Failed to register');

//       // Success এর পরে
//       setShowSuccess(true);

//       // Optional: Toast notification
//       // toast.success("রক্তদাতা হিসেবে নিবন্ধন সফল হয়েছে!");
//     } catch (error) {
//       console.error("Registration error:", error);
//       // Error handling
//       // toast.error("নিবন্ধনে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
//     }
//   };

//   if (showSuccess) {
//     return <SuccessMessage />;
//   }

//   return (
//     <>
//       <title>রক্তদাতা হোন এবং জীবন বাঁচান | RoktoShare নিবন্ধন</title>
//       <meta
//         name="description"
//         content="RoktoShare প্ল্যাটফর্মে একজন গর্বিত রক্তদাতা হিসেবে নিবন্ধন করুন। আপনার এক ব্যাগ রক্ত পারে একটি জীবন বাঁচাতে। আমাদের সহজ নিবন্ধন ফর্ম পূরণ করে আপনিও হতে পারেন একজন জীবন রক্ষাকারী।"
//       />
//       <meta
//         name="keywords"
//         content="রক্তদাতা নিবন্ধন, become a blood donor, রক্তদান ফর্ম, RoktoShare, জীবন বাঁচানো, blood donation Bangladesh, অনলাইন রক্তদাতা"
//       />

//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
//         <PageHeader />
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             <div className="lg:col-span-2">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <DonorForm onSubmit={handleFormSubmit} />
//               </motion.div>
//             </div>
//             <Sidebar />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BecomeADonorPage;


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SuccessMessage } from "@/components/becomeADonorPage/SuccessMessage";
import { PageHeader } from "@/components/becomeADonorPage/PageHeader";
import { DonorForm } from "@/components/becomeADonorPage/DonorForm";
import { Sidebar } from "@/components/becomeADonorPage/Sidebar";
import { useRegisterDonorMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";

// Form Data Type
type DonorFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  bloodGroup: string;
  age: number;
  weight: number;
  division: string;
  district: string;
  upazila: string;
  isAvailable: boolean;
  lastDonation?: string;
  medicalHistory?: string;
  previousDonations?: number;
};

const BecomeADonorPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [registerDonor, { isLoading }] = useRegisterDonorMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Form submit handler - RegistrationPage থেকে same logic
  const handleFormSubmit = async (data: DonorFormData) => {
    const toastId = toast.loading("নিবন্ধন প্রক্রিয়া চলছে...");

    try {
      // 1. Backend এ পাঠানোর জন্য data prepare করুন
      const { confirmPassword, ...donorData } = data;

      const submitData = {
        ...donorData,
        age: Number(donorData.age),
        weight: Number(donorData.weight),
        previousDonations: donorData.previousDonations
          ? Number(donorData.previousDonations)
          : 0,
        isAvailable: true,
      };

      console.log("Submitting donor data:", submitData); // Debug করার জন্য

      // 2. API call করুন
      const res = await registerDonor(submitData).unwrap();

      // 3. Success হলে Redux store এ user এবং token save করুন
      if (res?.data?.accessToken) {
        dispatch(
          setUser({ user: res.data.user, token: res.data.accessToken })
        );
        toast.success("নিবন্ধন সফল হয়েছে!", { id: toastId });
        
        // Success message দেখান
        setShowSuccess(true);

        // 3 সেকেন্ড পরে dashboard এ redirect করুন
        setTimeout(() => {
          navigate("/dashboard/user");
        }, 3000);
      }
    } catch (error: any) {
      // 4. Error handling
      console.error("Registration error:", error);
      const errorMessage =
        error?.data?.message ||
        "নিবন্ধন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      toast.error(errorMessage, { id: toastId });
    }
  };

  if (showSuccess) {
    return (
      <>
        <title>নিবন্ধন সফল | RoktoShare</title>
        <meta name="description" content="আপনার রক্তদাতা নিবন্ধন সফল হয়েছে" />
        <SuccessMessage />
      </>
    );
  }

  return (
    <>
      <title>রক্তদাতা হোন এবং জীবন বাঁচান | RoktoShare নিবন্ধন</title>
      <meta
        name="description"
        content="RoktoShare প্ল্যাটফর্মে একজন গর্বিত রক্তদাতা হিসেবে নিবন্ধন করুন। আপনার এক ব্যাগ রক্ত পারে একটি জীবন বাঁচাতে।"
      />
      <meta
        name="keywords"
        content="রক্তদাতা নিবন্ধন, become a blood donor, রক্তদান ফর্ম, RoktoShare, জীবন বাঁচানো, blood donation Bangladesh"
      />

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
                  onSubmit={handleFormSubmit}
                  // isLoading prop pass করতে পারেন যদি DonorForm এ loading state দেখাতে চান
                />
              </motion.div>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeADonorPage;