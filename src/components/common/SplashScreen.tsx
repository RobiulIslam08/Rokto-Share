"use client";
import { motion } from "framer-motion";

// টেক্সটের প্রতিটি অক্ষরের জন্য ভ্যারিয়েন্ট
const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
}

export const SplashScreen = () => {
  const brandName = "BloodConnect";
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut", delay: 0.1 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      {/* অ্যানিমেটেড ব্যাকগ্রাউন্ড গ্র্যাডিয়েন্ট (অপরিবর্তিত) */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ background: "radial-gradient(circle, #fff1f2 0%, #f8f9fa 70%)" }}
        animate={{ background: "radial-gradient(circle, #f8f9fa 0%, #fff1f2 70%)" }}
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
        }}
      />
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG Heart Drawing Animation */}
        <motion.svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            className="absolute z-10"
            // --- ✨ সমাধান এখানে ---
            // 'variants' এর পরিবর্তে সরাসরি initial, animate, transition ব্যবহার করা হয়েছে
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <motion.path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="rgb(217, 4, 41)"
                strokeWidth="1.5"
                initial={{ 
                    pathLength: 0, 
                    fill: "rgba(217, 4, 41, 0)" 
                }}
                animate={{ 
                    pathLength: 1, 
                    fill: "rgba(217, 4, 41, 1)" 
                }}
                transition={{
                    pathLength: { duration: 2, ease: "easeInOut", delay: 1 },
                    fill: { duration: 1, ease: "easeIn", delay: 2.0 }
                }}
            />
        </motion.svg>
      </div>

      {/* Staggered Character Animation for Brand Name */}
      <motion.h1
        className="text-4xl font-bold text-text flex overflow-hidden mt-8"
        variants={{
            visible: { transition: { staggerChildren: 0.08, delayChildren: 2.5 } }
        }}
        initial="hidden"
        animate="visible"
      >
        {brandName.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))}
      </motion.h1>
      
      <motion.p
        className="text-lg text-text/70 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.3 }}
      >
        জীবন বাঁচানোর একটি উদ্যোগ
      </motion.p>
    </motion.div>
  );
};