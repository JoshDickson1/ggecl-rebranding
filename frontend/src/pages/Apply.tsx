import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowBigLeft } from "lucide-react";
import { ModeToggle } from "@/mode-toggle";

export type ApplicationData = {
  // Step 1
  fullName: string;
  phone: string;
  email: string;
  country: string;
  // Step 2
  highestQualification: string;
  requiredProgram: string;
  countryOfInterest: string;
  courseFirstChoice: string;
  courseSecondChoice: string;
  // Step 3 (Store file names or URLs)
  docs: {
    certificates: string[];
    ielts: string | null;
    scholarship: string | null;
    travelDoc: string[];
    birthCert: string[];
    sop: string | null;
    payment: string | null;
  };
  // Step 4
  gdprConsent: string;
  signature: string;
};

const STEPS = [
  { path: "/apply/start", label: "Start" },
  { path: "/apply/qualifications", label: "Qualifications" },
  { path: "/apply/documentation", label: "Documents" },
  { path: "/apply/acknowledgement", label: "Finalize" },
];

const Apply = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ApplicationData>({
    fullName: "",
    phone: "",
    email: "",
    country: "",
    highestQualification: "",
    requiredProgram: "",
    countryOfInterest: "",
    courseFirstChoice: "",
    courseSecondChoice: "",
    docs: {
      certificates: [],
      ielts: null,
      scholarship: null,
      travelDoc: [],
      birthCert: [],
      sop: null,
      payment: null,
    },
    gdprConsent: "",
    signature: "",
  });

  const updateFields = (fields: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const currentStepIndex = STEPS.findIndex((s) => s.path === location.pathname);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const isStepValid = () => {
    switch (currentStepIndex) {
      case 0:
        return formData.fullName.trim().length > 2 && formData.email.includes("@") && formData.phone.length > 8;
      case 1:
        return formData.highestQualification && formData.requiredProgram && formData.courseFirstChoice;
      case 2:
        // Validate required files (Certificates, Travel Doc, Birth Cert, SOP, Payment)
        return (
          formData.docs.certificates.length > 0 &&
          formData.docs.travelDoc.length > 0 &&
          formData.docs.birthCert.length > 0 &&
          formData.docs.sop !== null &&
          formData.docs.payment !== null
        );
      case 3:
        return formData.gdprConsent === "agree" && formData.signature.trim().length > 2;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (isStepValid() && currentStepIndex < STEPS.length - 1) {
      navigate(STEPS[currentStepIndex + 1].path);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      navigate(STEPS[currentStepIndex - 1].path);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col transition-colors duration-300 relative overflow-x-hidden font-sans">
      <div className="w-full flex justify-between p-6 items-center z-50">
        <button onClick={() => navigate("/")} className="text-slate-400 flex flex-row items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-all font-bold uppercase text-xs tracking-widest">
          <ArrowBigLeft size={20} />
          <span>Exit Application</span>
        </button>
        <div className="p-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner scale-90">
          <ModeToggle />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] rounded-full -z-10" />
      
      <header className="max-w-4xl mx-auto w-full pt-4 px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Application <span className="text-[#1e3a5f] dark:text-blue-400">Portal</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 tracking-tight">
            Step {currentStepIndex + 1} of {STEPS.length}: {STEPS[currentStepIndex].label}
          </p>
        </motion.div>

        <div className="relative mb-12">
          <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#1e3a5f] dark:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]" transition={{ type: "spring", stiffness: 60, damping: 15 }} />
          </div>
          <div className="flex justify-between mt-4">
            {STEPS.map((step, idx) => (
              <div key={step.path} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${idx <= currentStepIndex ? "bg-[#1e3a5f] dark:bg-blue-500 border-[#1e3a5f] dark:border-blue-500 scale-110 shadow-lg shadow-blue-500/20" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"}`}>
                  {idx < currentStepIndex ? <CheckCircle2 size={16} className="text-white" /> : <span className={`text-xs font-black ${idx <= currentStepIndex ? "text-white" : "text-slate-400"}`}>0{idx + 1}</span>}
                </div>
                <span className={`text-[10px] uppercase font-black mt-2 tracking-widest hidden md:block ${idx <= currentStepIndex ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 pb-40">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
              <Outlet context={{ formData, updateFields }} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 py-6 px-6 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button onClick={handleBack} disabled={currentStepIndex === 0} className="flex items-center gap-2 px-6 py-3 font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-0 transition-all uppercase text-xs tracking-widest">
            <ChevronLeft size={18} /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all uppercase text-xs tracking-widest shadow-xl ${isStepValid() ? "bg-[#1e3a5f] dark:bg-blue-500 text-white hover:scale-105 active:scale-95" : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-60"}`}
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