import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react"; // Swapped for a cleaner 'Visit' icon
import { Link } from "react-router-dom";

const IMAGES = [
  { id: 1, src: "/sub1.png", hasLink: false, linkTo: "/campus", label: "Campus Life" },
  { id: 2, src: "/sub2.png", hasLink: false, linkTo: "", label: "Digital Literacy" },
  { id: 3, src: "/sub3.png", hasLink: false, linkTo: "/classrooms", label: "Modern Classrooms" },
  { id: 4, src: "/sub4.png", hasLink: false, linkTo: "", label: "Techniques" },
  { id: 5, src: "/sub5.png", hasLink: false, linkTo: "/collaboration", label: "Collaboration" },
  { id: 6, src: "/sub8.png", hasLink: true, linkTo: "https://apply.vistula.edu.pl/enter/2642", label: "Visit Site" },
  { id: 7, src: "/sub6.png", hasLink: false, linkTo: "/innovation", label: "Innovation" },
  { id: 8, src: "/sub7.png", hasLink: false, linkTo: "", label: "Research" },
];

const SCROLL_IMAGES = [...IMAGES, ...IMAGES];

const SubHero = () => {
  return (
    <section className="py-16 bg-background overflow-hidden">
      {/* Enhanced Header Section */}
      <div className="container px-6 mb-12">
        <div className="mb-16">
          <h2 className="text-5xl font-black text-slate-900 dark:text-slate-50 leading-[0.9] tracking-tighter md:text-left text-center uppercase">
            Institutional <br />
            <span className="text-[#1e3a5f] dark:text-blue-400">Gallery</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 md:text-left text-center  mt-2 font-medium">
            Explore our Digital Campus through this curated gallery of images.
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* Blurred Edge Overlays */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-background via-background/70 to-transparent" />

        <div className="flex group">
          <motion.div
            className="flex gap-6 py-4"
            animate={{ x: [0, -2200] }} 
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ transition: { duration: 90 } }}
          >
            {SCROLL_IMAGES.map((img, idx) => {
              const CardContent = (
                <div className="flex flex-col gap-3 flex-shrink-0 w-[180px] md:w-[220px] group/card">
                  {/* The Image Box */}
                  <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm bg-muted transition-all duration-500 group-hover/card:shadow-md group-hover/card:border-[#1e3a5f]/20">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                  </div>

                  {/* Visit Link - Now positioned UNDER the image */}
                  <div className="h-8"> {/* Fixed height to prevent layout shift */}
                    {img.hasLink && (
                      <div className="flex items-center justify-between px-1 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black uppercase tracking-wider text-[#1e3a5f]">
                            {img.label}
                          </span>
                          <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">
                            Visit Page
                          </span>
                        </div>
                        <div className="p-1.5 rounded-full bg-slate-50 text-[#1e3a5f] group-hover/card:bg-[#1e3a5f] group-hover/card:text-white transition-colors duration-300">
                          <ArrowUpRight size={10} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );

              return img.hasLink ? (
                <Link key={`${img.id}-${idx}`} to={img.linkTo} className="cursor-pointer block">
                  {CardContent}
                </Link>
              ) : (
                <div key={`${img.id}-${idx}`} className="cursor-default block">
                  {CardContent}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SubHero;