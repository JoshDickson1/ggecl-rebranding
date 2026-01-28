import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const CTA = () => {
  return (
    <section className="py-20 md:w-[85%] w-[95%] mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden bg-[#1e3a5f] text-white rounded-[2.5rem] p-10 md:p-20 shadow-2xl border border-white/10"
      >
        {/* Vercel-style Grid Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative Radial Glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold leading-tight tracking-tight"
          >
            Ready to Start Your Learning Journey?
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-300 text-lg md:text-xl max-w-6xl"
          >
            Explore a powerful online learning system for instructors, students, and admins. Real-time classes, 
assignments, groups, and more — built for modern education.
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <button className="bg-white text-[#1e3a5f] hover:bg-blue-50 rounded-full px-14 py-4 text-lg font-bold shadow-xl flex gap-3 group">
              Visit Our LMS
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA