import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const PROGRAMS = [
  {
    title: "ENGLISH LANGUAGE",
    description: "Learning English enhances communication skills, opens career opportunities, and enriches cultural understanding...",
    image: "/english.jpg",
  },
  {
    title: "FOUNDATION",
    description: "Our Foundation program prepares students for higher education by building essential skills and knowledge...",
    image: "/learn.jpg",
  },
  {
    title: "HND TOP-UP",
    description: "An HND Top-Up program allows students with a Higher National Diploma to gain a full bachelor's degree by completing one additional year of study...",
    image: "/hnd.jpg",
  },
  {
    title: "UNDERGRADUATE",
    description: "An Undergraduate program offers a degree in various fields, providing in-depth knowledge, critical thinking skills, and practical experience...",
    image: "/under.svg",
  },
  {
    title: "PRE MASTERS/MASTERS",
    description: "A Pre-Master's program prepares students for graduate-level study, enhancing academic skills, English proficiency, and subject knowledge...",
    image: "/pre.jpg",
  },
  {
    title: "POSTGRADUATE PHD/RESEARCH",
    description: "A Postgraduate PhD/Research program focuses on advanced, original research in a specialized field, leading to a doctoral degree.",
    image: "/post.svg",
  },
  {
    title: "LAW",
    description: "Our Law program provides comprehensive legal training, critical thinking, and ethical reasoning skills, preparing students for legal practice.",
    image: "/law.jpg",
  },
  {
    title: "BUSINESS MANAGEMENT",
    description: "Business Management teaches strategic planning, operations, and leadership skills, equipping students for dynamic careers.",
    image: "/business.jpg",
  },
]

const StudyPrograms = () => {
  const [startIndex, setStartIndex] = useState(0)
  const [selectedProgram, setSelectedProgram] = useState<(typeof PROGRAMS)[0] | null>(null)

  const nextSlide = () => {
    if (startIndex + 3 < PROGRAMS.length) setStartIndex(prev => prev + 1)
  }

  const prevSlide = () => {
    if (startIndex > 0) setStartIndex(prev => prev - 1)
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
        <div className="w-full flex justify-center md:justify-start">
          <h2 className="text-5xl font-black text-slate-900 dark:text-slate-50 leading-[0.9] tracking-tighter uppercase">
            Our Study <br />
            <span className="text-[#1e3a5f] dark:text-blue-400">Programs</span>
          </h2>
        </div>

        <div className="flex flex-col items-end gap-6 md:w-1/2">
          <p className="text-slate-500 dark:text-slate-400 text-center md:text-right text-lg leading-snug">
            Explore our diverse range of academic programs designed to prepare you for success.
          </p>
          <div className="flex w-full justify-center md:justify-end gap-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={prevSlide}
              disabled={startIndex === 0}
              className="rounded-xl h-10 shadow-lg cursor-pointer disabled:cursor-not-allowed w-20 bg-[#1e3a5f] border-none hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-30 opacity-100 transition-all"
            >
              <ArrowLeft size={24} className="text-white dark:text-white" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={nextSlide}
              disabled={startIndex + 3 >= PROGRAMS.length}
              className="rounded-xl h-10 shadow-lg cursor-pointer disabled:cursor-not-allowed w-20 bg-[#1e3a5f] dark:bg-[#1e3a5f] hover:bg-blue-900 dark:hover:bg-blue-500 disabled:opacity-30 opacity-100 transition-all"
            >
              <ArrowRight size={24} className="text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {PROGRAMS.slice(startIndex, startIndex + 3).map((program) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              <div className="h-64 overflow-hidden rounded-[1rem] mb-6 shadow-md border dark:border-slate-800">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="relative bg-[#1e3a5f] dark:bg-slate-900 p-8 rounded-b-[1.5rem] flex-1 flex flex-col min-h-[220px] shadow-xl">
                <h4 className="text-white font-bold text-xl mb-3 uppercase tracking-tight">
                  {program.title}
                </h4>
                <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed line-clamp-4">
                  {program.description}
                </p>

                <div className="absolute -bottom-1 -right-1">
                  <button 
                    onClick={() => setSelectedProgram(program)}
                    className="h-14 w-14 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[#1e3a5f] dark:text-blue-400 border-[4px] border-white dark:border-slate-950 transition-transform hover:scale-110 active:scale-95"
                  >
                    <ChevronRight size={28} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Program Details Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 overflow-hidden border-none dark:bg-slate-900">
          {selectedProgram && (
            <div className="bg-white dark:bg-slate-900">
              <div className="h-64 w-full relative">
                <img src={selectedProgram.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <DialogHeader className="absolute bottom-6 left-8 text-left">
                  <DialogTitle className="text-3xl font-black text-white uppercase tracking-tighter leading-none">
                    {selectedProgram.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              <div className="p-8">
                <DialogDescription className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  {selectedProgram.description}
                </DialogDescription>
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={() => setSelectedProgram(null)} 
                    className="bg-[#1e3a5f] dark:bg-blue-600 dark:hover:bg-blue-500 rounded-full px-8 text-white"
                  >
                    Close Details
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default StudyPrograms