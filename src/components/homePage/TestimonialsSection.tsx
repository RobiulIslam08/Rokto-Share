"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import SectionTitle from "@/components/common/SectionTitle";

const testimonials = [
  {
    name: "আরিফ হোসেন",
    location: "ঢাকা",
    bloodGroup: "O+",
    rating: 5,
    text: "এই প্ল্যাটফর্মের মাধ্যমে আমি আমার বাবার জন্য ২ ব্যাগ O+ রক্ত পেয়েছি। আমি চিরকৃতজ্ঞ থাকব।",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "সাদিয়া ইসলাম",
    location: "চট্টগ্রাম",
    bloodGroup: "A-",
    rating: 5,
    text: "আমি একজন নিয়মিত রক্তদাতা। BloodConnect আমার রক্তদানের প্রক্রিয়াকে অনেক সহজ করে দিয়েছে।",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "রাসেল আহমেদ",
    location: "খুলনা",
    bloodGroup: "B+",
    rating: 5,
    text: "জরুরি মুহূর্তে এত দ্রুত রক্তদাতা খুঁজে পাব, ভাবতেও পারিনি। অসাধারণ একটি উদ্যোগ।",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    name: "ফারজানা মিলি",
    location: "সিলেট",
    bloodGroup: "AB+",
    rating: 5,
    text: "তাদের দ্রুত সাড়া এবং সাহায্য করার মানসিকতা প্রশংসার যোগ্য। ধন্যবাদ BloodConnect।",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "ইমরান খান",
    location: "রংপুর",
    bloodGroup: "B-",
    rating: 5,
    text: "আমার দেখা সেরা রক্তদান প্ল্যাটফর্ম। ব্যবহার করা খুবই সহজ এবং কার্যকরী।",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const MotionCard = motion(Card);

const TestimonialsSection = () => {
  // মাঝখানের কার্ডটিকে শুরুতে সক্রিয় রাখার জন্য
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(testimonials.length / 2)
  );

  const nextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevCard = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  // কিবোর্ড নেভিগেশন
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextCard();
      } else if (event.key === "ArrowLeft") {
        prevCard();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="আমাদের হিরোদের কথা শুনুন"
          subtitle="বাস্তব মানুষের অভিজ্ঞতা, যারা আমাদের প্ল্যাটফর্ম ব্যবহার করে জীবন বাঁচিয়েছেন বা বাঁচতে সাহায্য করেছেন।"
        />
        <div className="relative w-full h-[500px] flex items-center justify-center">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => {
              const position = index - activeIndex;
              const isVisible = Math.abs(position) < 2;

              return (
                isVisible && (
                  <MotionCard
                    key={testimonial.name}
                    initial={{
                      x: `${position * 100}%`,
                      scale: 1 - Math.abs(position) * 0.2,
                      opacity: 0,
                      zIndex: testimonials.length - Math.abs(position),
                    }}
                    animate={{
                      x: `${position * 40}%`,
                      scale: 1 - Math.abs(position) * 0.2,
                      opacity: 1 - Math.abs(position) * 0.5,
                      rotateY: position * -30,
                      zIndex: testimonials.length - Math.abs(position),
                    }}
                    exit={{
                      x: `${position < 0 ? -100 : 100}%`,
                      opacity: 0,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="h-[450px] w-[350px] bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl absolute overflow-hidden flex flex-col"
                    style={{ perspective: "1000px" }}
                  >
                    <Quote className="absolute top-4 right-4 w-16 h-16 text-primary/10 rotate-12 z-0" />
                    <CardContent className="p-8 relative z-10 flex-grow">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <p className="text-text/90 italic leading-relaxed text-lg">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                    <CardFooter className="p-8 pt-4 border-t border-primary/10 relative z-10 flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={56}
                          height={56}
                          className="rounded-full object-cover border-2 border-primary/30 shadow-md"
                        />
                        <div>
                          <div className="font-semibold text-text text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-text/70">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </MotionCard>
                )
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prevCard}
            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/20 flex items-center justify-center text-primary hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextCard}
            className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-lg shadow-lg border border-white/20 flex items-center justify-center text-primary hover:bg-white transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
