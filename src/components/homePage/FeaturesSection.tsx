import { motion } from "framer-motion";
import { Zap, ShieldCheck, Search, Bell } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionTitle from "@/components/common/SectionTitle";
const features = [
  {
    icon: Zap,
    title: "দ্রুত সংযোগ",
    description: "জরুরি মুহূর্তে মুহূর্তের মধ্যে রক্তদাতা খুঁজে পান।",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "যাচাইকৃত প্রোফাইল",
    description: "আমাদের সকল রক্তদাতা ভেরিফাইড এবং বিশ্বস্ত।",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "সহজ অনুসন্ধান",
    description: "এলাকা এবং রক্তের গ্রুপ দিয়ে সহজেই খুঁজুন।",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Bell,
    title: "রক্তদানের নোটিফিকেশন",
    description: "আপনার রক্তদানের সময় হলে স্বয়ংক্রিয় রিমাইন্ডার পান।",
    color: "from-purple-500 to-indigo-500",
  },
];

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  }),
};

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="কেন BloodConnect?"
          subtitle="আধুনিক প্রযুক্তি এবং মানবিক সেবার সমন্বয়ে তৈরি বাংলাদেশের সবচেয়ে উন্নত রক্তদান প্ল্যাটফর্ম।"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <MotionCard
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="h-full bg-white/40 backdrop-blur-lg border-2 border-white/20 shadow-2xl rounded-2xl overflow-hidden text-center"
            >
              {/* রঙিন টপ বর্ডার */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${feature.color}`}
              ></div>
              <CardHeader className="flex flex-col items-center justify-center">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <CardTitle className="text-lg sm:text-2xl font-bold text-text text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text/80 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </MotionCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
