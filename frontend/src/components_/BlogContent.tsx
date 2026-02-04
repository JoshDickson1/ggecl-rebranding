import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { 
  Search, List, LayoutGrid, ChevronRight, 
  Link as LinkIcon, X, ArrowLeft, ArrowRight 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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

const CATEGORIES = ["University", "Education", "Lifestyle", "Innovation"]
const TAGS = ["Design", "Study", "Future", "Learning", "Tech", "Success"]
const ITEMS_PER_PAGE = 4

export function BlogContent() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BLOGS.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [])

  const filteredBlogs = useMemo(() => {
    setCurrentPage(1)
    return BLOGS.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory ? blog.category === selectedCategory : true
      const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [searchQuery, selectedCategory, selectedTag])

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE)
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setSearchQuery("")
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 15 }} // Subtle X-axis enter
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }} // Subtle X-axis exit
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full h-92 md:h-[300px] md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] group border border-slate-200 dark:border-slate-800 shadow-lg"
            >
              <Link to={`/blogs/${BLOGS[currentIndex].id}`}>
                <img 
                  src={BLOGS[currentIndex].image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Featured" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                  <Badge className="w-max mb-4 bg-white text-[#1e3a5f] hover:bg-white uppercase tracking-widest font-bold">
                    Featured Article
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
                    {BLOGS[currentIndex].title}
                  </h2>
                  <p className="text-slate-200 hidden md:block max-w-xl">
                    Our commitment to quality, reliability, and excellence reflects in every research piece.
                  </p>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              {(selectedCategory || selectedTag) ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-500">Filters:</span>
                  {selectedCategory && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 gap-1 pr-1">
                      {selectedCategory}
                      <X size={14} className="cursor-pointer" onClick={() => setSelectedCategory(null)} />
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 gap-1 pr-1">
                      #{selectedTag}
                      <X size={14} className="cursor-pointer" onClick={() => setSelectedTag(null)} />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">Clear All</Button>
                </div>
              ) : (
                <h2 className="text-xl font-bold dark:text-white uppercase tracking-tight">Showing {filteredBlogs.length} posts</h2>
              )}
            </div>

            <div className="flex gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
               <Button 
                variant={view === "list" ? "default" : "ghost"} 
                size="icon" 
                onClick={() => setView("list")} 
                className={cn("rounded-lg h-9 w-9", view === "list" && "bg-[#1e3a5f]")}
               >
                 <List size={18} />
               </Button>
               <Button 
                variant={view === "grid" ? "default" : "ghost"} 
                size="icon" 
                onClick={() => setView("grid")} 
                className={cn("rounded-lg h-9 w-9", view === "grid" && "bg-[#1e3a5f]")}
               >
                 <LayoutGrid size={18} />
               </Button>
            </div>
          </div>

          <div className={cn("grid gap-8", view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <AnimatePresence mode="popLayout">
              {paginatedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className={cn(
                    "group bg-white dark:bg-slate-900 rounded-[2rem] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300",
                    view === "list" && "flex flex-col md:flex-row h-full md:min-h-60"
                  )}
                >
                  <Link to={`/blogs/${blog.id}`} className={cn("relative overflow-hidden", view === "list" ? "md:w-2/5 h-60 md:h-auto" : "h-60")}>
                    <img src={blog.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                    <Badge className="absolute top-4 left-4 bg-[#1e3a5f] border-none uppercase text-[10px]">{blog.category}</Badge>
                  </Link>

                  <div className="p-7 flex flex-col justify-between flex-1">
                    <div>
                      {/* Tags are now explicitly kept here to show in both Grid & List */}
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {blog.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">#{tag}</span>
                        ))}
                      </div>
                      <Link to={`/blogs/${blog.id}`}>
                        <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-blue-400 transition-colors uppercase leading-tight">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        Their feedback reflects our commitment to quality, reliability, and excellence across the globe.
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Jan 28, 2026</span>
                      <Link to={`/blogs/${blog.id}`} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#1e3a5f] dark:text-blue-400 group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 pt-10">
              <Button 
                variant="outline" size="icon" disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)} className="rounded-full h-10 w-10"
              >
                <ArrowLeft size={18} />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i} variant={currentPage === i + 1 ? "default" : "ghost"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn("rounded-full h-10 w-10 font-bold", currentPage === i + 1 ? "bg-[#1e3a5f] hover:bg-[#1e3a5f]" : "text-slate-500")}
                >
                  {i + 1}
                </Button>
              ))}
              <Button 
                variant="outline" size="icon" disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)} className="rounded-full h-10 w-10"
              >
                <ArrowRight size={18} />
              </Button>
            </div>
          )}
        </div>

        <aside className="lg:w-80 space-y-8">
          <div className="relative group">
            <Input 
              placeholder="Search articles..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 py-7 rounded-2xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#1e3a5f]/20 transition-all" 
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1e3a5f] p-2.5 rounded-xl text-white shadow-lg">
              <Search size={18} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg dark:text-white uppercase tracking-tight">Category</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat} onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group",
                    selectedCategory === cat ? "bg-[#1e3a5f] border-[#1e3a5f] text-white shadow-md shadow-[#1e3a5f]/30" : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <div className={cn("p-2 rounded-lg transition-colors", selectedCategory === cat ? "bg-white/20 text-white" : "bg-[#1e3a5f] text-white")}>
                    <LinkIcon size={16} />
                  </div>
                  <span className="font-bold text-sm tracking-wide">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-lg dark:text-white uppercase tracking-tight">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span 
                  key={tag} onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase tracking-wider",
                    selectedTag === tag ? "bg-[#1e3a5f] text-white shadow-lg shadow-[#1e3a5f]/20" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}