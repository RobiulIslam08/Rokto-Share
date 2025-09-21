"use client";
import { motion } from "framer-motion";
import SectionTitle from "@/components/common/SectionTitle";
import { Award, BadgeCheck, Shield, Gem, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const milestones = [
    { donations: 1, title: "প্রথম পদক্ষেপ", icon: Shield, color: "text-slate-500", shadow: "shadow-slate-500/50" },
    { donations: 5, title: "ব্রোঞ্জ দাতা", icon: Award, color: "text-amber-700", shadow: "shadow-amber-700/50" },
    { donations: 10, title: "সিলভার দাতা", icon: BadgeCheck, color: "text-gray-400", shadow: "shadow-gray-400/50" },
    { donations: 25, title: "গোল্ডেন হার্ট", icon: Gem, color: "text-yellow-500", shadow: "shadow-yellow-500/50" },
    { donations: 50, title: "প্ল্যাটিনাম হিরো", icon: Crown, color: "text-blue-400", shadow: "shadow-blue-400/50" },
];


const ProfileBadgeSection = () => {
    return (
        <section className="py-28 bg-background">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="আপনার অর্জন ও সম্মাননা"
                    subtitle="প্রতিটি রক্তদান অমূল্য। দেখুন কিভাবে আপনার ধারাবাহিক অবদান আপনাকে একজন সত্যিকারের নায়কে পরিণত করে।"
                />
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white/40 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className="text-center flex flex-col items-center p-6 bg-white/50 rounded-2xl shadow-lg border border-white/30"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <motion.div
                                    className={cn("w-24 h-24 rounded-full flex items-center justify-center border-4 border-white", milestone.shadow)}
                                    style={{ backgroundColor: milestone.color.replace('text-', 'bg-') + '/10' }}
                                >
                                    <milestone.icon className={cn("w-12 h-12", milestone.color)} />
                                </motion.div>
                                <h3 className="text-xl font-bold text-text mt-4">{milestone.title}</h3>
                                <p className="text-sm font-semibold text-primary">{milestone.donations} বার রক্তদানের পর</p>
                            
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <Link to="/register">
                            <Button size="lg" className="text-lg">
                                আপনার যাত্রা শুরু করুন
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProfileBadgeSection;