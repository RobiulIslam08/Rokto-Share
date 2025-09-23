
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
const CTASection = () => {
	return (
		<div>
			 <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">আজই যোগ দিন আমাদের সাথে</h2>
            <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
              একটি রক্তদান অনেক জীবন বাঁচাতে পারে। আপনিও হয়ে উঠুন একজন জীবনদাতা।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold">
                  রক্তদাতা হিসেবে নিবন্ধন করুন
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  রক্তদাতা খুঁজুন
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
		</div>
	);
};

export default CTASection;