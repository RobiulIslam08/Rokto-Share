// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea"; // যদিও Textarea ব্যবহার হচ্ছে না, ইম্পোর্ট রাখা যেতে পারে
// import { Separator } from "@/components/ui/separator";
// import { Switch } from "@/components/ui/switch";
// import { Heart, User, MapPin, AlertCircle } from "lucide-react";
// // districts এবং upazilas ইম্পোর্ট করা হয়েছে
// import {
//   bloodGroups,
//   divisions,
//   districts,
//   upazilas,
// } from "@/lib/locationData";

// // Props এর জন্য একটি টাইপ ডিফাইন করা ভালো
// type DonorFormProps = {
//   formData: any;
//   setFormData: (data: any) => void;
//   errors: { [key: string]: string };
//   handleSubmit: (e: React.FormEvent) => void;
//   isSubmitting: boolean;
// };

// export const DonorForm = ({
//   formData,
//   setFormData,
//   errors,
//   handleSubmit,
//   isSubmitting,
// }: DonorFormProps) => {
 
//   // নির্বাচিত জেলার জন্য উপজেলার তালিকা
//   const availableUpazilas =
//     formData.district && upazilas[formData.district as keyof typeof upazilas]
//       ? upazilas[formData.district as keyof typeof upazilas]
//       : [];

//   return (
//     <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl text-center">রক্তদাতার তথ্য</CardTitle>
//         <CardDescription className="text-center">
//           সঠিক তথ্য দিয়ে রক্তদাতা হিসেবে নিবন্ধন করুন
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Personal Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <User className="w-5 h-5 text-red-600" />
//               ব্যক্তিগত তথ্য
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">পূর্ণ নাম *</Label>
//                 <Input
//                   id="name"
//                   placeholder="আপনার পূর্ণ নাম"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className={`form-input ${
//                     errors.name ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.name && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.name}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">ইমেইল ঠিকানা *</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                   className={`form-input ${
//                     errors.email ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.email && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.email}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="phone">মোবাইল নম্বর *</Label>
//                 <Input
//                   id="phone"
//                   placeholder="01XXXXXXXXX"
//                   value={formData.phone}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phone: e.target.value })
//                   }
//                   className={`form-input ${
//                     errors.phone ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.phone && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.phone}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="emergencyContact">জরুরি যোগাযোগ</Label>
//                 <Input
//                   id="emergencyContact"
//                   placeholder="01XXXXXXXXX"
//                   value={formData.emergencyContact}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       emergencyContact: e.target.value,
//                     })
//                   }
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           </div>

//           <Separator />

//           {/* Health Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <Heart className="w-5 h-5 text-red-600" />
//               স্বাস্থ্য তথ্য
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <Label>রক্তের গ্রুপ *</Label>
//                 <Select
//                   value={formData.bloodGroup}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, bloodGroup: value })
//                   }
//                 >
//                   <SelectTrigger
//                     className={`form-input ${
//                       errors.bloodGroup ? "border-red-500" : ""
//                     }`}
//                   >
//                     <SelectValue placeholder="নির্বাচন করুন" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {bloodGroups.map((group) => (
//                       <SelectItem key={group} value={group}>
//                         <span className="font-semibold text-red-600">
//                           {group}
//                         </span>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.bloodGroup && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.bloodGroup}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="age">বয়স (বছর) *</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   placeholder="২৫"
//                   min="18"
//                   max="65"
//                   value={formData.age}
//                   onChange={(e) =>
//                     setFormData({ ...formData, age: e.target.value })
//                   }
//                   className={`form-input ${errors.age ? "border-red-500" : ""}`}
//                 />
//                 {errors.age && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.age}
//                   </div>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="weight">ওজন (কেজি) *</Label>
//                 <Input
//                   id="weight"
//                   type="number"
//                   placeholder="৬০"
//                   min="45"
//                   value={formData.weight}
//                   onChange={(e) =>
//                     setFormData({ ...formData, weight: e.target.value })
//                   }
//                   className={`form-input ${
//                     errors.weight ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.weight && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.weight}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="lastDonation">শেষ রক্তদানের তারিখ (ঐচ্ছিক)</Label>
//               <Input
//                 id="lastDonation"
//                 type="date"
//                 value={formData.lastDonation}
//                 onChange={(e) =>
//                   setFormData({ ...formData, lastDonation: e.target.value })
//                 }
//                 className="form-input"
//               />
//             </div>
//           </div>

//           <Separator />

//           {/* Location Information - পরিবর্তিত অংশ */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//               <MapPin className="w-5 h-5 text-red-600" />
//               ঠিকানা
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {/* Division Dropdown */}
//               <div className="space-y-2">
//                 <Label>বিভাগ *</Label>
//                 <Select
//                   value={formData.division}
//                   onValueChange={(value) =>
//                     setFormData({
//                       ...formData,
//                       division: value,
//                       district: "",
//                       upazila: "",
//                     })
//                   }
//                 >
//                   <SelectTrigger
//                     className={`form-input ${
//                       errors.division ? "border-red-500" : ""
//                     }`}
//                   >
//                     <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {divisions.map((division) => (
//                       <SelectItem key={division} value={division}>
//                         {division}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.division && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.division}
//                   </div>
//                 )}
//               </div>

//               {/* District Dropdown */}
//               <div className="space-y-2">
//                 <Label>জেলা *</Label>
//                 <Select
//                   value={formData.district}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, district: value, upazila: "" })
//                   }
//                   disabled={!formData.division}
//                 >
//                   <SelectTrigger
//                     className={`form-input ${
//                       errors.district ? "border-red-500" : ""
//                     }`}
//                   >
//                     <SelectValue placeholder="জেলা নির্বাচন করুন" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {districts[
//                       formData.division as keyof typeof districts
//                     ]?.map((district) => (
//                       <SelectItem key={district} value={district}>
//                         {district}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.district && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.district}
//                   </div>
//                 )}
//               </div>

//               {/* Upazila Dropdown */}
//               <div className="space-y-2">
//                 <Label>উপজেলা *</Label>
//                 <Select
//                   value={formData.upazila}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, upazila: value })
//                   }
//                   disabled={
//                     !formData.district || availableUpazilas.length === 0
//                   }
//                 >
//                   <SelectTrigger
//                     className={`form-input ${
//                       errors.upazila ? "border-red-500" : ""
//                     }`}
//                   >
//                     <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {availableUpazilas.map((upazila) => (
//                       <SelectItem key={upazila} value={upazila}>
//                         {upazila}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {errors.upazila && (
//                   <div className="flex items-center gap-1 text-red-500 text-sm">
//                     <AlertCircle className="w-4 h-4" />
//                     {errors.upazila}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* বিস্তারিত ঠিকানা 필্ডটি বাদ দেওয়া হয়েছে */}
//           </div>

//           <Separator />

//           {/* Additional Information */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-800">
//               অতিরিক্ত তথ্য
//             </h3>

//             <div className="space-y-2">
//               <Label htmlFor="medicalHistory">চিকিৎসা ইতিহাস (ঐচ্ছিক)</Label>
//               <Textarea
//                 id="medicalHistory"
//                 placeholder="কোনো গুরুতর অসুখ বা অ্যালার্জি থাকলে উল্লেখ করুন"
//                 value={formData.medicalHistory}
//                 onChange={(e) =>
//                   setFormData({ ...formData, medicalHistory: e.target.value })
//                 }
//                 className="form-input"
//               />
//             </div>

//             <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
//               <div>
//                 <h4 className="font-medium text-green-800">
//                   রক্তদানের জন্য উপলব্ধ
//                 </h4>
//                 <p className="text-sm text-green-600">
//                   জরুরি প্রয়োজনে আপনাকে যোগাযোগ করা হবে
//                 </p>
//               </div>
//               <Switch
//                 checked={formData.isAvailable}
//                 onCheckedChange={(checked) =>
//                   setFormData({ ...formData, isAvailable: checked })
//                 }
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <Button
//             type="submit"
//             disabled={isSubmitting}
//             className="cursor-pointer w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg font-semibold"
//           >
//             {isSubmitting ? (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 নিবন্ধন হচ্ছে...
//               </div>
//             ) : (
//               <div className="flex items-center justify-center gap-2 ">
//                 <Heart className="w-5 md:w-7 h-5 md:h-7" />
//                 <p className="text-sm md:text-lg ">
//                   রক্তদাতা হিসেবে নিবন্ধন করুন
//                 </p>
//               </div>
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

    //  <FormField
    //     control={form.control}
    //     name="previousDonations"
    //     render={({ field }) => (
    //       <FormItem>
    //         <FormLabel>পূর্বে কতবার রক্তদান করেছেন (ঐচ্ছিক)</FormLabel>
    //         <FormControl>
    //           <Input
    //             type="number"
    //             placeholder="যেমন: ১৫"
    //             min="0"
    //             {...field}
    //             className="h-12 border-red-200 focus:border-red-400"
    //           />
    //         </FormControl>
    //         <FormMessage />
    //       </FormItem>
    //     )}
    //   />