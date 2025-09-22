"use client";
import { Heart, Phone, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gray-900 backdrop-blur-xl text-white/80 pt-10  overflow-hidden">
    

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center">
                                <Heart className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-white">Rokto Share</span>
                        </div>
                        <p className="text-white/60 leading-relaxed mb-6">
                            বাংলাদেশের সবচেয়ে বিশ্বস্ত রক্তদান প্ল্যাটফর্ম। জীবন বাঁচানোর মহান কাজে আমাদের সাথে থাকুন।
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:scale-110 transition-all">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:scale-110 transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:scale-110 transition-all">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-primary hover:text-white hover:scale-110 transition-all">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">দ্রুত লিংক</h3>
                        <ul className="space-y-3 text-white/60">
                            <li><Link to="/search" className="hover:text-red-400  transition-colors hover:translate-x-1 inline-block">রক্তদাতা খুঁজুন</Link></li>
                            <li><Link to="/register" className="hover:text-red-400  transition-colors hover:translate-x-1 inline-block">রক্তদান করুন</Link></li>
                            <li><Link to="/emergency" className="hover:text-red-400  transition-colors hover:translate-x-1 inline-block">জরুরি অনুরোধ</Link></li>
                            <li><Link to="/faq" className="hover:text-red-400  transition-colors hover:translate-x-1 inline-block">প্রশ্ন ও উত্তর</Link></li>
                        </ul>
                    </div>
                    
                    {/* Newsletter Subscription */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <h3 className="text-xl font-semibold mb-6 text-white">আমাদের সাথে যুক্ত থাকুন</h3>
                        <p className="text-white/60 mb-4">আমাদের নিউজলেটার সাবস্ক্রাইব করে রক্তদান কর্মসূচী এবং নতুন ফিচার সম্পর্কে আপডেট পান।</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="আপনার ইমেইল"
                                className="w-full bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary"
                            />
                            <button type="submit" className="bg-primary text-white px-4 rounded-r-lg hover:bg-red-700 transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                        <div className="mt-6 space-y-3 text-white/60">
                             <div className="flex items-center space-x-3">
                                 <Phone className="w-5 h-5 text-white" />
                                 <span>+880 1323090887</span>
                             </div>
                             <div className="flex items-center space-x-3">
                                 <MapPin className="w-5 h-5 text-white" />
                                 <span>শেরপুর, ময়মনসিংহ, বাংলাদেশ</span>
                             </div>
                         </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 py-8 text-center text-white/50">
                    <p>&copy; {currentYear} BloodConnect. সকল অধিকার সংরক্ষিত। ডিজাইন করেছেন রাহাদুল ইসলাম।</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;