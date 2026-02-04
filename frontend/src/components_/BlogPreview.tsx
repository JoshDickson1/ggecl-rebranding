import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { ChevronRight, ChevronRightCircleIcon } from "lucide-react"

const BLOGS = [
    { id: 1, title: "Future of Education", image: "/graduate.svg", category: "Education", tags: ["Tech", "Future"] },
  { id: 2, title: "Campus Life 2026", image: "/camp.jpg", category: "Lifestyle", tags: ["University", "Success"] },
  { id: 3, title: "Study Techniques", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800", category: "Innovation", tags: ["Study", "Learning"] },
  { id: 4, title: "Modern Classrooms", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800", category: "Education", tags: ["Design", "Tech"] },
  { id: 5, title: "Digital Literacy", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", category: "Education", tags: ["Tech", "Learning"] },
  { id: 6, title: "University Growth", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", category: "University", tags: ["Future", "Success"] },
  { id: 7, title: "Digital Literacy", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", category: "Education", tags: ["Tech", "Learning"] },
  { id: 8, title: "University Growth", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", category: "University", tags: ["Future", "Success"] },

]

const BlogPreview = () => {
  const [displayBlogs, setDisplayBlogs] = useState(BLOGS.slice(0, 3))

  // Shuffling logic every 10 seconds
  useEffect(() => {
    const shuffle = () => {
      const shuffled = [...BLOGS].sort(() => 0.5 - Math.random())
      setDisplayBlogs(shuffled.slice(0, 3))
    }

    const interval = setInterval(shuffle, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="flex w-full justify-center md:justify-start text-center md:text-left">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter uppercase mb-2">
            Our Latest Stories <br />
            <span className="text-[#1e3a5f] dark:text-blue-400">And News</span>
          </h2>
        </div>
        
        <div className="w-full flex md:justify-end justify-center">
        <Link to="/blogs" className="">
          <button className="bg-[#1e3a5f] items-center justify-between hover:bg-blue-900 text-white rounded-xl px-10 py-5 h-auto flex gap-3 font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20">
            <span>See All</span> <ChevronRightCircleIcon size={20} />
          </button>
        </Link>
        </div>
      </div>

      {/* Grid Layout inspired by screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        <AnimatePresence mode="wait">
          {/* Main Featured Card (Large Left) */}
          <motion.div 
            key={`main-${displayBlogs[0].id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 group relative flex flex-col bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={displayBlogs[0].image} 
                alt={displayBlogs[0].title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-10 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tighter">
                  {displayBlogs[0].title}
                </h3>
                <Link to={`/blogs/${displayBlogs[0].id}`}>
                   <div className="p-3 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                     <ChevronRight size={24} />
                   </div>
                </Link>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md">
                Their Feedback Reflects Our Commitment To Quality, Reliability, And Excellence.
              </p>
            </div>
          </motion.div>

          {/* Side Column (Two stacked cards) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {displayBlogs.slice(1, 3).map((blog, idx) => (
              <motion.div
                key={`side-${blog.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                        Their Feedback Reflects Our Commitment To Quality, Reliability, And Excellence.
                      </p>
                    </div>
                    <Link to={`/blogs/${blog.id}`}>
                      <div className="p-2 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default BlogPreview