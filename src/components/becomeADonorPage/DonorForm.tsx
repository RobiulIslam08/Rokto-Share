"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI কম্পোনেন্ট এবং আইকন ইম্পোর্ট
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Heart,
  User,
  MapPin,
  AlertCircle,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  bloodGroups,
  divisions,
  districts,
  upazilas,
} from "@/lib/locationData";

// Zod ভ্যালিডেশন স্কিমা
const donorFormSchema = z
  .object({
    name: z.string().min(3, { message: "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" }),
    email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন" }),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, { message: "সঠিক বাংলাদেশি ফোন নম্বর দিন" }),
    password: z
      .string()
      .min(8, { message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" }),
    confirmPassword: z.string(),
    bloodGroup: z.string().min(1, { message: "রক্তের গ্রুপ নির্বাচন করুন" }),
    age: z.coerce
      .number()
      .min(18, { message: "বয়স কমপক্ষে ১৮ বছর হতে হবে" })
      .max(65, { message: "বয়স সর্বোচ্চ ৬৫ বছর হতে পারে" }),
    weight: z.coerce
      .number()
      .min(45, { message: "ওজন কমপক্ষে ৪৫ কেজি হতে হবে" }),
    lastDonation: z.string().optional(),
    division: z.string().min(1, { message: "বিভাগ নির্বাচন করুন" }),
    district: z.string().min(1, { message: "জেলা নির্বাচন করুন" }),
    upazila: z.string().min(1, { message: "উপজেলা নির্বাচন করুন" }),
    medicalHistory: z.string().optional(),
previousDonations: z.coerce
  .number()
  .min(0, { message: "সঠিক সংখ্যা দিন (যেমন: ০, ৫, ১৫)" })
  .optional(),    isAvailable: z.boolean().default(true),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"], // কোন ফিল্ডে error দেখাতে হবে
  });

// Zod স্কিমা থেকে TypeScript টাইপ তৈরি
type DonorFormData = z.infer<typeof donorFormSchema>;

// Props Type
type DonorFormProps = {
  onSubmit: (data: DonorFormData) => Promise<void>;
  defaultValues?: Partial<DonorFormData>;
};

export const DonorForm = ({ onSubmit, defaultValues }: DonorFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      previousDonations:"",
      bloodGroup: "",
      age: undefined,
      weight: undefined,
      lastDonation: "",
      division: "",
      district: "",
      upazila: "",
      medicalHistory: "",

      isAvailable: true,
      ...defaultValues,
    },
  });

  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");

  const availableDistricts = selectedDivision
    ? districts[selectedDivision as keyof typeof districts] || []
    : [];
  const availableUpazilas = selectedDistrict
    ? upazilas[selectedDistrict as keyof typeof upazilas] || []
    : [];

  const handleDivisionChange = (value: string) => {
    setValue("division", value);
    setValue("district", "");
    setValue("upazila", "");
  };

  const handleDistrictChange = (value: string) => {
    setValue("district", value);
    setValue("upazila", "");
  };

  const renderErrorMessage = (message: string | undefined) => {
    if (!message) return null;
    return (
      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
        <AlertCircle className="w-4 h-4" />
        {message}
      </div>
    );
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">রক্তদাতার তথ্য</CardTitle>{" "}
        <CardDescription className="text-center">
          সঠিক তথ্য দিয়ে রক্তদাতা হিসেবে নিবন্ধন করুন
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              ব্যক্তিগত তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">পূর্ণ নাম *</Label>
                <Input
                  id="name"
                  placeholder="আপনার পূর্ণ নাম"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {renderErrorMessage(errors.name?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ইমেইল ঠিকানা *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {renderErrorMessage(errors.email?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                <Input
                  id="phone"
                  placeholder="01XXXXXXXXX"
                  {...register("phone")}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {renderErrorMessage(errors.phone?.message)}
              </div>
              {/* পাসওয়ার্ড ফিল্ড */}
              <div className="space-y-2">
                <Label htmlFor="password">পাসওয়ার্ড *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    {...register("password")}
                    className={`pl-10 pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {renderErrorMessage(errors.password?.message)}
              </div>
              {/* কনফার্ম পাসওয়ার্ড ফিল্ড */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  পাসওয়ার্ড নিশ্চিত করুন *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড আবার লিখুন"
                    {...register("confirmPassword")}
                    className={`pl-10 pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {renderErrorMessage(errors.confirmPassword?.message)}
              </div>
            </div>
          </div>

          <Separator />
          {/* Health Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600" />
              স্বাস্থ্য তথ্য
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>রক্তের গ্রুপ *</Label>
                <Controller
                  name="bloodGroup"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className={errors.bloodGroup ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group) => (
                          <SelectItem key={group} value={group}>
                            <span className="font-semibold text-red-600">
                              {group}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {renderErrorMessage(errors.bloodGroup?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">বয়স (বছর) *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="২৫"
                  {...register("age")}
                  className={errors.age ? "border-red-500" : ""}
                />
                {renderErrorMessage(errors.age?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">ওজন (কেজি) *</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="৬০"
                  {...register("weight")}
                  className={errors.weight ? "border-red-500" : ""}
                />
                {renderErrorMessage(errors.weight?.message)}
              </div>
            </div>

            {/* rokto dan count and date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="lastDonation">
                  পূর্বে কতবার রক্তদান করেছেন (ঐচ্ছিক)
                </Label>
                <Input
                  id="previousDonations"
                  type="number"
                  {...register("previousDonations")}
                />
                   {renderErrorMessage(errors.previousDonations?.message)}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDonation">
                  শেষ রক্তদানের তারিখ (ঐচ্ছিক)
                </Label>
                <Input
                  id="lastDonation"
                  type="date"
                  {...register("lastDonation")}
                />
              </div>
            </div>
          </div>
          <Separator />

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-600" />
              ঠিকানা
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>বিভাগ *</Label>
                <Controller
                  name="division"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => handleDivisionChange(value)}
                    >
                      <SelectTrigger
                        className={errors.division ? "border-red-500" : ""}
                      >
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
                  )}
                />
                {renderErrorMessage(errors.division?.message)}
              </div>
              <div className="space-y-2">
                <Label>জেলা *</Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => handleDistrictChange(value)}
                      disabled={!selectedDivision}
                    >
                      <SelectTrigger
                        className={errors.district ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="জেলা নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDistricts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {renderErrorMessage(errors.district?.message)}
              </div>
              <div className="space-y-2">
                <Label>উপজেলা *</Label>
                <Controller
                  name="upazila"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={
                        !selectedDistrict || availableUpazilas.length === 0
                      }
                    >
                      <SelectTrigger
                        className={errors.upazila ? "border-red-500" : ""}
                      >
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
                  )}
                />
                {renderErrorMessage(errors.upazila?.message)}
              </div>
            </div>
          </div>

          <Separator />
          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              অতিরিক্ত তথ্য
            </h3>
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">চিকিৎসা ইতিহাস (ঐচ্ছিক)</Label>
              <Textarea
                id="medicalHistory"
                placeholder="কোনো গুরুতর অসুখ বা অ্যালার্জি থাকলে উল্লেখ করুন"
                {...register("medicalHistory")}
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-800">
                  রক্তদানের জন্য উপলব্ধ
                </h4>
                <p className="text-sm text-green-600">
                  জরুরি প্রয়োজনে আপনাকে যোগাযোগ করা হবে
                </p>
              </div>
              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                নিবন্ধন হচ্ছে...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-5 md:w-7 h-5 md:h-7" />
                <p className="text-sm md:text-lg">
                  রক্তদাতা হিসেবে নিবন্ধন করুন
                </p>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
