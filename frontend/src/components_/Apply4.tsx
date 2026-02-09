import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

type ApplyContextType = {
  formData: any;
  updateFields: (fields: any) => void;
};

const Apply4 = () => {
  const { formData, updateFields } = useOutletContext<ApplyContextType>();
  const navigate = useNavigate();

  // We only need local state for the success modal and redirect
  const [showSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Auto redirect after success (This triggers after the parent successfully submits)
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

  /**
   * NOTE: The final "Submit" button is now in the Parent (Apply.tsx)
   * This page only collects the GDPR consent and the Signature.
   */

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
        </p>
        <ol className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mt-4 list-decimal pl-4 font-medium">
          <li>Explicit permission before processing personal data</li>
          <li>Right to obtain personal data</li>
          <li>Right to correction or erasure</li>
        </ol>
      </div>

      {/* Consent Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border space-y-6">
        <p className="text-xs font-bold text-slate-500 italic uppercase tracking-wider">
          Data Usage Agreement
        </p>

        <RadioGroup
          value={formData.gdprConsent}
          onValueChange={(val: string) => updateFields({ gdprConsent: val })}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border">
            <RadioGroupItem value="agree" id="agree" />
            <Label htmlFor="agree" className="font-bold cursor-pointer">
              I agree to the storage and use of my data for 365 days.
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4">
            <RadioGroupItem value="disagree" id="disagree" />
            <Label htmlFor="disagree" className="text-slate-400 cursor-pointer">
              I disagree (Application cannot be processed)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Signature */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border space-y-6">
        <p className="text-sm text-slate-600">
          Sign by typing your full legal name below:
        </p>

        <Input
          value={formData.signature}
          placeholder="Type Full Name..."
          className="h-16 rounded-2xl px-6 text-xl italic font-serif"
          onChange={(e) => updateFields({ signature: e.target.value })}
        />
      </div>

      {/* IMPORTANT: The "Finalize Application" button is rendered by the PARENT (Apply.tsx)
          using the handleNext function which calls submitApplication.
      */}

      {/* Success Dialog (triggered when parent navigates or can be managed via context) */}
      <Dialog open={showSuccess}>
        <DialogContent className="sm:max-w-md rounded-[3rem] p-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <CheckCircle2 size={48} className="text-green-600" />
            <DialogHeader>
              <DialogTitle className="text-3xl font-black uppercase">
                Submission Complete
              </DialogTitle>
              <DialogDescription>
                Redirecting in {countdown}...
              </DialogDescription>
            </DialogHeader>

            <Button
              onClick={() => navigate("/")}
              className="w-full h-16 rounded-2xl font-black uppercase"
            >
              <Home size={18} /> Exit Portal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Apply4;