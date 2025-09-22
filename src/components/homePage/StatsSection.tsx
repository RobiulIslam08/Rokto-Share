"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // Shadcn Card
import AnimatedNumber from "../common/AnimatedNumber";
import { Users, Droplets, HeartHandshake, MapPin } from "lucide-react";

const stats = [
  { icon: Users, value: 10500, label: "নিবন্ধিত সদস্য", color: "text-blue-500" },
  { icon: Droplets, value: 25000, label: "ব্যাগ রক্ত সংগৃহীত", color: "text-red-500" },
  { icon: HeartHandshake, value: 8000, label: "জীবন বাঁচানো সম্ভব হয়েছে", color: "text-green-500" },
  { icon: MapPin, value: 64, label: "টি জেলায় কার্যক্রম", color: "text-purple-500" },
];

// Framer Motion-এর সাথে Shadcn Card ব্যবহারের জন্য একটি মোশন কম্পোনেন্ট তৈরি করা
const MotionCard = motion(Card);



const StatsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <MotionCard
              key={index}
              custom={index}
              
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-lg rounded-2xl border-white/20 shadow-xl text-center overflow-hidden"
            >
              <CardContent className="p-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-white shadow-inner">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                <div className="text-4xl font-extrabold text-text mb-2">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-text/80 font-medium text-lg">{stat.label}</div>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;