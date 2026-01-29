import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    question: "Entry Requirements Vary By University And Course",
    answer: "The entry requirements vary by university and course but typically include academic qualifications, English language proficiency (such as IELTS or TOEFL scores), and sometimes a personal statement or interview.",
  },
  {
    question: "How do I apply for a student visa?",
    answer: "Once you receive an unconditional offer from a university, you will need to apply for a Student Visa (formerly Tier 4). Requirements include proof of funds, health insurance (IHS), and your CAS number.",
  },
  {
    question: "Can I work while studying in the UK?",
    answer: "Most international students on a Student Visa can work up to 20 hours per week during term time and full-time during vacations.",
  },
  {
    question: "What is the Graduate Route visa?",
    answer: "The Graduate Route allows students who have completed a degree in the UK to stay and work, or look for work, for 2 years (3 years for PhD students) after graduation.",
  },
  {
    question: "Are scholarships available for international students?",
    answer: "Yes, many universities offer merit-based scholarships. There are also global schemes like Chevening and Commonwealth Scholarships available for eligible candidates.",
  },
  {
    question: "When is the best time to start my application?",
    answer: "We recommend starting at least 6–9 months before the intake date (typically September or January) to allow enough time for document gathering and visa processing.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left Side: Accordion List */}
        <div className="flex-1 w-full space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen 
                    ? "bg-[#1e2a44] border-[#1e2a44] shadow-lg shadow-blue-900/20" 
                    : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-[#1e2a44]/50"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-4 h-4 rounded-full transition-colors",
                      isOpen ? "bg-white" : "bg-[#1e2a44] dark:bg-blue-400"
                    )} />
                    <span className={cn(
                      "font-bold text-sm md:text-base uppercase tracking-tight",
                      isOpen ? "text-white" : "text-slate-800 dark:text-slate-200"
                    )}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={cn(
                      "transition-transform duration-300",
                      isOpen ? "text-white rotate-180" : "text-slate-400"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-14 pb-8">
                        <p className="text-slate-100 dark:text-slate-300 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Side: Branding Card */}
        <div className="w-full lg:w-[400px] sticky top-24">
          <div className="bg-[#1e2a44] rounded-[2.5rem] p-10 flex flex-col min-h-[500px] shadow-2xl relative overflow-hidden group">
            
            {/* Background Decorative element */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-colors" />

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter mb-12 relative z-10">
              FREQUENTLY <br /> ASKED <br /> QUESTIONS
            </h2>

            {/* Illustration Area */}
            <div className="mt-auto bg-blue-400/90 dark:bg-blue-500 rounded-[2rem] p-8 aspect-square flex items-center justify-center relative z-10 shadow-inner">
               <div className="relative">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white rounded-3xl p-6 shadow-2xl"
                  >
                    <HelpCircle size={80} className="text-[#1e2a44]" strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* Floating Bubbles */}
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm"
                  />
                  <motion.div 
                    animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-900/20 rounded-full backdrop-blur-sm"
                  />
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQ;