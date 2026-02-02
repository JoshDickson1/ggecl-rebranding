import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { CheckCircle2, Home, Loader2 } from "lucide-react";
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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojdgarp";

const Apply4 = () => {
  const { formData, updateFields } = useOutletContext<ApplyContextType>();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [countdown, setCountdown] = useState(10);

  // Auto redirect after success
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
    setSubmitting(true);
    setError(null);

    try {
      const data = new FormData();

      // Text fields
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

      // Files
      Object.keys(formData.docs || {}).forEach((key) => {
        const value = formData.docs[key];
        if (Array.isArray(value)) {
          value.forEach((file: any) => {
            if (file instanceof File) data.append(`${key}[]`, file);
          });
        } else if (value instanceof File) {
          data.append(key, value);
        }
      });

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body?.error || "Submission failed");
      }

      setShowSuccess(true);
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
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
          onValueChange={(val: any) => updateFields({ gdprConsent: val })}
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
          placeholder="Type Full Name..."
          className="h-16 rounded-2xl px-6 text-xl italic font-serif"
          onChange={(e) => updateFields({ signature: e.target.value })}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleFinalSubmit}
          disabled={
            submitting ||
            formData.gdprConsent !== "agree" ||
            formData.signature?.length < 3
          }
          className="px-12 py-5 bg-[#1e3a5f] text-white rounded-2xl font-black uppercase shadow-2xl flex items-center justify-center gap-3 disabled:opacity-40"
        >
          {submitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Encrypting & Sending...
            </>
          ) : (
            "Finalize Application"
          )}
        </button>

        {error && (
          <p className="text-red-500 text-xs font-black uppercase tracking-widest text-center">
            {error}
          </p>
        )}
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess}>
        <DialogContent className="sm:max-w-md rounded-[3rem] p-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <CheckCircle2 size={48} className="text-green-600" />
            <DialogHeader>
              <DialogTitle className="text-3xl font-black uppercase">
                Submission Complete
              </DialogTitle>
              <DialogDescription>
                Redirecting in {countdown}
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
