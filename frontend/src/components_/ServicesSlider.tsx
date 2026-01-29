import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Hammer, FileSearch, ArrowLeft, ArrowRight, ChevronRight, School, Users, MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  {
    title: "High-Quality Education",
    description: "Our school provides top-notch education with experienced faculty and a comprehensive curriculum.",
    icon: <GraduationCap size={32} />,
  },
  {
    title: "Consultation",
    description: "We offer tailored guidance and expert advice for academic and career success, providing information on universities, global rankings, and available scholarships.",
    icon: <Hammer size={32} />,
    primary: true, 
  },
  {
    title: "Document Review",
    description: "We share information on required documents, proofreading, editing, and providing feedback on essays, research papers, theses, and applications.",
    icon: <FileSearch size={32} />,
  },
  {
    title: "School Application",
    description: "You may request premium assistance to maximize your chances of being admitted to study your chosen course.",
    icon: <School size={32} />,
  },
  {
    title: "Guidance and Counseling",
    description: "We support students in academic and personal development via one-on-one counseling sessions, workshops, and resources for mental health and success.",
    icon: <MessagesSquare size={32} />,
  },
  {
    title: "Community Engagement",
    description: "Join a thriving community that supports collaboration, knowledge sharing, and networking opportunities.",
    icon: <Users size={32} />,
  },
];

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex + 3 < SERVICES.length) setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  return (
    <section className="bg-white dark:bg-slate-950 py-24 px-6 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-5xl font-black text-slate-900 dark:text-slate-50 leading-[0.9] tracking-tighter uppercase">
            We Provide <br />
            <span className="text-[#1e3a5f] dark:text-blue-400">Services</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-2 font-medium">
            We are an accredited UK Register Of Learning Providers
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative min-h-[420px]">
          <AnimatePresence mode="popLayout" initial={false}>
            {SERVICES.slice(currentIndex, currentIndex + 3).map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-transparent dark:border-slate-800 flex flex-col h-full group"
              >
                {/* Icon */}
                <div className="text-[#1e3a5f] dark:text-blue-400 mb-6 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase">
                  {service.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 flex-grow font-medium">
                  {service.description}
                </p>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl border-2 flex items-center justify-between font-bold transition-all duration-300 uppercase tracking-widest text-xs ${
                    service.primary 
                      ? "bg-[#1e3a5f] text-white border-[#1e3a5f] shadow-lg shadow-blue-900/20" 
                      : "bg-transparent text-[#1e3a5f] border-[#1e3a5f] dark:text-white dark:border-slate-700 hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f]"
                  }`}
                >
                  Get Started
                  <div className={`rounded-full border-2 p-1 transition-colors ${
                    service.primary ? "border-white" : "border-[#1e3a5f] dark:border-slate-700 group-hover:border-white"
                  }`}>
                    <ChevronRight size={16} />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6">
          <Button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-12 w-20 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-white hover:bg-[#1e3a5f] hover:text-white transition-all disabled:opacity-20 border-none"
          >
            <ArrowLeft size={24} />
          </Button>
          <Button
            onClick={nextSlide}
            disabled={currentIndex + 3 >= SERVICES.length}
            className="h-12 w-24 rounded-2xl bg-[#1e3a5f] text-white hover:bg-blue-800 transition-all disabled:opacity-20 border-none shadow-lg shadow-blue-900/20"
          >
            <ArrowRight size={24} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;