import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { CheckCircle2, Home, Loader2 } from "lucide-react";
import { useForm } from "@formspree/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type ApplyContextType = {
  formData: any;
  updateFields: (fields: any) => void;
};

const Apply4 = () => {
  const { formData, updateFields } = useOutletContext<ApplyContextType>();
  const navigate = useNavigate();
  
  // Connect to Formspree - Replace with your actual Form ID
  const [state, handleSubmitFormspree] = useForm("xojdgarp");

  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Trigger success dialog when Formspree confirms success
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  // Precise Auto-redirect logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (showSuccess && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [showSuccess, countdown, navigate]);

  const handleFinalSubmit = async () => {
    // IMPORTANT: Formspree needs a FormData object for file uploads
    const data = new FormData();

    // 1. Append Text Data
    data.append("Full Name", formData.fullName);
    data.append("Email", formData.email);
    data.append("Phone", formData.phone);
    data.append("Origin Country", formData.country);
    data.append("Highest Qualification", formData.highestQualification);
    data.append("Target Program", formData.requiredProgram);
    data.append("Destination", formData.countryOfInterest);
    data.append("Choice 1", formData.courseFirstChoice);
    data.append("Choice 2", formData.courseSecondChoice);
    data.append("GDPR Consent", formData.gdprConsent);
    data.append("Digital Signature", formData.signature);

    // 2. Append Files from Step 3
    // We loop through the docs object and append files to the data
    Object.keys(formData.docs).forEach((key) => {
      const value = formData.docs[key];
      if (Array.isArray(value)) {
        // Handle multiple files (e.g., certificates)
        value.forEach((file) => {
          if (file instanceof File) data.append(`${key}[]`, file);
        });
      } else {
        // Handle single files
        if (value instanceof File) data.append(key, value);
      }
    });

    // 3. Submit to Formspree
    await handleSubmitFormspree(data);
  };

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#1e3a5f] dark:text-blue-400 uppercase tracking-tighter">
          Acknowledgement
        </h2>
        <div className="h-1 w-20 bg-[#1e3a5f] dark:bg-blue-500 rounded-full" />
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Individuals whose personal data is handled have certain rights that are outlined in the General Data Protection Regulation (GDPR). 
          Individuals are granted more control over their personal data via these enhanced rights, which include:
        </p>
        <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mt-4 list-decimal pl-4 font-medium">
          <li>The need of obtaining an individual's explicit permission before processing any personal data</li>
          <li>Making it simpler for individuals to obtain their personal data</li>
          <li>The freedom to have one's data corrected, erased, or "forgotten"</li>
        </ol>
      </div>

      {/* Consent Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
        <p className="text-xs font-bold text-slate-500 italic uppercase tracking-wider">
          Data Usage Agreement
        </p>
        
        <RadioGroup 
          onValueChange={(val: any) => updateFields({ gdprConsent: val })}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
            <RadioGroupItem value="agree" id="agree" />
            <Label htmlFor="agree" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
              I agree to the storage and use of my data for 365 days.
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4">
            <RadioGroupItem value="disagree" id="disagree" />
            <Label htmlFor="disagree" className="text-sm font-medium text-slate-400 cursor-pointer">
              I disagree (Application cannot be processed)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Signature Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-6">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
          I affirm that all information provided is accurate. Fraudulent information leads to immediate termination.
          <br />
          <span className="text-[#1e3a5f] dark:text-blue-400 font-black uppercase text-xs">
            Sign by typing your full legal name below:
          </span>
        </p>
        
        <Input 
          placeholder="Type Full Name..."
          className="h-16 rounded-2xl border-slate-200 dark:border-slate-800 bg-transparent px-6 text-xl italic font-serif text-[#1e3a5f] dark:text-blue-400"
          onChange={(e) => updateFields({ signature: e.target.value })}
        />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-4">
        <button 
          onClick={handleFinalSubmit}
          disabled={state.submitting || formData.gdprConsent !== 'agree' || formData.signature.length < 3}
          className="w-full md:w-auto px-12 py-5 bg-[#1e3a5f] dark:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100 flex items-center justify-center gap-3"
        >
          {state.submitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Encrypting & Sending...
            </>
          ) : (
            "Finalize Application"
          )}
        </button>

        {state.errors && (
          <p className="text-red-500 text-xs font-black uppercase tracking-widest text-center md:text-left">
            Error: Check your connection or form fields.
          </p>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess}>
        <DialogContent className="sm:max-w-md rounded-[3rem] border-none bg-white dark:bg-slate-900 p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Submission <span className="text-green-600">Complete</span>
              </DialogTitle>
              <DialogDescription className="pt-4 text-slate-500 text-base">
                Success! <span className="font-bold text-[#1e3a5f] dark:text-blue-400">{formData.fullName}</span>, your documents have been safely uploaded to our admissions portal.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full space-y-4">
              <Button 
                onClick={() => navigate("/")}
                className="w-full h-16 rounded-2xl bg-[#1e3a5f] dark:bg-blue-600 hover:bg-[#152a45] font-black uppercase text-xs tracking-widest gap-2 shadow-xl"
              >
                <Home size={18} />
                Exit Portal
              </Button>
              <div className="flex flex-col items-center">
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">
                  Redirecting in
                </p>
                <span className="text-2xl font-black text-[#1e3a5f] dark:text-blue-400 leading-none">
                  {countdown}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Apply4;