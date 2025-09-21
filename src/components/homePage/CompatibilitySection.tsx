"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {  GitCommitVertical, GitPullRequestArrow } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";

type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

const compatibility: Record<BloodGroup, { donateTo: BloodGroup[], receiveFrom: BloodGroup[] }> = {
  "A+": { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { donateTo: ["A+", "A-", "AB+", "AB-"], receiveFrom: ["A-", "O-"] },
  "B+": { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { donateTo: ["B+", "B-", "AB+", "AB-"], receiveFrom: ["B-", "O-"] },
  "AB+": { donateTo: ["AB+"], receiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  "AB-": { donateTo: ["AB+", "AB-"], receiveFrom: ["A-", "B-", "AB-", "O-"] },
  "O+": { donateTo: ["A+", "B+", "AB+", "O+"], receiveFrom: ["O+", "O-"] },
  "O-": { donateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], receiveFrom: ["O-"] },
};

const bloodGroups: BloodGroup[] = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
const desktopLayout: BloodGroup[][] = [
    ["O-"],
    ["A-", "B-"],
    ["O+", "AB-"],
    ["A+", "B+"],
    ["AB+"]
];

const BloodGroupNode = ({ group, selectedGroup, onSelect }: { group: BloodGroup, selectedGroup: BloodGroup | null, onSelect: (group: BloodGroup) => void }) => {
    const getStatus = () => {
        if (!selectedGroup) return 'default';
        if (selectedGroup === group) return 'selected';
        if (compatibility[selectedGroup].donateTo.includes(group)) return 'can-donate';
        if (compatibility[selectedGroup].receiveFrom.includes(group)) return 'can-receive';
        return 'inactive';
    };
    const status = getStatus();

    return (
        <motion.div
            onClick={() => onSelect(group)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                scale: status === 'selected' ? 1.15 : 1,
                opacity: status === 'inactive' ? 0.3 : 1,
                boxShadow: status === 'selected' ? '0px 0px 20px 5px rgba(217, 4, 41, 0.5)' : '0px 0px 0px 0px rgba(0,0,0,0)',
            }}
            className={`cursor-pointer p-3 rounded-full text-center font-bold text-xl md:text-2xl transition-all duration-300 flex items-center justify-center min-w-[80px]
              ${status === 'selected' && 'bg-primary text-white'}
              ${status === 'can-donate' && 'bg-green-500 text-white'}
              ${status === 'can-receive' && 'bg-blue-500 text-white'}
              ${status === 'default' && 'bg-white/70 text-text'}
              ${status === 'inactive' && 'bg-slate-200/50 text-text/50'}
            `}
        >
            {group}
        </motion.div>
    );
};


export const CompatibilitySection = () => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(null);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="রক্তের গ্রুপ সামঞ্জস্যতা"
          subtitle="যেকোনো রক্তের গ্রুপের উপর ক্লিক করে দেখুন কে কাকে রক্ত দিতে বা কার থেকে নিতে পারবে।"
        />
        <div className="w-full max-w-5xl mx-auto p-6 md:p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
          
          {/* Mobile & Tablet View: Enhanced Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 lg:hidden">
            {bloodGroups.map((group) => (
              <BloodGroupNode key={group} group={group} selectedGroup={selectedGroup} onSelect={setSelectedGroup} />
            ))}
          </div>

          {/* Desktop View: Universal Flow Diagram */}
          <div className="hidden lg:flex flex-col items-center space-y-6">
            {desktopLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center items-center gap-x-12">
                    {row.map(group => (
                        <BloodGroupNode key={group} group={group} selectedGroup={selectedGroup} onSelect={setSelectedGroup} />
                    ))}
                </div>
            ))}
          </div>

          <AnimatePresence>
            {selectedGroup && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-6 border-t border-primary/20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                    {/* Donate To Section */}
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <GitPullRequestArrow className="w-6 h-6 text-green-600"/>
                            <h3 className="text-xl font-semibold text-text">দান করতে পারবে</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {compatibility[selectedGroup].donateTo.map(group => (
                                <span key={group} className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">{group}</span>
                            ))}
                        </div>
                    </div>
                    {/* Receive From Section */}
                    <div>
                         <div className="flex items-center justify-center gap-2 mb-3">
                            <GitCommitVertical className="w-6 h-6 text-blue-600"/>
                            <h3 className="text-xl font-semibold text-text">গ্রহণ করতে পারবে</h3>
                        </div>
                         <div className="flex flex-wrap gap-2 justify-center">
                            {compatibility[selectedGroup].receiveFrom.map(group => (
                                <span key={group} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">{group}</span>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={() => setSelectedGroup(null)} className="mt-6 mx-auto block text-sm text-primary underline hover:text-red-700 transition-colors">রিসেট করুন</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};