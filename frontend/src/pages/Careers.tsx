import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Coffee, Globe, Zap, Send, Briefcase, 
  Info, Loader2, PartyPopper 
} from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Careers = () => {
  const [state, handleSubmit] = useForm("xojdgarp");
  const [showDialog, setShowDialog] = useState(false);

  // Trigger dialog on success
  React.useEffect(() => {
    if (state.succeeded) {
      setShowDialog(true);
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 mt-0 md:mt-20 bg-slate-50 dark:bg-slate-900/50 border-b">
        <div className="container px-6 md:px-30">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#1e3a5f]">
              Join the Mission
            </h2>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Shape the Future of <br />
              <span className="text-[#1e3a5f] dark:text-blue-300">Global Education</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-xl pt-4">
              We are a team of dreamers, educators, and technologists dedicated to 
              making international study accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 w-full justify-center mx-auto flex container px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full justify-center">
          <ValueCard 
            icon={<Globe className="text-[#1e3a5f] dark:text-blue-300" />}
            title="Global Mindset"
            description="We work across borders and time zones to support students from over 50 countries."
          />
          <ValueCard 
            icon={<Zap className="text-[#1e3a5f] dark:text-blue-300" />}
            title="Fast Execution"
            description="We move quickly to solve complex problems in the international education space."
          />
          <ValueCard 
            icon={<Users className="text-[#1e3a5f] dark:text-blue-300" />}
            title="Student First"
            description="Every decision we make starts with one question: Does this help the student?"
          />
        </div>
      </section>

      {/* Talent Community Section */}
      <section className="py-20 bg-[#1e3a5f] text-white overflow-hidden relative">
        <div className="container w-full justify-center mx-auto flex px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-blue-200">
                <Info size={14} /> Current Status
              </div>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
                We aren't hiring <br />
                <span className="opacity-50 text-blue-200">at the moment.</span>
              </h2>
              <p className="text-blue-100/70 text-lg leading-relaxed">
                While our team is currently full, we are always looking for exceptional 
                talent. Drop your details below to join our talent pool.
              </p>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
              <div className="space-y-4 text-slate-800">
                <h3 className="text-xl font-black uppercase tracking-tight">Join the Talent Pool</h3>
                <p className="text-sm text-slate-500">Submit your dossier for future consideration.</p>
                
                <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label htmlFor="full-name" className="text-[10px] font-bold uppercase text-slate-400">Full Name</label>
                    <Input 
                        id="full-name"
                        name="name"
                        required
                        placeholder="John Doe" 
                        className="rounded-xl border-slate-200 focus:ring-[#1e3a5f]" 
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase text-slate-400">Email Address</label>
                    <Input 
                        id="email"
                        name="email"
                        type="email" 
                        required
                        placeholder="john@example.com" 
                        className="rounded-xl border-slate-200 focus:ring-[#1e3a5f]" 
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-red-500 font-bold" />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="interest" className="text-[10px] font-bold uppercase text-slate-400">Area of Interest</label>
                    <select 
                        id="interest"
                        name="interest"
                        className="w-full h-10 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] bg-transparent"
                    >
                      <option>Engineering</option>
                      <option>Student Counseling</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                    </select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full bg-[#1e3a5f] hover:bg-slate-800 text-white rounded-xl py-6 gap-2 font-bold uppercase tracking-widest text-xs mt-4 transition-all"
                  >
                    {state.submitting ? (
                        <Loader2 className="animate-spin" size={16} />
                    ) : (
                        <Send size={16} />
                    )}
                    {state.submitting ? "Sending..." : "Submit for Future Consideration"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <Briefcase className="absolute -bottom-20 -right-20 w-96 h-96 text-white/5 -rotate-12" />
      </section>

      {/* Success Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] p-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center text-green-600">
                <PartyPopper size={40} />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black uppercase tracking-tight">Dossier Received</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium pt-2">
                Thank you for your interest in Golden Goshen. Your profile has been added to our talent community. 
                We will reach out as soon as a matching role opens up.
              </DialogDescription>
            </DialogHeader>
            <Button 
                onClick={() => setShowDialog(false)}
                className="w-full bg-[#1e3a5f] hover:bg-slate-800 rounded-xl font-bold uppercase tracking-widest text-xs py-6"
            >
                Back to Careers
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Culture Teaser */}
      <section className="py-24 w-full justify-center mx-auto flex container px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <Coffee className="mx-auto text-[#1e3a5f]" size={32} />
          <h2 className="text-2xl font-bold uppercase tracking-tight">Life at Golden Goshen</h2>
          <p className="text-slate-500">
            We believe in autonomy, transparency, and a healthy work-life balance. 
            Even though we work hard for our students, we make sure our team has 
            the space to grow personally and professionally.
          </p>
        </div>
      </section>
    </div>
  );
};

const ValueCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-[2rem] border bg-white dark:bg-slate-900 shadow-sm space-y-4 transition-colors hover:border-[#1e3a5f]/20"
  >
    <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="font-bold uppercase tracking-tight">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

export default Careers;