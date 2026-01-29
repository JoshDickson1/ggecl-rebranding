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
    primary: true, // This mimics the dark button in your screenshot
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
    <section className="bg-slate-50 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
            WE PROVIDE <span className="text-[#1e2a44]">SERVICES</span>
          </h2>
          <p className="text-lg text-slate-600 mt-2 font-medium">
            We are an accredited UK Register Of Learning Providers
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout" initial={false}>
            {SERVICES.slice(currentIndex, currentIndex + 3).map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="bg-white p-10 rounded-[1.5rem] shadow-2xl shadow-slate-200/60 flex flex-col h-full min-h-[420px]"
              >
                {/* Icon */}
                <div className="text-[#1e2a44] mb-6">
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed mb-10 flex-grow">
                  {service.description}
                </p>

                {/* Button Styled exactly as screenshot */}
                <motion.button
                  onClick={()=> {"https://docs.google.com/forms/d/e/1FAIpQLSdYbDNQn9zYvD0GQFNPI3HDEBchzR0H39IeFzW2JSuUuQOh7w/viewform"}}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg border-2 flex items-center justify-between font-bold transition-all duration-300 ${
                    service.primary 
                      ? "bg-[#1e2a44] text-white border-[#1e2a44]" 
                      : "bg-white text-[#1e2a44] border-[#1e2a44] hover:bg-[#1e3a5f] hover:text-white hover:border-white"
                  }`}
                >
                  Apply Now
                  <div className={`rounded-full border-2 p-1 ${service.primary ? "border-white" : "border-[#1e2a44] group-hover:border-white"}`}>
                    <ChevronRight size={18} />
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
            className="h-10 w-20 rounded-xl bg-[#1e2a44] hover:bg-slate-400 disabled:opacity-30 shadow-lg transition-all"
          >
            <ArrowLeft size={28} className="text-white" />
          </Button>
          <Button
            onClick={nextSlide}
            disabled={currentIndex + 3 >= SERVICES.length}
            className="h-10 w-20 rounded-xl bg-[#1e2a44] hover:bg-blue-900 disabled:opacity-30 shadow-lg transition-all"
          >
            <ArrowRight size={28} className="text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;