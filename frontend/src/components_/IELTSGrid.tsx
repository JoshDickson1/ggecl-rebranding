import { motion, easeInOut } from "framer-motion";

const SERVICES = [
  {
    id: "01",
    title: "IELTS TEST TYPE GUIDANCE",
    description: "We'll help you choose the right version of the IELTS, whether Academic or General Training, to meet your goals.",
    primary: true,
  },
  {
    id: "02",
    title: "CONVENIENT TEST LOCATION SELECTION",
    description: "We'll help you choose the right version of the IELTS, whether Academic or General Training, to meet your goals.",
    primary: false,
  },
  {
    id: "03",
    title: "APPLICATION ASSISTANCE",
    description: "We provide step-by-step assistance in filling out the online application form, ensuring accuracy and completeness.",
    primary: false,
  },
  {
    id: "04",
    title: "PAYMENT SUPPORT",
    description: "We guide you through secure payment methods, including credit/debit cards, Flutterwave, and PayPal.",
    primary: false,
  },
  {
    id: "05",
    title: "TEST PREPARATION TIPS",
    description: "Get access to practice tests and study materials, ensuring you're fully prepared for your IELTS test.",
    primary: false,
  },
];

const IELTSGrid = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: easeInOut }
    },
  };

  return (
    <section className="bg-white dark:bg-slate-950 py-24 px-6 transition-colors duration-300">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.id}
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              transition: { duration: 0.3 } 
            }}
            className={`relative p-10 rounded-[2.5rem] flex flex-col h-full min-h-[340px] transition-all duration-300 border group ${
              service.primary 
                ? "bg-[#1e3a5f] border-[#1e3a5f] text-white shadow-2xl shadow-blue-900/30" 
                : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-[#1e3a5f] dark:hover:border-blue-400"
            }`}
          >
            {/* Number Badge */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black mb-8 transition-transform duration-300 group-hover:scale-110 ${
              service.primary 
                ? "bg-white text-[#1e3a5f]" 
                : "bg-[#1e3a5f] dark:bg-blue-400 text-white dark:text-[#1e3a5f]"
            }`}>
              {service.id}
            </div>

            {/* Title */}
            <h3 className="text-xl font-black mb-4 leading-tight uppercase tracking-tight">
              {service.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed font-medium ${
              service.primary ? "text-blue-100/80" : "text-slate-500 dark:text-slate-400"
            }`}>
              {service.description}
            </p>
            
            {/* Dark Mode Specific "Alive" Glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            {/* Bottom Accent Line */}
            <div className={`absolute bottom-6 left-10 w-12 h-1 rounded-full transition-all duration-300 group-hover:w-20 ${
              service.primary ? "bg-white/30" : "bg-[#1e3a5f]/20 dark:bg-blue-400/20 group-hover:bg-[#1e3a5f] dark:group-hover:bg-blue-400"
            }`} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default IELTSGrid;