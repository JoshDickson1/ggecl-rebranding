import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const RELATED = [
  { id: 101, title: "Modern Campus Tech", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400", date: "Jan 10, 2026" },
  { id: 102, title: "Student Success Stories", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400", date: "Jan 15, 2026" },
  { id: 103, title: "Learning in 2026", image: "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?w=400", date: "Jan 20, 2026" },
]

const RelatedBlogs = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {RELATED.map((post) => (
        <motion.div 
          key={post.id}
          whileHover={{ y: -5 }}
          className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <img src={post.image} className="h-40 w-full object-cover" alt="" />
          <div className="p-4">
            <span className="text-xs text-blue-600 font-bold uppercase">{post.date}</span>
            <h4 className="font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">{post.title}</h4>
            <button className="mt-4 flex items-center gap-1 text-sm font-bold text-[#1e3a5f] dark:text-blue-400 hover:gap-2 transition-all">
              Read More <ChevronRight size={14} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default RelatedBlogs