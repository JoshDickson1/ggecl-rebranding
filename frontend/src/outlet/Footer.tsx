import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Send,
  ArrowUpRight,
  MapPin
} from "lucide-react";
import { ModeToggle } from "@/mode-toggle";
import { Link } from "react-router-dom";

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/goldengosheneducationalconsultancy",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/goldengosheneducation",
    label: "Instagram",
  },
  {
    icon: Twitter,
    href: "https://www.x.com/goldengoshenedu",
    label: "X (Twitter)",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/company/goldengosheneducationalconsultancy",
    label: "LinkedIn",
  },
  {
    icon: Send,
    href: "http://t.me/goldengosheneducation",
    label: "Telegram",
  },
];


const FOOTER_LINKS = {
  "Quick Links": [
    { name: "Home", to: "/" },
    { name: "About us", to: "/about" },
    { name: "Services", to: "/services" },
    { name: "Apply", to: "/apply/start" },
  ],
  "Support": [
    { name: "Contact", to: "/contact" },
    { name: "GGECL LMS", to: "https://lms.ggecl.com" },
    { name: "Career", to: "/career" },
  ],
  "Community": [
    { name: "FAQs", to: "/faqs" },
    { name: "Terms & Services", to: "/terms" },
    { name: "Work hours", to: "/work-hours" },
    { name: "Blogs", to: "/blogs" },
  ]
};

const INSTAGRAM_POSTS = [
  "/foot-1.jpeg", "/foot-2.jpeg", "/foot-3.jpeg",
  "/foot-4.jpeg", "/foot-5.jpeg", "/foot-6.jpeg"
];

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-slate-950 pt-20 pb-10 overflow-hidden transition-colors duration-300">

      {/* Background Glow - Matches Hero Ball */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-400/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                <img src="/ggecl_logo.png" alt="" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">
                G.G.E.C.L
              </h2>
            </div>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Begin your study abroad journey with ease, secure, reliable, and tailored support every step of the way. We are dedicated to providing top-quality educational experiences.
            </p>

            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  whileHover={{ y: -5, scale: 1.1 }}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-[#1e3a5f] hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

          </div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.to} className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-[#1e3a5f] dark:hover:text-blue-400 transition-colors font-semibold text-sm">
                        <ArrowUpRight size={14} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Location & Instagram Column */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Location</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <MapPin size={18} className="shrink-0 text-blue-500" />
                University Business Centre- Leeds, 148 Rose Bowl, LS1 3HB, UK.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Instagram Post</h4>
              <div className="grid grid-cols-3 gap-2">
                {INSTAGRAM_POSTS.map((src, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800"
                  >
                    <img
                      src={src}
                      alt={`Instagram post ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                ))}

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            © 2026 G.G.E.C.L All Rights Reserved by <a href="tel:+2349130993464" className="text-[#1e3a5f] dark:text-blue-400">BiTech</a>
          </p>

          <div className="flex items-center gap-8">
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-tighter text-slate-400">
              <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
            <div className="p-1 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner scale-90">
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;