/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "ইমেইল আবশ্যক")
    .email("সঠিক ইমেইল ঠিকানা দিন"),
  password: z
    .string()
    .min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setApiError("");

    try {
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      // ✅ Store user data in Redux (Redux Persist automatically save করবে)
      dispatch(
        setUser({
          user: result.data.user,
          token: result.data.accessToken,
        })
      );

      // ❌ localStorage.setItem সরিয়ে দিন - Redux Persist handle করবে
      // Remember Me feature এখন Redux Persist দ্বারা automatically handled হচ্ছে

      toast.success("সফলভাবে লগইন হয়েছে!");
      
      // Navigate to dashboard
      navigate("/dashboard/user");
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage =
        err?.data?.message ||
        err?.message ||
        "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      setApiError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Handle API error messages
  useEffect(() => {
    if (isError && error) {
      const apiErr = error as any;
      const errorMessage =
        apiErr?.data?.message ||
        apiErr?.message ||
        "লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।";
      setApiError(errorMessage);
    }
  }, [isError, error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          হোমে ফিরে যান
        </Link>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              স্বাগতম
            </CardTitle>
            <CardDescription className="text-gray-600">
              আপনার অ্যাকাউন্টে লগইন করুন
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* API Error Message */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  ইমেইল ঠিকানা
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="আপনার ইমেইল দিন"
                    {...register("email")}
                    className={`pl-10 h-12 border-red-200 focus:border-red-400 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  পাসওয়ার্ড
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="আপনার পাসওয়ার্ড দিন"
                    {...register("password")}
                    className={`pl-10 pr-10 h-12 border-red-200 focus:border-red-400 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.password.message}
                  </div>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setValue("rememberMe", checked as boolean)
                    }
                    disabled={isLoading}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    আমাকে মনে রাখুন
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-red-600 hover:text-red-700 hover:underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    লগইন হচ্ছে...
                  </div>
                ) : (
                  "লগইন করুন"
                )}
              </Button>
            </form>

            <Separator />

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                অ্যাকাউন্ট নেই?{" "}
                <Link
                  to="/register-page"
                  className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                >
                  নিবন্ধন করুন
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            লগইন করার মাধ্যমে আপনি আমাদের{" "}
            <Link to="/terms" className="text-red-600 hover:underline">
              ব্যবহারের শর্তাবলী
            </Link>{" "}
            এবং{" "}
            <Link to="/privacy" className="text-red-600 hover:underline">
              গোপনীয়তা নীতি
            </Link>{" "}
            মেনে নিচ্ছেন।
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;