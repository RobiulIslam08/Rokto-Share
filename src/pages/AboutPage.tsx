import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  MapPin,
  Award,
  Target,
  Shield,
  Clock,
  ArrowLeft,
  CheckCircle,
  Star,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  {
    icon: Users,
    label: "নিবন্ধিত রক্তদাতা",
    value: "৫০,০০০+",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Heart,
    label: "সফল রক্তদান",
    value: "২৫,০০০+",
    color: "text-red-600 bg-red-50",
  },
  {
    icon: MapPin,
    label: "জেলা কভারেজ",
    value: "৬৪",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Award,
    label: "জীবন বাঁচানো",
    value: "৭৫,০০০+",
    color: "text-purple-600 bg-purple-50",
  },
];

const features = [
  {
    icon: Shield,
    title: "নিরাপদ ও যাচাইকৃত",
    description:
      "সকল রক্তদাতার তথ্য যাচাই করা এবং নিরাপদ। আমরা প্রতিটি রক্তদাতার পরিচয় যাচাই করি।",
  },
  {
    icon: Clock,
    title: "২৪/৭ সেবা",
    description:
      "দিন-রাত ২৪ ঘন্টা সেবা প্রদান। জরুরি প্রয়োজনে যেকোনো সময় রক্তদাতা খুঁজে পান।",
  },
  {
    icon: Target,
    title: "দ্রুত ম্যাচিং",
    description:
      "উন্নত অ্যালগরিদম ব্যবহার করে দ্রুততম সময়ে উপযুক্ত রক্তদাতা খুঁজে বের করি।",
  },
  {
    icon: TrendingUp,
    title: "ক্রমাগত উন্নতি",
    description:
      "ব্যবহারকারীদের মতামতের ভিত্তিতে আমরা ক্রমাগত আমাদের সেবার মান উন্নত করছি।",
  },
];

const team = [
  {
    name: "ড. মোহাম্মদ রহিম",
    role: "প্রতিষ্ঠাতা ও চেয়ারম্যান",
    image: "/placeholder.svg?height=100&width=100",
    description: "২০+ বছরের চিকিৎসা অভিজ্ঞতা",
  },
  {
    name: "ফাতেমা খাতুন",
    role: "নির্বাহী পরিচালক",
    image: "/placeholder.svg?height=100&width=100",
    description: "সামাজিক কাজে ১৫ বছরের অভিজ্ঞতা",
  },
  {
    name: "আহমেদ করিম",
    role: "প্রযুক্তি পরিচালক",
    image: "/placeholder.svg?height=100&width=100",
    description: "সফটওয়্যার ডেভেলপমেন্টে ১০ বছরের অভিজ্ঞতা",
  },
];

const milestones = [
  {
    year: "২০২০",
    event: "RoktoShare প্রতিষ্ঠা",
    description: "স্বপ্ন থেকে বাস্তবতা",
  },
  {
    year: "২০২১",
    event: "১০,০০০ রক্তদাতা",
    description: "প্রথম মাইলফলক অর্জন",
  },
  {
    year: "২০২২",
    event: "সারাদেশে সম্প্রসারণ",
    description: "৬৪ জেলায় সেবা চালু",
  },
  {
    year: "২০২৩",
    event: "৫০,০০০ রক্তদাতা",
    description: "বাংলাদেশের বৃহত্তম নেটওয়ার্ক",
  },
  {
    year: "২০২৪",
    event: "AI ইন্টিগ্রেশন",
    description: "কৃত্রিম বুদ্ধিমত্তা যুক্ত করা",
  },
];

const AboutPage = () => {
  return (
    <>
      <title>আমাদের সম্পর্কে | RoktoShare - জীবন বাঁচানোর একটি মিশন</title>
      <meta
        name="description"
        content="RoktoShare - বাংলাদেশের সবচেয়ে বিশ্বস্ত রক্তদান প্ল্যাটফর্ম সম্পর্কে জানুন। আমাদের লক্ষ্য, উদ্দেশ্য, এবং কীভাবে আমরা প্রযুক্তির মাধ্যমে জীবন বাঁচাতে কাজ করছি তা আবিষ্কার করুন।"
      />
      <meta
        name="keywords"
        content="RoktoShare, blood connect, রক্ত সৈনিক, আমাদের সম্পর্কে, রক্তদান, ব্লাড ব্যাংক, বাংলাদেশের রক্তদান সংস্থা, জীবন বাঁচানো"
      />

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
        {/* Header */}
        <div className="bg-white border-b border-red-100">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                হোমে ফিরে যান
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                আমাদের সম্পর্কে
              </h1>
              <div></div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                জীবন বাঁচানোর মিশন
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                RoktoShare বাংলাদেশের সবচেয়ে বিশ্বস্ত রক্তদান প্ল্যাটফর্ম।
                আমাদের লক্ষ্য হলো প্রযুক্তির মাধ্যমে রক্তদাতা এবং রক্তগ্রহীতাদের
                মধ্যে সেতুবন্ধন তৈরি করা এবং প্রতিটি জরুরি মুহূর্তে জীবন
                বাঁচানো।
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                আমাদের অর্জন
              </h3>
              <p className="text-gray-600">সংখ্যায় আমাদের সাফল্যের গল্প</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Target className="w-6 h-6 text-red-600" />
                      আমাদের মিশন
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      আমাদের মিশন হলো বাংলাদেশে রক্তদানের সংস্কৃতি গড়ে তোলা এবং
                      প্রযুক্তির মাধ্যমে রক্তের প্রাপ্যতা নিশ্চিত করা। আমরা চাই
                      প্রতিটি মানুষ যেন সময়মতো রক্ত পেতে পারে।
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          সহজ এবং দ্রুত রক্তদাতা খোঁজার ব্যবস্থা
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          নিরাপদ এবং যাচাইকৃত রক্তদাতা নেটওয়ার্ক
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          রক্তদানে সচেতনতা বৃদ্ধি
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-600" />
                      আমাদের ভিশন
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      আমাদের ভিশন হলো এমন একটি বাংলাদেশ গড়া যেখানে রক্তের অভাবে
                      কোনো মানুষের মৃত্যু হবে না। আমরা স্বপ্ন দেখি একটি সুস্থ ও
                      সমৃদ্ধ জাতির।
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          দেশের প্রতিটি জেলায় রক্তদাতা নেটওয়ার্ক
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          AI চালিত স্মার্ট রক্তদান ব্যবস্থা
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">
                          আন্তর্জাতিক মানের সেবা প্রদান
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                আমাদের বিশেষত্ব
              </h3>
              <p className="text-gray-600">কেন RoktoShare আলাদা</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                আমাদের যাত্রা
              </h3>
              <p className="text-gray-600">সময়ের সাথে আমাদের অগ্রগতি</p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <Badge className="bg-red-600 text-white mb-3">
                          {milestone.year}
                        </Badge>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          {milestone.event}
                        </h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-red-600 rounded-full flex-shrink-0"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl font-bold mb-4 text-gray-800">
                আমাদের টিম
              </h3>
              <p className="text-gray-600">যারা এই স্বপ্নকে বাস্তবায়ন করছেন</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-1">
                        {member.name}
                      </h4>
                      <p className="text-red-600 font-medium mb-2">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
