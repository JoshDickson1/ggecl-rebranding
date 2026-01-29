import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Facebook, Instagram, Twitter, Linkedin, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PageHero } from "@/components_/PageHero";

export default function ContactPage() {
  const [state, handleSubmit] = useForm("https://formspree.io/f/xojdgarp");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Open dialog when form state changes to succeeded
  React.useEffect(() => {
    if (state.succeeded || state.errors) {
      setIsDialogOpen(true);
    }
  }, [state.succeeded, state.errors]);

  return (
    <div className="">
        <div className="">
            <PageHero
                title="Contact Us"
                backgroundImage="/otherhero.svg"
                breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Contact Us" },
                ]}
            />
        </div>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Contact Form Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">Full Name</label>
                <Input name="name" placeholder="Full Name" className="mt-3 rounded-full px-6 h-12 border-slate-200 focus:ring-blue-500" required />
              </div>
              <div className="space-y-2">
                <label className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">Email</label>
                <Input type="email" name="email" placeholder="Email" className="mt-3 rounded-full px-6 h-12" required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">Subject</label>
              <Input name="subject" placeholder="Subject" className="mt-3 rounded-full px-6 h-12" required />
            </div>

            <div className="space-y-2">
              <label className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">Message</label>
              <Textarea name="message" placeholder="Message" className="mt-3 min-h-[150px] rounded-3xl px-6 py-4" required />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </div>

            <div className="flex justify-center md:justify-end">
              <button 
                type="submit" 
                disabled={state.submitting}
                className="bg-[#1e3a5f] hover:bg-[#2a5288] text-white rounded-full px-10 h-12 text-lg transition-transform active:scale-95"
              >
                {state.submitting ? "Sending..." : "Send A Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e3a5f] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold mb-8">Hi! We are always here to help you</h2>
            
            <div className="space-y-6">
              {/* Hotline */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Phone className="mt-1" size={24} />
                <div>
                  <p className="font-bold">Hotline:</p>
                  <p className="text-sm text-slate-300">+44 7943 477 853</p>
                  <p className="text-sm text-slate-300">+234 703 339 8991</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <MessageSquare className="mt-1" size={24} />
                <div>
                  <p className="font-bold">SMS/WhatsApp:</p>
                  <p className="text-sm text-slate-300">+44 3301 137 424</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <Mail className="mt-1" size={24} />
                <div>
                  <p className="font-bold">Email:</p>
                  <p className="text-sm text-slate-300">info@ggecl.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="mb-4 font-medium border-t border-white/20 pt-6">Connect with us</p>
            <div className="flex gap-4">
              <Facebook className="cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="cursor-pointer hover:text-pink-400 transition-colors" />
              <Twitter className="cursor-pointer hover:text-sky-400 transition-colors" />
              <Linkedin className="cursor-pointer hover:text-blue-300 transition-colors" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Success/Error Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center gap-2">
            {state.succeeded ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <DialogTitle>Message Sent!</DialogTitle>
                <DialogDescription className="text-center">
                  Thank you for reaching out. We'll get back to you shortly.
                </DialogDescription>
              </>
            ) : (
              <>
                <AlertCircle className="w-12 h-12 text-red-500" />
                <DialogTitle>Submission Failed</DialogTitle>
                <DialogDescription className="text-center">
                  Something went wrong. Please check your internet connection and try again.
                </DialogDescription>
              </>
            )}
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setIsDialogOpen(false)} className="bg-[#1e3a5f] rounded-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}