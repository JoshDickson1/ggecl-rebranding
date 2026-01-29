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
  // Container variants for staggering the children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Individual card variants
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: easeInOut }
    },
  };

  return (
    <section className="bg-slate-50 py-20 px-6">
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
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`relative p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 flex flex-col h-full min-h-[320px] transition-colors duration-300 ${
              service.primary 
                ? "bg-[#1e2a44] text-white" 
                : "bg-white text-slate-900"
            }`}
          >
            {/* Number Badge */}
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-8 ${
              service.primary 
                ? "bg-white text-[#1e2a44]" 
                : "bg-[#1e2a44] text-white"
            }`}>
              {service.id}
            </div>

            {/* Title */}
            <h3 className={`text-xl font-black mb-4 leading-tight uppercase tracking-tight`}>
              {service.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed ${
              service.primary ? "text-slate-300" : "text-slate-500"
            }`}>
              {service.description}
            </p>
            
            {/* Subtle Inner Glow for "Alive" feel */}
            {service.primary && (
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default IELTSGrid;