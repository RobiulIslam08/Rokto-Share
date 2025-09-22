// import { Outlet } from "react-router-dom";
// import Navbar from "../common/Navbar";
// import Footer from "../common/Footer";

// const MainLayout = () => {
// 	return (
// 		<div>
// 		<Navbar/>
// 		  <main>
//         <Outlet /> {/* এইখানে আপনার চাইল্ড রুট (HomePage) রেন্ডার হবে */}
//       </main>
// 		<Footer/>
// 		</div>
// 	);
// };

// export default MainLayout;
"use client";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { SplashScreen } from "../common/SplashScreen"; // SplashScreen ইম্পোর্ট করুন
import CTASection from "../common/CTASection";

const MainLayout = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // একটি টাইমার সেট করা হলো যা নির্দিষ্ট সময় পর লোডিং শেষ করবে
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000); // ৩ সেকেন্ডের জন্য স্প্ল্যাশ স্ক্রিন দেখাবে

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                // লোডিং চলাকালীন SplashScreen দেখানো হবে
                <SplashScreen key="splash-screen" />
            ) : (
                // লোডিং শেষ হলে মূল লেআউট দেখানো হবে
                <motion.div
                    key="main-layout"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="aurora-background"
                >
                    <Navbar />
                    <main>
                        <Outlet /> {/* এখানে আপনার চাইল্ড রুট (HomePage) রেন্ডার হবে */}
                    </main>
					<CTASection/>
                    <Footer />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MainLayout;