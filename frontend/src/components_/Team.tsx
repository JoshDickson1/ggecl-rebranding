import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Daniel Vincent",
    role: "Founder / CEO",
    image: "/daniel.jpeg", // Replace with your actual paths
  },
  {
    name: "Angel Uju",
    role: "Non-Executive Director",
    image: "/team/angel.jpg",
  },
  {
    name: "Xinia Jimenez",
    role: "Education Support Lead",
    image: "/xiniaJimenez.jpeg",
  },
  {
    name: "Noel Kelechi",
    role: "IT Solutions",
    image: "/noel.svg",
  },
];

const Team = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-[#1e3a5f] dark:text-white uppercase tracking-tighter">
          Meet Our <span className="text-blue-500">Team</span>
        </h2>
        <div className="h-1.5 w-24 bg-[#1e3a5f] dark:bg-blue-500 mt-4 rounded-full" />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Info Footer */}
            <div className="bg-[#1e3a5f] p-6 text-white mt-auto">
              <h3 className="text-xl font-black tracking-tight leading-tight uppercase">
                {member.name}
              </h3>
              <p className="text-xs font-bold text-blue-300 mt-1 uppercase tracking-widest">
                {member.role}
              </p>
            </div>
            
            {/* Subtle Overlay Effect on Hover */}
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Team;