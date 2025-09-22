"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, ThumbsDown, PartyPopper, Share2 } from "lucide-react";

const questions = [
  {
    text: "আপনার বয়স কি ১৮ থেকে ৬০ বছরের মধ্যে?",
    isNegative: false,
  },
  {
    text: "আপনার ওজন কি ৫০ কেজি বা তার বেশি?",
    isNegative: false,
  },
  {
    text: "গত ৪ মাসে আপনি কি রক্তদান করেছেন?",
    isNegative: true, // এখানে 'না' উত্তরটি যোগ্যতা নির্দেশ করবে
  },
  {
    text: "আপনার কি কোনো জটিল বা সংক্রামক রোগ আছে?",
    isNegative: true, // এখানে 'না' উত্তরটি যোগ্যতা নির্দেশ করবে
  },
];

const HeroSection = () => {
  // প্রাথমিক state 0 এর পরিবর্তে 1 করা হয়েছে
  const [step, setStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isEligible, setIsEligible] = useState(true);

  // Progress bar calculation
  const progressPercentage =
    step === 1 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const handleAnswer = (answer: boolean) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.isNegative ? !answer : answer;

    if (!isCorrect) {
      setIsEligible(false);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep(2);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setCurrentQuestionIndex(0);
    setIsEligible(true);
  };

  return (
    <section className="relative py-12 md:py-16 px-4 min-h-[90vh] flex items-center overflow-hidden bg-red-50/30">
      {/* Subtle background pattern - Polished */}
      <div
        className="absolute inset-0 z-[-1] opacity-25"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.2'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="container mx-auto text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="py-3 text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent">
            আপনার রক্তে, বাঁচবে প্রাণ
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            প্রতিটি রক্তবিন্দু মানে একটি নতুন জীবনের আশা।
            <br />
            আপনিও হতে পারেন সেই আশার আলো।
          </p>
        </div>

        {/* Enhanced Interactive Card with Gradient Border */}
        <div className="relative max-w-2xl mx-auto p-1 bg-gradient-to-br from-red-200 via-red-100 to-red-200 rounded-3xl shadow-2xl shadow-red-500/10">
          <div className="bg-white/90 backdrop-blur-md rounded-[22px] p-8 md:p-12 transition-all duration-500">
            {step === 1 && (
              <div>
                {/* Progress Bar */}
                <div className="w-full bg-red-100 rounded-full h-2.5 mb-6">
                  <div
                    className="bg-red-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                {/* Animated Question */}
                <div
                  key={currentQuestionIndex}
                  className="animate-in fade-in slide-in-from-right-10 duration-500"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 min-h-[60px] md:min-h-[80px] flex items-center justify-center px-4">
                    {questions[currentQuestionIndex].text}
                  </h3>
                  <div className="flex gap-4 mt-6 justify-center">
                    <button
                      onClick={() => handleAnswer(true)}
                      className="flex items-center justify-center gap-2 w-36 h-16 bg-gradient-to-br from-green-50 to-green-100 text-green-800 rounded-lg font-bold text-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                      <ThumbsUp /> হ্যাঁ
                    </button>
                    <button
                      onClick={() => handleAnswer(false)}
                      className="flex items-center justify-center gap-2 w-36 h-16 bg-gradient-to-br from-red-50 to-red-100 text-red-800 rounded-lg font-bold text-lg border-2 border-red-200 hover:border-red-400 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                    >
                      <ThumbsDown /> না
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              // More celebratory animation for the result
              <div className="animate-in fade-in zoom-in-105 duration-700">
                {isEligible ? (
                  <>
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 bg-green-200 rounded-full animate-ping opacity-50"></div>
                      <PartyPopper className="relative w-24 h-24 text-green-500" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-green-600 my-4">
                      অভিনন্দন! আপনি একজন সত্যিকারের নায়ক।
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                      আপনার এই মহৎ উদ্যোগ পারে একটি জীবন বাঁচাতে। এখনই আমাদের
                      সাথে যোগ দিন।
                    </p>
                    <Link to="/register">
                      <button className="w-full max-w-sm h-16 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg text-white rounded-xl font-bold transition-transform transform hover:scale-105 active:scale-100">
                        এখনই নিবন্ধন করুন
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Share2 className="w-24 h-24 mx-auto text-blue-500 mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      আপনার মহৎ ইচ্ছার জন্য ধন্যবাদ!
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                      আপনি রক্তদান করতে না পারলেও, আমাদের এই বার্তাটি শেয়ার করে
                      অন্যের জীবন বাঁচাতে সাহায্য করতে পারেন।
                    </p>
                    <Link to="/share-campaign">
                      <button className="w-full max-w-sm h-16 md:mr-5 text-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg text-white rounded-xl font-bold transition-transform transform hover:scale-105 active:scale-100">
                        অন্যদের উৎসাহিত করুন
                      </button>
                    </Link>
                  </>
                )}
                <button
                  onClick={resetQuiz}
                  className="mt-6 text-sm text-gray-600 hover:underline"
                >
                  আবার চেষ্টা করবেন?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
