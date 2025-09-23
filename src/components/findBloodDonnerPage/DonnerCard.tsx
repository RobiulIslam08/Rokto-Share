/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  Heart,
  User,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

type DonnerCardProps = {
  donor: any;
  index: number;
};

const getAvailabilityStatus = (donor: any) => {
  if (!donor.isAvailable) {
    return {
      text: "এখন রক্ত দিতে পারবেন নাহ",
      color: "bg-red-100 text-red-700",
      icon: AlertCircle,
    };
  }

  const lastDonation = new Date(donor.lastDonation);
  const daysSinceLastDonation = Math.floor(
    (Date.now() - lastDonation.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysSinceLastDonation < 90) {
    return {
      text: `${90 - daysSinceLastDonation} দিন পর রক্ত দিতে পারবেন`,
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
    };
  }

  return {
    text: "রক্ত দিতে পারবেন",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  };
};

export const DonnerCard = ({ donor, index }: DonnerCardProps) => {
  const status = getAvailabilityStatus(donor);
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-red-100">
                <AvatarImage
                  src={donor.avatar || "/placeholder.svg"}
                  alt={donor.name}
                />
                <AvatarFallback className="bg-red-100 text-red-600 text-lg font-semibold">
                  {donor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {donor.name}
                  </h3>
                  {donor.verified && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{donor.age} বছর</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {donor.location.upazila}, {donor.location.district}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 md:ml-auto">
              <Badge className="bg-red-600 text-white text-lg px-4 py-2 font-bold">
                {donor.bloodGroup}
              </Badge>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
              >
                <StatusIcon className="w-3 h-3" />
                {status.text}
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{donor.totalDonations} বার দান</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{donor.rating} রেটিং</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  শেষ দান:{" "}
                  {new Date(donor.lastDonation).toLocaleDateString("bn-BD")}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  কল করুন
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  ইমেইল
                </Button>
              </div>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700  w-full md:w-auto "
                disabled={!donor.isAvailable}
              >
                অনুরোধ পাঠান
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
