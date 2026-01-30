import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowBigLeft } from "lucide-react";
import { ModeToggle } from "@/mode-toggle";

const STEPS = [
  { path: "/apply/start", label: "Start" },
  { path: "/apply/qualifications", label: "Qualifications" },
  { path: "/apply/documentation", label: "Documents" },
  { path: "/apply/acknowledgement", label: "Finalize" },
];

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find current step index based on URL
  const currentStepIndex = STEPS.findIndex((s) => s.path === location.pathname);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      navigate(STEPS[currentStepIndex + 1].path);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(STEPS[currentStepIndex - 1].path);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Background Orbs */}
        <div className="w-full flex justify-between p-6">
            <button 
                onClick={() => navigate("/")} 
                className="text-slate-400 flex flex-row items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ArrowBigLeft />
                    <span>Exit Application</span>
            </button>
            <div className="p-1 bg-slate-100 w-max dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner scale-90">
            <ModeToggle />
        </div>
        </div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] rounded-full -z-10" />
      
      {/* Header & Progress Section */}
      <header className="max-w-4xl mx-auto w-full pt-12 px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Application <span className="text-[#1e3a5f] dark:text-blue-400">Portal</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
            Complete the steps below to start your journey.
          </p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="relative mb-12">
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#1e3a5f] dark:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              transition={{ type: "spring", stiffness: 50, damping: 15 }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4">
            {STEPS.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              return (
                <div key={step.path} className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isActive 
                    ? "bg-[#1e3a5f] dark:bg-blue-500 border-[#1e3a5f] dark:border-blue-500 scale-110" 
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  }`}>
                    {idx < currentStepIndex ? (
                      <CheckCircle2 size={14} className="text-white" />
                    ) : (
                      <span className={`text-[10px] font-bold ${isActive ? "text-white" : "text-slate-400"}`}>
                        {idx + 1}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] uppercase font-black mt-2 tracking-widest ${
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-400"
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-32">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 py-6 px-6 z-50 transition-colors z-100 duration-300">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-0 transition-all uppercase text-xs tracking-widest"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <button
            onClick={handleNext}
            className="group flex items-center gap-3 px-8 py-4 bg-[#1e3a5f] dark:bg-blue-500 text-white rounded-2xl font-black shadow-lg shadow-blue-900/20 dark:shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all uppercase text-xs tracking-widest"
          >
            {currentStepIndex === STEPS.length - 1 ? "Submit Application" : "Continue"}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Apply;