// src/components/dashboard/ProfileSection.tsx
"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useAppSelector } from "@/redux/hook";

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
import { Star, CheckCircle, Award, Users, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetUserProfileQuery, useUpdateUserProfileMutation } from "@/redux/features/user/userApi";


// Helper to get initials
const getInitials = (name: string = "") => {
  const words = name.split(" ");
  if (!words[0]) return "U";
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const ProfileSection = () => {
  // 1. Get base auth user (for role and ID)
  const { user: authUser } = useAppSelector((state) => state.auth);
  const userRole = authUser?.role || "user";

  // 2. Fetch detailed profile data using RTK Query
  const { data: profileData, isLoading } = useGetUserProfileQuery(undefined);

  // 3. Get the update mutation hook
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  // 4. Local state for the profile form
  // ✅ Updated to match your UserProfile schema
  const [formData, setFormData] = useState({
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
  });

  // 5. Populate form when RTK query data (profileData) loads
  useEffect(() => {
    if (profileData?.data) {
      const { user, location, ...profile } = profileData.data;
      setFormData({
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
      });
    }
  }, [profileData]);

  // 6. Handle form input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle select component change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 7. Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Prepare payload matching the backend schema
    const payload = {
      // Base user info
      name: formData.name,
      phone: formData.phone,
      // Profile info
      age: Number(formData.age) || undefined,
      weight: Number(formData.weight) || undefined,
      medicalHistory: formData.medicalHistory,
      lastDonationDate: formData.lastDonationDate || undefined,
      // Nested location object
      location: {
        division: formData.division,
        district: formData.district,
        upazila: formData.upazila,
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
          <form onSubmit={handleSubmit}>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name & Blood Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
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
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled // Email usually not editable
                      className="cursor-not-allowed"
                    />
                  </div>
                </div>
                {/* Age & Weight (Donor only) */}
                {userRole === "donor" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
                {/* Location Fields (matches schema) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="division">Division</Label>
                    <Input
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="upazila">Upazila</Label>
                    <Input
                      id="upazila"
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleChange}
                    />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact1-name">Primary Contact Name</Label>
                    <Input id="contact1-name" placeholder="e.g., Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact1-phone">Primary Contact Phone</Label>
                    <Input
                      id="contact1-phone"
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>
                <Button variant="outline">Save Emergency Contacts</Button>
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
                    <Input
                      id="lastDonationDate"
                      name="lastDonationDate"
                      value={formData.lastDonationDate}
                      onChange={handleChange}
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      defaultValue={profile.isAvailable ? "available" : "unavailable"}
                      onValueChange={(value) => handleSelectChange('isAvailable', value)}
                    >
                      <SelectTrigger id="availability">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Medical Conditions</Label>
                  <Textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    placeholder="List any medical conditions or medications..."
                  />
                </div>
                <Button variant="outline" onClick={handleSubmit} disabled={isUpdating}>
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Health Info"}
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
                      <span className="text-sm">Donor Level</span>
                      <Badge className="bg-yellow-500 hover:bg-yellow-600">
                        <Award className="w-3 h-3 mr-1" />
                        Hero
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Donations</span>
                      <Badge variant="outline">
                        {/* ✅ Correct field from UserProfile schema */}
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
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Award className="h-6 w-6 text-yellow-500" />
                  <div>
                    <p className="font-medium text-sm">Hero Donor</p>
                    <p className="text-xs text-muted-foreground">
                      {profile.previousDonations || 0}+ donations
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Star className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">5-Star Donor</p>
                    <p className="text-xs text-muted-foreground">
                      Excellent rating
                    </p>
                  </div>
                </div>
                 <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <Users className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Life Saver</p>
                    <p className="text-xs text-muted-foreground">
                      {(profile.previousDonations || 0) * 3}+ lives impacted
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms" defaultChecked />
                  <Label htmlFor="sms" className="text-sm font-normal">
                    SMS Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-updates" defaultChecked />
                  <Label
                    htmlFor="email-updates"
                    className="text-sm font-normal"
                  >
                    Email Updates
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="emergency" defaultChecked />
                  <Label htmlFor="emergency" className="text-sm font-normal">
                    Emergency Alerts
                  </Label>
                </div>
                <Button variant="outline" className="w-full">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};