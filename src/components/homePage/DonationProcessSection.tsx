"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Heart, Shield, Clock, Award, ArrowDown } from "lucide-react";

const journeySteps = [
  {
    step: "০১",
    title: "মানবতার মহান আহ্বান",
    description:
      "যখন কোনো অসহায় মানুষের জীবন ঝুলে থাকে একটি সুতোর উপর, তখন আপনার একটি সিদ্ধান্তই পারে তাকে মৃত্যুর হাত থেকে ফিরিয়ে আনতে। এই পবিত্র দায়িত্ব গ্রহণ করাই আপনাকে করে তোলে একজন প্রকৃত মানুষ।",
    impact: "বাংলাদেশে প্রতিদিন ৩০০০+ রোগী রক্তের জন্য অপেক্ষা করে থাকেন।",
    icon: Heart,
    color: "primary",
  },
  {
    step: "০২",
    title: "বিশ্বস্ত নিরাপত্তার প্রতিশ্রুতি",
    description:
      "আপনার মূল্যবান স্বাস্থ্য আমাদের সর্বোচ্চ অগ্রাধিকার। অভিজ্ঞ চিকিৎসকদের তত্ত্বাবধানে সম্পূর্ণ বিনামূল্যে স্বাস্থ্য পরীক্ষা নিশ্চিত করে যে আপনার রক্তদান হবে সম্পূর্ণ নিরাপদ এবং আপনার সুস্বাস্থ্য অক্ষুণ্ণ থাকবে।",
    impact: "প্রতিটি রক্তদাতা পান বিনামূল্যে ১২টি গুরুত্বপূর্ণ স্বাস্থ্য পরীক্ষা।",
    icon: Shield,
    color: "primary",
  },
  {
    step: "০৩",
    title: "অমর ত্যাগের পবিত্র মুহূর্ত",
    description:
      "মাত্র ১০ মিনিটের এই নীরব আত্মত্যাগ হয়ে উঠবে ইতিহাসের সবচেয়ে মহৎ কাজ। আপনার প্রতিটি রক্তবিন্দুতে মিশে আছে অসীম ভালোবাসা, যা কোনো মুমূর্ষু রোগীর হৃদয়ে নতুন প্রাণের সঞ্চার করবে।",
    impact: "আপনার ১ ব্যাগ রক্ত একসাথে ৩টি পরিবারে ফিরিয়ে আনতে পারে হাসি।",
    icon: Clock,
    color: "primary",
  },
  {
    step: "০৪",
    title: "জীবনদাতার গৌরবময় সম্মাননা",
    description:
      "আপনার অসাধারণ মানবিকতার পর এই বিশ্রাম আপনার প্রাপ্য। আজ আপনি শুধু রক্ত দেননি, আপনি দিয়েছেন অগণিত পরিবারের কাছে তাদের প্রিয়জনকে ফিরে পাওয়ার অমূল্য উপহার। আপনি এখন একজন প্রকৃত বীর।",
    impact: "নিয়মিত রক্তদান আপনার হৃদরোগ ও ক্যান্সারের ঝুঁকি ৮৮% পর্যন্ত কমায়।",
    icon: Award,
    color: "primary",
  },
];

const DonationJourneySection = () => {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.01 && !hasScrolled) {
            setHasScrolled(true);
        }

        const newIndex = Math.floor(latest * journeySteps.length);
        const clampedIndex = Math.min(newIndex, journeySteps.length - 1);
        if (clampedIndex !== activeIndex) {
            setActiveIndex(clampedIndex);
        }
    });

    const backgroundOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [1, 0.95, 0.9, 0.95, 1]);

    return (
        <section ref={targetRef} className="relative py-24 bg-background h-[400vh]">
            <motion.div
                style={{ opacity: backgroundOpacity }}
                className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"
            />

            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* --- ✨ হারানো কন্টেন্ট এখানে যোগ করা হলো --- */}
                <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.95 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-4xl mx-auto"
                        >
                            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
                                <div className="flex items-center justify-center mb-8">
                                    <div
                                        className={`p-4 rounded-full ${
                                            journeySteps[activeIndex].color === "primary"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-secondary/10 text-secondary"
                                        }`}
                                    >
                                        {(() => {
                                            const IconComponent = journeySteps[activeIndex].icon;
                                            return <IconComponent className="w-8 h-8" />;
                                        })()}
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
                                    className="text-center mb-8"
                                >
                                    <span
                                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                                            journeySteps[activeIndex].color === "primary"
                                                ? "bg-primary/10 text-primary"
                                                : "bg-secondary/10 text-secondary"
                                        }`}
                                    >
                                        ধাপ {journeySteps[activeIndex].step}
                                    </span>
                                </motion.div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center text-balance"
                                >
                                    {journeySteps[activeIndex].title}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8 } }}
                                    className="text-muted-foreground text-lg md:text-xl leading-relaxed text-center mb-8 text-pretty"
                                >
                                    {journeySteps[activeIndex].description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8 } }}
                                    className={`text-center p-6 rounded-xl ${
                                        journeySteps[activeIndex].color === "primary"
                                            ? "bg-primary/5 border border-primary/20"
                                            : "bg-secondary/5 border border-secondary/20"
                                    }`}
                                >
                                    <p
                                        className={`font-semibold text-lg ${
                                            journeySteps[activeIndex].color === "primary" ? "text-primary" : "text-secondary"
                                        }`}
                                    >
                                        {journeySteps[activeIndex].impact}
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                {/* --- ✨ হারানো কন্টেন্ট শেষ --- */}


                <AnimatePresence>
                    {!hasScrolled && (
                        <motion.div
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 20, transition: { delay: 2, duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
                            exit={{ opacity: 0, y: 40 }}
                            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-muted-foreground"
                        >
                            <span className="text-sm font-semibold">স্ক্রল করুন</span>
                            <ArrowDown className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex space-x-2">
                        {journeySteps.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    index === activeIndex ? "bg-primary w-8" : "bg-border"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DonationJourneySection;