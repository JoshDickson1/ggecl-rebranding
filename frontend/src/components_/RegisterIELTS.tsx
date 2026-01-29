import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    title: "VISIT OUR WEBSITE:",
    description: "Click on our registration link below to start the process.",
  },
  {
    title: "CHOOSE YOUR TEST TYPE:",
    description: "Select between Academic or General Training based on your needs.",
  },
  {
    title: "SELECT A TEST LOCATION AND DATE:",
    description: "Pick a British Council-approved test center and date.",
  },
  {
    title: "SUBMIT YOUR APPLICATION:",
    description: "Complete the application form with your details.",
  },
  {
    title: "PAY THE TEST FEE:",
    description: "Use our secure payment gateway to finalize registration.",
  },
  {
    title: "RECEIVE CONFIRMATION:",
    description: "Get confirmation with all test details via email.",
  },
  {
    title: "PREPARE FOR THE TEST:",
    description: "Use our resources to prepare and succeed!",
  },
];

const RegisterIELTS = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic infinite cycling for the "alive" effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16 leading-tight uppercase tracking-tight">
        HOW TO REGISTER FOR <br />
        <span className="text-[#1e3a5f]">IELTS</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left Side: Illustration Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-square rounded-[3rem] overflow-hidden">
            <img 
              src="/ielts.jpg" // Replace with your gear/circuit image
              alt="Registration Illustration"
              className="w-full h-full object-cover"
            />
            {/* Overlay Gradient to match brand */}
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Right Side: Animated Steps */}
        <div className="w-full md:w-1/2 flex items-start gap-8">
          
          {/* Custom Vertical Indicator Bar */}
          <div className="relative h-[400px] w-2 bg-slate-100 rounded-full overflow-hidden flex flex-col justify-between py-2">
            {/* The "Alive" moving pill */}
            <motion.div 
              className="absolute w-full bg-[#1e3a5f] rounded-full shadow-[0_0_15px_rgba(30,58,95,0.4)]"
              animate={{ 
                height: "60px",
                y: (activeIndex * (340 / (STEPS.length - 1))) 
              }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            />
            {/* Background static markers */}
            {STEPS.map((_, i) => (
              <div key={i} className="w-full h-1 bg-slate-200" />
            ))}
          </div>

          {/* Text Content with Curved/Fade Animation */}
          <div className="flex-1 h-[400px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40, rotateX: -20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -40, rotateX: 20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col justify-center h-full"
              >
                {/* Previous Step (Faded) */}
                <div className="opacity-20 select-none mb-8">
                  <h4 className="text-sm font-bold text-slate-400 uppercase">
                    {STEPS[(activeIndex - 1 + STEPS.length) % STEPS.length].title}
                  </h4>
                </div>

                {/* Active Step */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-[#1e3a5f] mb-4 uppercase leading-none">
                    {STEPS[activeIndex].title}
                  </h3>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-md">
                    {STEPS[activeIndex].description}
                  </p>
                </div>

                {/* Next Step (Faded) */}
                <div className="opacity-20 select-none">
                  <h4 className="text-sm font-bold text-slate-400 uppercase">
                    {STEPS[(activeIndex + 1) % STEPS.length].title}
                  </h4>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterIELTS;