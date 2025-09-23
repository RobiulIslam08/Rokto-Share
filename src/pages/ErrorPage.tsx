// src/pages/ErrorPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplets, Home, Search, Heart } from 'lucide-react'; // রক্তবিন্দু, হোম, সার্চ, হার্ট আইকন

const ErrorPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-blue-50 text-gray-800 p-6"
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1.0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                className="text-red-500 mb-8"
            >
                <Droplets className="w-24 h-24 animate-pulse-light" /> {/* রক্তবিন্দু আইকন */}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-6xl md:text-8xl font-extrabold text-red-600 mb-4 drop-shadow-lg"
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-2xl md:text-4xl font-semibold text-gray-700 mb-6 text-center"
            >
                এই পথটি বোধহয় একটু ভুল...
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-lg md:text-xl text-center max-w-2xl leading-relaxed mb-8"
            >
                মনে হচ্ছে আপনি একটু পথ হারিয়েছেন। কিন্তু চিন্তা নেই! জীবন বাঁচানোর আমাদের মূল উদ্দেশ্য এখনও অটুট। চলুন, আপনাকে সঠিক পথে ফিরিয়ে নিয়ে যাই, যেখানে প্রতিটি রক্তবিন্দু আশার আলো ছড়ায়।
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.3 }}
                >
                    <Link to="/" className="btn btn-primary bg-red-600 hover:bg-red-700 text-white flex items-center justify-center px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                        <Home className="mr-2 w-5 h-5" /> হোমপেজে ফিরে যান
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                >
                    <Link to="/find-blood-donner-page" className="btn btn-outline border-red-600 text-red-600 hover:bg-red-50 flex items-center justify-center px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                        <Search className="mr-2 w-5 h-5" /> রক্ত খুঁজুন
                    </Link>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.3 }}
                >
                    <Link to="/become-a-donor-page" className="btn btn-outline border-red-600 text-red-600 hover:bg-red-50 flex items-center justify-center px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                        <Heart className="mr-2 w-5 h-5" /> রক্তদান করুন
                    </Link>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="text-md md:text-lg font-light text-gray-500"
            >
                এক ফোঁটা রক্ত, এক জীবনের আশা। 
            </motion.p>
        </motion.div>
    );
};

export default ErrorPage;