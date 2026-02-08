import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft, ArrowRight,
  ChevronRight,
  LayoutGrid,
  List,
  Loader2,
  Search,
  X
} from "lucide-react"
import { useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react"
import { Link } from "react-router-dom"

// Import the hooks from your blog service file
import { useGetAllPosts } from "@/hooks/useBlog"; // Adjust path as needed

// const CATEGORIES = ["University", "Education", "Lifestyle", "Innovation"]
const TAGS = ["Design", "Study", "Future", "Learning", "Tech", "Success"]
const ITEMS_PER_PAGE = 4

export function BlogContent() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Calculate offset for API pagination
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  // Fetch data from Service using TanStack Query
  const { data, isLoading, isError } = useGetAllPosts({
    search: searchQuery || undefined,
    limit: ITEMS_PER_PAGE.toString(),
    offset: offset.toString(),
    status: "published" // Assuming public view only wants published posts
  })

  const blogs = data?.posts || []
  const totalPosts = data?.total || 0
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE)

  // Featured carousel logic
  useEffect(() => {
    if (blogs.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % blogs.length)
      }, 10000)
      return () => clearInterval(timer)
    }
  }, [blogs.length])

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedTag(null)
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="flex h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#1e3a5f]" />
      </div>
    )
  }

  // Handle Error State
  if (isError) {
    return (
      <div className="flex h-[60vh] w-full flex-col items-center justify-center space-y-4">
        <p className="text-xl font-semibold text-red-500">Failed to load blog posts.</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          
          {/* Featured Post Hero */}
          {blogs.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-92 md:h-[300px] md:aspect-[21/9] overflow-hidden rounded-[2rem] group border border-slate-200 dark:border-slate-800 shadow-lg"
              >
                <Link to={`/blogs/${blogs[currentIndex].slug}`}>
                  <img 
                    src={blogs[currentIndex].featured_image_url || "/placeholder-blog.jpg"} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt="Featured" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/90 via-transparent to-transparent flex flex-col justify-end p-8 md:p-12">
                    <Badge className="w-max mb-4 bg-white text-[#1e3a5f] hover:bg-white uppercase tracking-widest font-bold">
                      Featured Article
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
                      {blogs[currentIndex].title}
                    </h2>
                    <p className="text-slate-200 hidden md:block max-w-xl">
                      {blogs[currentIndex].excerpt || "Our commitment to quality, reliability, and excellence reflects in every research piece."}
                    </p>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Filter Indicators & View Switcher */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              {(selectedCategory || selectedTag || searchQuery) ? (
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
                  {searchQuery && (
                    <Badge variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 gap-1 pr-1">
                      Search: {searchQuery}
                      <X size={14} className="cursor-pointer" onClick={() => setSearchQuery("")} />
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-7">Clear All</Button>
                </div>
              ) : (
                <h2 className="text-xl font-bold dark:text-white uppercase tracking-tight">Showing {totalPosts} posts</h2>
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

          {/* Blog Grid/List */}
          <div className={cn("grid gap-8", view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>
            <AnimatePresence mode="popLayout">
              {blogs.map((blog: { id: Key | null | undefined; slug: any; featured_image_url: any; seo_keywords: any[]; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; excerpt: any; published_at: string | number | Date }) => (
                <motion.div
                  layout
                  key={blog.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={cn(
                    "group bg-white dark:bg-slate-900 rounded-[2rem] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300",
                    view === "list" && "flex flex-col md:flex-row h-full md:min-h-60"
                  )}
                >
                  <Link to={`/blogs/${blog.slug}`} className={cn("relative overflow-hidden", view === "list" ? "md:w-2/5 h-60 md:h-auto" : "h-60")}>
                    <img src={blog.featured_image_url || "/placeholder-blog.jpg"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                    {/* Assuming category is a meta property or mapped from tags */}
                    <Badge className="absolute top-4 left-4 bg-[#1e3a5f] border-none uppercase text-[10px]">
                        {blog.seo_keywords?.[0] || "ARTICLE"}
                    </Badge>
                  </Link>

                  <div className="p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {blog.seo_keywords?.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400">#{tag}</span>
                        ))}
                      </div>
                      <Link to={`/blogs/${blog.slug}`}>
                        <h3 className="text-xl font-bold mb-3 dark:text-white group-hover:text-[#1e3a5f] dark:group-hover:text-blue-400 transition-colors uppercase leading-tight">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {blog.excerpt || "Read more about this article and discover our latest insights and updates."}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                      </span>
                      <Link to={`/blogs/${blog.slug}`} className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#1e3a5f] dark:text-blue-400 group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="text-center py-20">
               <p className="text-slate-500">No blog posts found matching your criteria.</p>
               <Button variant="link" onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}

          {/* Pagination */}
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

        {/* Sidebar */}
        <aside className="lg:w-80 space-y-8">
          <div className="relative group">
            <Input 
              placeholder="Search articles..." value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="pl-4 pr-12 py-7 rounded-2xl border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-[#1e3a5f]/20 transition-all" 
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1e3a5f] p-2.5 rounded-xl text-white shadow-lg">
              <Search size={18} />
            </div>
          </div>

          {/* <div className="space-y-4">
            <h4 className="font-bold text-lg dark:text-white uppercase tracking-tight">Category</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map((cat) => (
                <div 
                  key={cat} onClick={() => {
                    setSelectedCategory(cat === selectedCategory ? null : cat);
                    setCurrentPage(1);
                  }}
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
          </div> */}

          <div className="space-y-4">
            <h4 className="font-bold text-lg dark:text-white uppercase tracking-tight">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span 
                  key={tag} onClick={() => {
                    setSelectedTag(tag === selectedTag ? null : tag);
                    setCurrentPage(1);
                  }}
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