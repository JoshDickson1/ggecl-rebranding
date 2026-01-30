import { motion, easeInOut } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  // Floating animation for the image group
  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: easeInOut,
    },
  };

  return (
    <section className="relative w-full h-full md:h-screen flex items-center bg-white dark:bg-slate-950 overflow-hidden py-0 pt-15 md:pt-0 md:py-0 px-6">
      {/* Animated Blurred Ball - Bottom Left */}
<motion.div
  animate={{
    x: [0, 30, 0],
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -bottom-4 -right-2 w-96 h-96 rounded-full blur-[100px] opacity-20 dark:opacity-30 z-10 bg-gradient-to-tr from-[#1e3a5f] to-blue-400"
/>
      {/* Animated Blurred Ball - Bottom Left */}
<motion.div
  animate={{
    x: [0, 30, 0],
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute -top-4 -left-2 md:flex hidden w-96 h-96 rounded-full blur-[100px] opacity-10 md:opacity-20 dark:opacity-10 z-10 bg-gradient-to-tr from-[#1e3a5f] to-blue-400"
/>
      <div className="max-w-screen mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col space-y-8 z-10"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-xl md:text-5xl font-black text-slate-900 dark:text-white leading-[0.95] tracking-tighter uppercase"
          >
            ACHIEVE MORE, <br />
            <span className="text-[#1e3a5f] dark:text-blue-400 text-4xl md:text-7xl">STUDY ABROAD</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl"
          >
            Discover world-class education and a vibrant, diverse culture. Studying Abroad opens doors to top-tier universities, innovative research, and global career prospects.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 md:justify-start pt-4">
            <motion.button
            onClick={() => navigate("/apply")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:px-10 px-5 py-3 md:py-4 bg-[#1e3a5f] text-white rounded-full font-bold text-sm md:text-lg shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest"
            >
              Apply Now
            </motion.button>
            <motion.button
            onClick={() => navigate("/about")}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 58, 95, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 md:px-10 py-3 md:py-4 border-2 border-slate-200 dark:border-slate-800 text-[#1e3a5f] dark:text-slate-200 rounded-full font-bold text-sm md:text-lg transition-all uppercase tracking-widest"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated Image Composition */}
        <motion.div
          animate={floatAnimation}
          className="relative w-full aspect-square md:aspect-auto h-full min-h-[200px] md:min-h-[600px]"
        >
          <img src="hero.png" alt="" className="" />
        </motion.div>

      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default Hero;