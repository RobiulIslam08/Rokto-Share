"use client";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, HeartPulse, ClipboardList } from "lucide-react";
import SectionTitle from "@/components/common/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import bloodImage from "../../assets/images/home-page/Blood-Donation-1.jpg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ডেটা অ্যারেগুলো এখন আরও বিস্তারিত
const eligibilityCriteria = [
  { question: "বয়স ও ওজন", answer: "রক্তদাতার বয়স ১৮-৬০ বছরের মধ্যে এবং ওজন কমপক্ষে ৫০ কেজি হতে হবে।" },
  { question: "শারীরিক সুস্থতা", answer: "রক্তদানের সময় আপনাকে সম্পূর্ণ সুস্থ থাকতে হবে। জ্বর, সর্দি-কাশি বা অন্য কোনো সংক্রমণে আক্রান্ত অবস্থায় রক্তদান করা যাবে না।" },
  { question: "হিমোগ্লোবিন লেভেল", answer: "রক্তে হিমোগ্লোবিনের পরিমাণ পুরুষদের জন্য ন্যূনতম ১৩.০ গ্রাম/ডেসিলিটার এবং মহিলাদের জন্য ১২.৫ গ্রাম/ডেসিলিটার হতে হবে।" },
  { question: "রক্তচাপ ও নাড়ির গতি", answer: "রক্তচাপ স্বাভাবিক সীমার মধ্যে (সিস্টোলিক ১০০-১৮০ এবং ডায়াস্টোলিক ৬০-১০০) এবং নাড়ির গতি প্রতি মিনিটে ৬০-১০০ বার হতে হবে।" },
  { question: "বিরতির সময়কাল", answer: "শেষবার রক্তদানের পর পুরুষদের জন্য কমপক্ষে ৩ মাস এবং মহিলাদের জন্য ৪ মাস অপেক্ষা করতে হবে।" },
  { question: "গুরুতর রোগ", answer: "হৃদরোগ, ক্যানসার, হেপাটাইটিস বি বা সি, এইডস (HIV) এর মতো জটিল রোগে আক্রান্ত ব্যক্তিরা রক্তদান করতে পারবেন না।" },
];

const myths = [
  { myth: "রক্তদান করলে শরীর দুর্বল হয়ে যায়।", fact: "রক্তদানের পর পর্যাপ্ত বিশ্রাম ও তরল গ্রহণ করলে শরীর ২৪-৪৮ ঘণ্টার মধ্যেই স্বাভাবিক অবস্থায় ফিরে আসে। এতে দীর্ঘমেয়াদী কোনো দুর্বলতা হয় না।" },
  { myth: "আমার রক্তের গ্রুপ খুব কমন, তাই আমার রক্তের প্রয়োজন নেই।", fact: "কমন রক্তের গ্রুপ (যেমন O+, A+) এর চাহিদাই সবচেয়ে বেশি থাকে, কারণ বেশিরভাগ রোগীর রক্তের গ্রুপও কমন হয়। তাই আপনার রক্তদান অত্যন্ত জরুরি।" },
  { myth: "নিরামিষভোজীরা রক্তদান করতে পারে না।", fact: "এটি সম্পূর্ণ ভুল ধারণা। নিরামিষভোজীদের খাদ্যে পর্যাপ্ত আয়রন থাকলে তারাও রক্তদান করতে পারেন। রক্তদানের আগে হিমোগ্লোবিন পরীক্ষা করা হয়।" },
  { myth: "রক্তদান একটি সময়সাপেক্ষ ব্যাপার।", fact: "সম্পূর্ণ প্রক্রিয়াটি (রেজিস্ট্রেশন থেকে বিশ্রাম পর্যন্ত) প্রায় ৩০-৪০ মিনিট সময় নেয়, যার মধ্যে রক্তদান করতে সময় লাগে মাত্র ৮-১০ মিনিট।" },
];

const processAndBenefits = [
  { title: "রক্তদান প্রক্রিয়া", content: "১. রেজিস্ট্রেশন ও ফর্ম পূরণ। ২. স্বাস্থ্য পরীক্ষা (রক্তচাপ, হিমোগ্লোবিন)। ৩. জীবাণুমুক্ত পরিবেশে রক্ত সংগ্রহ (৮-১০ মিনিট)। ৪. সংক্ষিপ্ত বিশ্রাম এবং হালকা জলখাবার গ্রহণ।" },
  { title: "রক্তদাতার জন্য সুবিধা", content: "নিয়মিত রক্তদানে হৃদরোগ ও স্ট্রোকের ঝুঁকি কমে। এটি শরীরে নতুন রক্তকণিকা তৈরিতে উৎসাহিত করে এবং বিনামূল্যে একটি মিনি-হেলথ চেকআপ (রক্তচাপ, হিমোগ্লোবিন, রক্তের গ্রুপ) হয়ে যায়।" },
  { title: "রক্তদানের আগে করণীয়", content: "রক্তদানের আগে রাতে পর্যাপ্ত ঘুমান, প্রচুর পানি পান করুন এবং আয়রন সমৃদ্ধ স্বাস্থ্যকর খাবার খান। খালি পেটে রক্তদান করবেন না।" },
  { title: "রক্তদানের পরে করণীয়", content: "রক্তদানের পর কমপক্ষে ২৪ ঘণ্টা ভারী কাজ বা ব্যায়াম থেকে বিরত থাকুন। প্রচুর তরল পান করুন এবং কয়েক ঘণ্টা অ্যালকোহল গ্রহণ থেকে বিরত থাকুন।" },
];

const AwarenessSection = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="রক্তদানের প্রস্তুতি ও বাস্তবতা"
          subtitle="রক্তদানের আগে প্রয়োজনীয় যোগ্যতা সম্পর্কে জানুন এবং প্রচলিত ভুল ধারণাগুলো থেকে মুক্ত থাকুন।"
        />
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Illustration Column - For Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block p-8"
          >
            {/* এখানে একটি সুন্দর ইলাস্ট্রেশন বা ছবি যোগ করতে পারেন */}
            <div className="w-full h-[500px] bg-white/60 rounded-2xl shadow-lg flex items-center justify-center border border-white/20">
              <img className="h-full " src={bloodImage} alt="" />
            </div>
          </motion.div>

          {/* Tabs and Accordion Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Tabs defaultValue="eligibility" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-primary/10 p-3 h-auto">
                <TabsTrigger value="eligibility" className="py-1 md:py-3 text-[12px] md:text-base">যোগ্যতা</TabsTrigger>
                <TabsTrigger value="myth" className="py-1 md:py-3 text-[12px] md:text-base">ভুল ধারণা</TabsTrigger>
                <TabsTrigger value="process" className="py-1 md:py-3 text-[12px] md:text-base">প্রক্রিয়া ও সুবিধা</TabsTrigger>
              </TabsList>

              <TabsContent value="eligibility" className="mt-8">
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                  {eligibilityCriteria.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white/50 backdrop-blur-lg border border-white/20 rounded-xl px-4 shadow-sm">
                      <AccordionTrigger className="text-lg font-semibold text-text hover:no-underline">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                          <span className="text-left">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-text/80 text-base pb-4 pl-9">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="myth" className="mt-8">
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                  {myths.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white/50 backdrop-blur-lg border border-white/20 rounded-xl px-4 shadow-sm">
                      <AccordionTrigger className="text-lg font-semibold text-text hover:no-underline text-left">
                        <div className="flex items-start gap-3">
                          <XCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                          <span>{item.myth}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-text/80 text-base pb-4 pl-9">
                        <strong className="text-green-600">সত্য:</strong> {item.fact}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

              <TabsContent value="process" className="mt-8">
                <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
                  {processAndBenefits.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-white/50 backdrop-blur-lg border border-white/20 rounded-xl px-4 shadow-sm">
                      <AccordionTrigger className="text-lg font-semibold text-text hover:no-underline text-left">
                        <div className="flex items-center gap-3">
                            {index === 0 && <ClipboardList className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                            {index === 1 && <HeartPulse className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                            {index > 1 && <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />}
                          <span>{item.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-text/80 text-base pb-4 pl-9">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>

            </Tabs>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwarenessSection;