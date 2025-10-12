/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// UI কম্পোনেন্ট এবং আইকন ইম্পোর্ট
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Heart,
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  bloodGroups,
  districts,
  divisions,
  upazilas,
} from "@/lib/locationData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterDonorMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

// Zod ভ্যালিডেশন স্কিমা তৈরি
const formSchema = z
  .object({
    // Step 1: Personal Info
    name: z.string().min(2, { message: "নাম কমপক্ষে ২ অক্ষরের হতে হবে" }),
    email: z.string().email({ message: "সঠিক ইমেইল ঠিকানা দিন" }),
    phone: z
      .string()
      .regex(/^01[3-9]\d{8}$/, { message: "সঠিক বাংলাদেশি ফোন নম্বর দিন" }),
    password: z
      .string()
      .min(8, { message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" }),
    confirmPassword: z.string(),

    // Step 2: Donor Info
    bloodGroup: z.string().min(1, { message: "রক্তের গ্রুপ নির্বাচন করুন" }),
    age: z
      .string()
      .refine((val) => !isNaN(parseInt(val, 10)), {
        message: "বয়স সংখ্যায় দিন",
      })
      .refine((val) => parseInt(val, 10) >= 18 && parseInt(val, 10) <= 65, {
        message: "বয়স ১৮-৬৫ বছরের মধ্যে হতে হবে",
      }),
    weight: z
      .string()
      .refine((val) => !isNaN(parseInt(val, 10)), {
        message: "ওজন সংখ্যায় দিন",
      })
      .refine((val) => parseInt(val, 10) >= 45, {
        message: "ওজন কমপক্ষে ৪৫ কেজি হতে হবে",
      }),
    previousDonations: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          const num = parseInt(val, 10);
          return !isNaN(num) && num >= 0;
        },
        {
          message: "সঠিক সংখ্যা দিন (যেমন: ০, ৫, ১৫)",
        }
      ),
    lastDonation: z.string().optional(),
    medicalHistory: z.string().optional(),

    // Step 3: Location
    division: z.string().min(1, { message: "বিভাগ নির্বাচন করুন" }),
    district: z.string().min(1, { message: "জেলা নির্বাচন করুন" }),
    upazila: z.string().min(1, { message: "উপজেলা নির্বাচন করুন" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  });

// প্রতিটি ধাপের জন্য ফিল্ডের তালিকা
const step1Fields: (keyof z.infer<typeof formSchema>)[] = [
  "name",
  "email",
  "phone",
  "password",
  "confirmPassword",
];
const step2Fields: (keyof z.infer<typeof formSchema>)[] = [
  "bloodGroup",
  "age",
  "weight",
  "previousDonations",
];

const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 


   const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // RTK Query থেকে mutation হুক ব্যবহার করুন
  // এটি একটি trigger ফাংশন (registerDonor) এবং mutation-এর বিভিন্ন স্টেট (যেমন isLoading) রিটার্ন করে
  const [registerDonor, { isLoading }] = useRegisterDonorMutation(); 


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      previousDonations: "",
      bloodGroup: "",
      age: "",
      weight: "",
      lastDonation: "",
      medicalHistory: "",
      division: "",
      district: "",
      upazila: "",
    },
  });

  const watchedDivision = form.watch("division");
  const watchedDistrict = form.watch("district");

  const handleNext = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = step1Fields;
    } else if (currentStep === 2) {
      fieldsToValidate = step2Fields;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

// onSubmit ফাংশনটি এভাবে পরিবর্তন করুন

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("নিবন্ধন প্রক্রিয়া চলছে...");

    try {
      // 1. ব্যাকএন্ডে পাঠানোর জন্য ডেটা প্রস্তুত করুন
      // - confirmPassword ফিল্ডটি বাদ দিন কারণ এটি ব্যাকএন্ডে দরকার নেই
      // - age, weight, previousDonations কে number এ রূপান্তর করুন
      const { confirmPassword, ...donorData } = data;

      const submitData = {
        ...donorData,
        age: Number(donorData.age),
        weight: Number(donorData.weight),
        previousDonations: donorData.previousDonations
          ? Number(donorData.previousDonations)
          : 0,
        isAvailable: true, // আপনার আগের লজিক অনুযায়ী
      };

      // 2. API-তে ডেটা পাঠান
      // .unwrap() ব্যবহার করলে 성공 বা ব্যর্থতার রেজাল্ট সরাসরি পাওয়া যায়
      const res = await registerDonor(submitData).unwrap();
      
      // 3. সফল হলে Redux store এ user এবং token সেভ করুন
      if (res?.data?.token) {
        dispatch(setUser({ user: res.data.user, token: res.data.token }));
        toast.success("নিবন্ধন সফল হয়েছে!", { id: toastId });
        navigate("/dashboard"); // ব্যবহারকারীকে ড্যাশবোর্ড বা প্রোফাইল পেজে পাঠান
      }

    } catch (error: any) {
      // 4. কোনো এরর হলে ব্যবহারকারীকে জানান
      console.error(error);
      const errorMessage = error?.data?.message || "নিবন্ধন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
      toast.error(errorMessage, { id: toastId });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          ব্যক্তিগত তথ্য
        </h3>
        <p className="text-gray-600">আপনার মৌলিক তথ্য দিন</p>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>পূর্ণ নাম *</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  {...field}
                  className="pl-10 h-12 border-red-200 focus:border-red-400"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ইমেইল ঠিকানা *</FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="email"
                  placeholder="আপনার ইমেইল ঠিকানা"
                  {...field}
                  className="pl-10 h-12 border-red-200 focus:border-red-400"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>মোবাইল নম্বর *</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  {...field}
                  className="pl-10 h-12 border-red-200 focus:border-red-400"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>পাসওয়ার্ড *</FormLabel>
            <FormControl>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                  {...field}
                  className="pl-10 pr-10 h-12 border-red-200 focus:border-red-400"
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>পাসওয়ার্ড নিশ্চিত করুন *</FormLabel>
            <FormControl>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  {...field}
                  className="pl-10 pr-10 h-12 border-red-200 focus:border-red-400"
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          রক্তদানের তথ্য
        </h3>
        <p className="text-gray-600">আপনার স্বাস্থ্য সংক্রান্ত তথ্য দিন</p>
      </div>
      <FormField
        control={form.control}
        name="bloodGroup"
        render={({ field }) => (
          <FormItem>
            <FormLabel>রক্তের গ্রুপ *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="h-12 w-full border-red-200 focus:border-red-400">
                  <SelectValue placeholder="আপনার রক্তের গ্রুপ নির্বাচন করুন" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    <span className="font-semibold text-red-600 text-lg">
                      {group}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বয়স (বছর) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="২৫"
                  min="18"
                  max="65"
                  {...field}
                  className="h-12 border-red-200 focus:border-red-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ওজন (কেজি) *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="৬০"
                  min="45"
                  {...field}
                  className="h-12 border-red-200 focus:border-red-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="previousDonations"
        render={({ field }) => (
          <FormItem>
            <FormLabel> পূর্বে কতবার রক্তদান করেছেন (ঐচ্ছিক) </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="যেমন: 4"
                min="0"
                {...field}
                className="h-12 border-red-200 focus:border-red-400"
              />
            </FormControl>
          </FormItem>
        )}
      ></FormField>
      <FormField
        control={form.control}
        name="lastDonation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>শেষ রক্তদানের তারিখ (ঐচ্ছিক)</FormLabel>
            <FormControl>
              <Input
                type="date"
                {...field}
                className="h-12 border-red-200 focus:border-red-400"
              />
            </FormControl>
            <p className="text-xs text-gray-500">
              যদি আগে কখনো রক্তদান না করে থাকেন তাহলে খালি রাখুন
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="medicalHistory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>চিকিৎসা ইতিহাস (ঐচ্ছিক)</FormLabel>
            <FormControl>
              <textarea
                {...field}
                placeholder="কোনো গুরুতর অসুখ বা চিকিৎসা সংক্রান্ত তথ্য থাকলে লিখুন"
                className="w-full h-24 px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 resize-none"
              />
            </FormControl>
            <p className="text-xs text-gray-500">
              যেমন: ডায়াবেটিস, উচ্চ রক্তচাপ, হৃদরোগ ইত্যাদি
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
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
  );

  const renderStep3 = () => {
    const availableUpazilas =
      upazilas[watchedDistrict as keyof typeof upazilas] || [];

    return (
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            ঠিকানা ও চূড়ান্ত করুন
          </h3>
          <p className="text-gray-600">আপনার ঠিকানা এবং সম্মতি</p>
        </div>
        <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>বিভাগ *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("district", "");
                  form.setValue("upazila", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-12 w-full border-red-200 focus:border-red-400">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {divisions.map((division) => (
                    <SelectItem key={division} value={division}>
                      {division}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {watchedDivision && (
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>জেলা *</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("upazila", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full border-red-200 focus:border-red-400">
                      <SelectValue placeholder="জেলা নির্বাচন করুন" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts[watchedDivision as keyof typeof districts]?.map(
                      (district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {watchedDistrict && (
          <FormField
            control={form.control}
            name="upazila"
            render={({ field }) => (
              <FormItem>
                <FormLabel>উপজেলা/থানা *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full border-red-200 focus:border-red-400">
                      <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableUpazilas.map((upazila) => (
                      <SelectItem key={upazila} value={upazila}>
                        {upazila}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Separator />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <a
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান
        </a>
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              রক্তদাতা হিসেবে নিবন্ধন
            </CardTitle>
            <CardDescription className="text-gray-600">
              জীবন বাঁচানোর মহান কাজে যোগ দিন
            </CardDescription>
            <div className="flex items-center justify-center mt-6 space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= currentStep
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-12 h-1 mx-2 ${
                        step < currentStep ? "bg-red-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

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
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    >
                      পরবর্তী
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="ml-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    >
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
            </Form>
            <div className="text-center pt-4 border-t">
              <p className="text-gray-600">
                ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                <a
                  href="/login-page"
                  className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  লগইন করুন
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
