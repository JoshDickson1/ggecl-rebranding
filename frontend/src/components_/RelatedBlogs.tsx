import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
// import { cn } from "@/lib/utils"

// A larger pool of blogs to shuffle from
const ALL_BLOGS = [
  { id: 1, title: "Modern Campus Tech", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400", category: "Tech" },
  { id: 2, title: "Student Success Stories", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400", category: "Education" },
  { id: 3, title: "Learning in 2026", image: "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?w=400", category: "Future" },
  { id: 4, title: "Digital Research", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400", category: "Innovation" },
  { id: 5, title: "Global Connectivity", image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400", category: "University" },
  { id: 6, title: "Classroom Design", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400", category: "Design" },
]

const RelatedBlogs = () => {
  const [displayedBlogs, setDisplayedBlogs] = useState(ALL_BLOGS.slice(0, 3))

  const shuffleBlogs = useCallback(() => {
    // Shuffle algorithm (Fisher-Yates)
    const shuffled = [...ALL_BLOGS].sort(() => 0.5 - Math.random())
    setDisplayedBlogs(shuffled.slice(0, 3))
  }, [])

  useEffect(() => {
    const interval = setInterval(shuffleBlogs, 10000)
    return () => clearInterval(interval)
  }, [shuffleBlogs])

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {displayedBlogs.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <Link to={`/blogs/${post.id}`} className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1e3a5f] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </Link>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <Link to={`/blogs/${post.id}`}>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#1e3a5f] dark:group-hover:text-blue-400 transition-colors uppercase leading-tight">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                    Their feedback reflects our commitment to quality, reliability, and excellence.
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <Link 
                    to={`/blogs/${post.id}`}
                    className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-[#1e3a5f] dark:text-blue-400 hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RelatedBlogs