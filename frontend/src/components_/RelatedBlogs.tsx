import { useGetAllPosts } from "@/hooks/useBlog"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight, Loader2 } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

interface RelatedBlogsProps {
  currentCategoryId?: string;
  excludeId?: string;
}

const RelatedBlogs = ({ currentCategoryId, excludeId }: RelatedBlogsProps) => {
  const [displayedBlogs, setDisplayedBlogs] = useState<any[]>([])

  // Fetch posts from the service
  // We fetch a slightly larger pool (e.g., 10) to shuffle from
  const { data, isLoading } = useGetAllPosts({
    search: currentCategoryId, // Use the category name as a search term for "related"
    limit: "10",
    status: "published"
  })

  // Filter out the current post and prepare the pool
  const pool = useMemo(() => {
    if (!data?.posts) return []
    return data.posts.filter(post => post.id !== excludeId)
  }, [data, excludeId])

  const shuffleBlogs = useCallback(() => {
    if (pool.length === 0) return
    
    // Shuffle the pool and pick the top 3
    const shuffled = [...pool].sort(() => 0.5 - Math.random())
    setDisplayedBlogs(shuffled.slice(0, 3))
  }, [pool])

  // Initial set when pool is loaded
  useEffect(() => {
    if (pool.length > 0) {
      shuffleBlogs()
    }
  }, [pool, shuffleBlogs])

  // Periodic shuffle every 10 seconds for visual flair
  useEffect(() => {
    if (pool.length > 3) {
      const interval = setInterval(shuffleBlogs, 10000)
      return () => clearInterval(interval)
    }
  }, [pool.length, shuffleBlogs])

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
      </div>
    )
  }

  if (pool.length === 0) return null

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
              <Link to={`/blogs/${post.slug}`} className="relative h-48 overflow-hidden">
                <img 
                  src={post.featured_image_url || "/placeholder-blog.jpg"} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={post.title} 
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1e3a5f] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
                    {post.seo_keywords?.[0] || "Blog"}
                  </span>
                </div>
              </Link>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <Link to={`/blogs/${post.slug}`}>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-[#1e3a5f] dark:group-hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-2">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-sm text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                    {post.excerpt || "Explore our latest insights and stories regarding this topic."}
                  </p>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}
                  </span>
                  <Link 
                    to={`/blogs/${post.slug}`}
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