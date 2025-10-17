// src/components/dashboard/ProfileSection.tsx
"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, CheckCircle, Award, Users, Loader2, Bell, Trophy } from "lucide-react";
import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";

// 1. Define Zod schema for validation - FIXED
const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladesh phone number"),
  email: z.string().email(),
  age: z.string().optional(),
  weight: z.string().optional(),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().min(1, "Upazila is required"),
  medicalHistory: z.string().optional(),
  lastDonationDate: z.string().optional(),
  isAvailable: z.enum(["available", "unavailable"]),
});

// Infer the type from the schema
type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Helper to get initials
const getInitials = (name: string = "") => {
  const words = name.split(" ");
  if (!words[0]) return "U";
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

 const ProfileSection = () => {
  // 1. Get auth user and profile data
  const { user: authUser } = useAppSelector((state) => state.auth);
  const userRole = authUser?.role || "user";
  const { data: profileData, isLoading } = useGetUserProfileQuery(undefined);
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  // 2. Setup react-hook-form with explicit type - FIXED
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      age: "",
      weight: "",
      division: "",
      district: "",
      upazila: "",
      medicalHistory: "",
      lastDonationDate: "",
      isAvailable: "available",
    },
  });

  // 3. Populate form when data loads using reset()
  useEffect(() => {
    if (profileData?.data) {
      const { user, location, ...profile } = profileData.data;
      reset({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        age: profile.age?.toString() || "",
        weight: profile.weight?.toString() || "",
        division: location.division || "",
        district: location.district || "",
        upazila: location.upazila || "",
        medicalHistory: profile.medicalHistory || "",
        lastDonationDate: profile.lastDonationDate
          ? new Date(profile.lastDonationDate).toISOString().split("T")[0]
          : "",
        isAvailable: profile.isAvailable ? "available" : "unavailable",
      });
    }
  }, [profileData, reset]);

  // 4. Handle form submission - FIXED
  const onFormSubmit = async (data: ProfileFormValues) => {
    const payload = {
      name: data.name,
      phone: data.phone,
      age: Number(data.age) || undefined,
      weight: Number(data.weight) || undefined,
      medicalHistory: data.medicalHistory || undefined,
      lastDonationDate: data.lastDonationDate || undefined,
      isAvailable: data.isAvailable === "available",
      location: {
        division: data.division,
        district: data.district,
        upazila: data.upazila,
      },
    };

    try {
      await updateUserProfile(payload).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  // Loading state
  if (isLoading || !profileData?.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  // Derived data for display
  const profile = profileData.data;
  const initials = getInitials(profile.user.name);
  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className="space-y-6 p-1 md:p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your {userRole === "user" ? "account" : "donor"} information
          </p>
        </div>
        <div className="text-sm text-muted-foreground border rounded-lg px-3 py-1 bg-card">
          Role:{" "}
          <span className="font-semibold capitalize text-red-600">
            {userRole}
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name & Blood Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="name" />
                      )}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Input
                      id="bloodType"
                      value={profile.bloodGroup || "N/A"}
                      disabled
                      className="cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="phone" />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="email" disabled />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Age & Weight (Donor only) */}
                {userRole === "donor" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Controller
                        name="age"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} id="age" type="number" />
                        )}
                      />
                      {errors.age && (
                        <p className="text-sm text-red-500">{errors.age.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} id="weight" type="number" />
                        )}
                      />
                      {errors.weight && (
                        <p className="text-sm text-red-500">{errors.weight.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Location Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="division">Division</Label>
                    <Controller
                      name="division"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="division" />
                      )}
                    />
                    {errors.division && (
                      <p className="text-sm text-red-500">{errors.division.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="district" />
                      )}
                    />
                    {errors.district && (
                      <p className="text-sm text-red-500">{errors.district.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upazila">Upazila</Label>
                    <Controller
                      name="upazila"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="upazila" />
                      )}
                    />
                    {errors.upazila && (
                      <p className="text-sm text-red-500">{errors.upazila.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </CardContent>
            </Card>
          </form>

          {/* Conditional Card: Emergency Contacts (user) vs Health Info (donor) */}
          {userRole === "user" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Contact Name</Label>
                  <Input
                    id="emergency-name"
                    placeholder="Enter emergency contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Contact Phone</Label>
                  <Input
                    id="emergency-phone"
                    placeholder="Enter emergency contact phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-relation">Relationship</Label>
                  <Input
                    id="emergency-relation"
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>
                <Button variant="outline" className="w-full">
                  Save Emergency Contact
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Health Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastDonationDate">Last Donation Date</Label>
                    <Controller
                      name="lastDonationDate"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="lastDonationDate" type="date" />
                      )}
                    />
                    {errors.lastDonationDate && (
                      <p className="text-sm text-red-500">
                        {errors.lastDonationDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isAvailable">Availability</Label>
                    <Controller
                      name="isAvailable"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger id="isAvailable">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="unavailable">Unavailable</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.isAvailable && (
                      <p className="text-sm text-red-500">
                        {errors.isAvailable.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical Conditions</Label>
                  <Controller
                    name="medicalHistory"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="medicalHistory"
                        placeholder="List any medical conditions or medications..."
                      />
                    )}
                  />
                  {errors.medicalHistory && (
                    <p className="text-sm text-red-500">
                      {errors.medicalHistory.message}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={handleSubmit(onFormSubmit)}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Update Health Info"
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card
            className={`border-0 shadow-lg bg-gradient-to-br ${
              userRole === "user"
                ? "from-red-50 to-red-100"
                : "from-green-50 to-green-100"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={
                  userRole === "user" ? "text-red-900" : "text-green-900"
                }
              >
                {userRole === "user" ? "Account Status" : "Donor Status"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar
                  className={`h-16 w-16 md:h-20 md:w-20 mx-auto mb-4 ring-4 ${
                    userRole === "user" ? "ring-red-200" : "ring-green-200"
                  }`}
                >
                  <AvatarFallback
                    className={`${
                      userRole === "user" ? "bg-red-500" : "bg-green-500"
                    } text-white text-lg md:text-2xl`}
                  >
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-base md:text-lg">
                  {profile.user.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {userRole === "user"
                    ? `Member since ${memberSince}`
                    : `Donor since ${memberSince}`}
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verification Status</span>
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                {userRole === "donor" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Availability</span>
                      <Badge
                        variant={
                          profile.isAvailable ? "default" : "destructive"
                        }
                        className={
                          profile.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {profile.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Donor Level</span>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Award className="w-3 h-3 mr-1" />
                        Hero
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Donations</span>
                      <Badge variant="outline">
                        {profile.previousDonations || 0}
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conditional Card: Achievements (donor) vs Notifications (user) */}
          {userRole === "donor" ? (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-semibold text-sm">Life Saver</p>
                      <p className="text-xs text-muted-foreground">
                        Completed 5 donations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Star className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-semibold text-sm">Quick Responder</p>
                      <p className="text-xs text-muted-foreground">
                        Responded within 30 mins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Users className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="font-semibold text-sm">Community Hero</p>
                      <p className="text-xs text-muted-foreground">
                        10+ donations milestone
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">SMS Notifications</p>
                      <p className="text-xs text-muted-foreground">
                        Receive urgent alerts via SMS
                      </p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Request Updates</p>
                      <p className="text-xs text-muted-foreground">
                        Get notified about request status
                      </p>
                    </div>
                    <Checkbox defaultChecked />
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection