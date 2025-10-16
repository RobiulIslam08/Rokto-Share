
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBloodRequestMutation } from "@/redux/features/bloodRequest/requestApi";
import { Textarea } from "../ui/textarea";

interface BloodRequestFormProps {
  donor: any;
  isOpen: boolean;
  onClose: () => void;
}

// This interface expects numbers, but the form will initially provide strings for number inputs.
interface BloodRequestFormData {
  patientName: string;
  patientAge: number;
  hospital: string;
  hospitalAddress: string;
  unitsNeeded: number;
  urgency: "Critical" | "Urgent" | "Normal";
  neededDate: string;
  neededTime: string;
  contactPhone: string;
  medicalCondition: string;
  additionalNotes?: string;
}

const BloodRequestForm = ({
  donor,
  isOpen,
  onClose,
}: BloodRequestFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BloodRequestFormData>();
  const [createRequest, { isLoading }] = useCreateBloodRequestMutation();

  // The 'data' from react-hook-form will have strings for number inputs.
  const onSubmit = async (data: any) => {
    try {
      // Create a payload with corrected data types
      const payload = {
        ...data,
        patientAge: parseInt(data.patientAge, 10), // <-- SOLUTION: Convert string to number
        unitsNeeded: parseInt(data.unitsNeeded, 10), // <-- SOLUTION: Convert string to number
      };

      await createRequest({
        donorId: donor.id,
        ...payload, // Send the corrected payload
      }).unwrap();

      reset();
      onClose();
      toast.success("রক্তের অনুরোধ সফলভাবে পাঠানো হয়েছে!");
    } catch (error) {
      toast.error("অনুরোধ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error("Request error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-full overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">
            রক্তের অনুরোধ পাঠান
          </DialogTitle>{" "}
          <DialogDescription>
            {donor.name} এর কাছে রক্তের জন্য অনুরোধ করুন
          </DialogDescription>
        </DialogHeader>

        {/* Donor Info */}
        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-red-500 text-white">
                {donor.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{donor.name}</p>
              <p className="text-sm text-gray-600">
                {donor.location.upazila}, {donor.location.district}
              </p>
            </div>
            <Badge className="ml-auto bg-red-600 text-white text-lg px-3 py-1">
              {donor.bloodGroup}
            </Badge>
          </div>
        </div>
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Patient Name & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">রোগীর নাম *</Label>
              <Input
                id="patientName"
                {...register("patientName", { required: "রোগীর নাম আবশ্যক" })}
                placeholder="রোগীর পূর্ণ নাম লিখুন"
              />
              {errors.patientName && (
                <p className="text-red-500 text-sm">
                  {errors.patientName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="patientAge">রোগীর বয়স *</Label>
              <Input
                id="patientAge"
                type="number"
                {...register("patientAge", {
                  required: "বয়স আবশ্যক",
                  min: { value: 1, message: "সঠিক বয়স দিন" },
                  max: { value: 120, message: "সঠিক বয়স দিন" },
                })}
                placeholder="বয়স"
              />
              {errors.patientAge && (
                <p className="text-red-500 text-sm">
                  {errors.patientAge.message}
                </p>
              )}
            </div>
          </div>

          {/* Hospital Name */}
          <div className="space-y-2">
            <Label htmlFor="hospital">হাসপাতালের নাম *</Label>
            <Input
              id="hospital"
              {...register("hospital", { required: "হাসপাতালের নাম আবশ্যক" })}
              placeholder="যে হাসপাতালে রক্ত লাগবে"
            />
            {errors.hospital && (
              <p className="text-red-500 text-sm">{errors.hospital.message}</p>
            )}
          </div>

          {/* Hospital Address */}
          <div className="space-y-2">
            <Label htmlFor="hospitalAddress">হাসপাতালের ঠিকানা *</Label>
            <Textarea
              id="hospitalAddress"
              {...register("hospitalAddress", { required: "ঠিকানা আবশ্যক" })}
              placeholder="হাসপাতালের সম্পূর্ণ ঠিকানা"
              rows={2}
            />
            {errors.hospitalAddress && (
              <p className="text-red-500 text-sm">
                {errors.hospitalAddress.message}
              </p>
            )}
          </div>

          {/* Units & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitsNeeded">রক্তের পরিমাণ (ব্যাগ) *</Label>
              <Input
                id="unitsNeeded"
                type="number"
                {...register("unitsNeeded", {
                  required: "রক্তের পরিমাণ আবশ্যক",
                  min: { value: 1, message: "কমপক্ষে ১ ব্যাগ" },
                  max: { value: 10, message: "সর্বোচ্চ ১০ ব্যাগ" },
                })}
                placeholder="কত ব্যাগ রক্ত লাগবে"
              />
              {errors.unitsNeeded && (
                <p className="text-red-500 text-sm">
                  {errors.unitsNeeded.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">জরুরী মাত্রা *</Label>
              <select
                id="urgency"
                {...register("urgency", {
                  required: "জরুরী মাত্রা নির্বাচন করুন",
                })}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="Critical">অত্যন্ত জরুরী (Critical)</option>
                <option value="Urgent">জরুরী (Urgent)</option>
                <option value="Normal">সাধারণ (Normal)</option>
              </select>
              {errors.urgency && (
                <p className="text-red-500 text-sm">{errors.urgency.message}</p>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neededDate">কবে রক্ত লাগবে *</Label>
              <Input
                id="neededDate"
                type="date"
                {...register("neededDate", {
                  required: "তারিখ আবশ্যক",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return (
                      selectedDate >= today ||
                      "অতীতের তারিখ নির্বাচন করা যাবে না"
                    );
                  },
                })}
              />
              {errors.neededDate && (
                <p className="text-red-500 text-sm">
                  {errors.neededDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="neededTime">সময় *</Label>
              <Input
                id="neededTime"
                type="time"
                {...register("neededTime", { required: "সময় আবশ্যক" })}
              />
              {errors.neededTime && (
                <p className="text-red-500 text-sm">
                  {errors.neededTime.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Phone */}
          <div className="space-y-2">
            <Label htmlFor="contactPhone">যোগাযোগের ফোন নম্বর *</Label>
            <Input
              id="contactPhone"
              {...register("contactPhone", {
                required: "ফোন নম্বর আবশ্যক",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "সঠিক বাংলাদেশী ফোন নম্বর দিন (01XXXXXXXXX)",
                },
              })}
              placeholder="01XXXXXXXXX"
            />
            {errors.contactPhone && (
              <p className="text-red-500 text-sm">
                {errors.contactPhone.message}
              </p>
            )}
          </div>

          {/* Medical Condition */}
          <div className="space-y-2">
            <Label htmlFor="medicalCondition">রোগের বিবরণ *</Label>
            <Textarea
              id="medicalCondition"
              {...register("medicalCondition", {
                required: "রোগের বিবরণ আবশ্যক",
                minLength: {
                  value: 5,
                  message: "বিস্তারিত বিবরণ দিন (কমপক্ষে 5 অক্ষর)",
                },
              })}
              placeholder="কেন রক্ত লাগছে তার বিস্তারিত বিবরণ"
              rows={3}
            />
            {errors.medicalCondition && (
              <p className="text-red-500 text-sm">
                {errors.medicalCondition.message}
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">অতিরিক্ত তথ্য (ঐচ্ছিক)</Label>
            <Textarea
              id="additionalNotes"
              {...register("additionalNotes")}
              placeholder="অন্য কোনো প্রয়োজনীয় তথ্য"
              rows={2}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
              className="flex-1"
              disabled={isLoading}
            >
              বাতিল
            </Button>
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "পাঠানো হচ্ছে..." : "অনুরোধ পাঠান"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BloodRequestForm;