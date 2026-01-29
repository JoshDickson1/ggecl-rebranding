import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Global Recognition",
    description: "Recognized by educational institutions, employers, and immigration authorities worldwide.",
    align: "right",
  },
  {
    title: "Academic Advantage",
    description: "Showcase your English skills for better educational and career prospects.",
    align: "left",
  },
  {
    title: "Personal Growth",
    description: "Develop the confidence and skills needed to succeed in an English-speaking environment.",
    align: "right",
  },
];

const Why = () => {
  return (
    <section className="bg-[#1e3a5f] py-20 px-6 min-h-screen flex flex-col items-center overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center uppercase tracking-tight">
        Why Take <span className="text-yellow-400">IELTS?</span>
      </h2>

      <div className="relative max-w-5xl w-full">
        {/* The Vertical Animated Trail */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 flex justify-center">
          <svg width="4" height="100%" className="h-full overflow-visible">
            {/* Background dashed line */}
            <line
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="8 8"
              className="opacity-20"
            />
            {/* Animated "Alive" Trail */}
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="#facc15" // Yellow-400
              strokeWidth="3"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>

        {/* Content Rows */}
        <div className="space-y-24 relative">
          {REASONS.map((item, index) => (
            <motion.div
              key={index}
              className={`flex items-center w-full ${
                item.align === "left" ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Spacer for Desktop Alignment */}
              <div className="hidden md:block md:w-1/2" />

              {/* The Glowing Ball */}
              <div className="absolute left-[.5rem] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                {/* Glow Effect Triggered by Time */}
                <motion.div
                  className="absolute w-12 h-12 rounded-full blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0, 0.8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 1.3, // Timed with the pathLength animation
                  }}
                />
                <motion.div
                  className="w-5 h-5 bg-yellow-400 rounded-full border-4 border-[#1e3a5f] shadow-[0_0_15px_rgba(250,204,21,0.8)]"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 1.3,
                  }}
                />
              </div>

              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                  item.align === "left" ? "md:pr-16 md:text-right" : "md:pl-16 text-left"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-sm ml-0 ${item.align === 'left' ? 'md:ml-auto' : ''}">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;