import { motion } from "framer-motion";

const MisVis = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-24 bg-white dark:bg-slate-950">

      {/* MISSION */}
      <div className="relative flex flex-col md:flex-row items-center bg-[#1e3a5f] rounded-3xl md:rounded-full md:h-[320px] px-6 md:px-12 py-10 md:py-0 overflow-hidden">
        
        {/* Image (mobile first) */}
        <div className="md:absolute md:right-12 w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-[#1e3a5f] bg-white mb-8 md:mb-0">
          <img src="/mis.svg" alt="Mission" className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[60%] md:pl-10 text-white text-center md:text-left z-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Mission</h2>
          <p className="text-blue-100 leading-relaxed max-w-lg mx-auto md:mx-0">
            Our mission is to improve learners' experiences through personalized academic program guidance,
            fostering student-centered learning, and ensuring effective knowledge transfer to help them
            achieve their goals.
          </p>
        </motion.div>
      </div>

      {/* VISION */}
      <div className="relative flex flex-col md:flex-row-reverse items-center bg-[#1e3a5f] rounded-3xl md:rounded-full md:h-[320px] px-6 md:px-12 py-10 md:py-0 overflow-hidden">
        
        {/* Image */}
        <div className="md:absolute md:left-12 w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden border-4 border-[#1e3a5f] bg-white mb-8 md:mb-0">
          <img src="/vis.svg" alt="Vision" className="w-full h-full object-cover" />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-[60%] md:pr-10 text-white text-center md:text-right z-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Our Vision</h2>
          <p className="text-blue-100 leading-relaxed max-w-lg mx-auto md:mx-0 md:ml-auto">
            We aspire to become the leading global authority, providing individuals with comprehensive and
            unparalleled support in achieving their educational and talent development goals.
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default MisVis;
