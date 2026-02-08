import { useParams } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHero } from "@/components_/PageHero"
import RelatedBlogs from "./RelatedBlogs"
import CTA from "./CTA"
import { Calendar, User, Tag, ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react"
import { NotFound } from "@/pages/NotFound"

// Import the hook from your service
import { useGetPostBySlug } from "@/hooks/useBlog"

const SingleBlogPage = () => {
  const { id } = useParams<{ id: string }>() // This 'id' is actually the slug from the URL
  
  // Use TanStack Query to fetch the post by slug
  const { data, isLoading, isError } = useGetPostBySlug(id || "")
  
  const [open, setOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-[#1e3a5f]" />
      </div>
    )
  }

  // Error or Not Found State
  if (isError || !data?.post) return <NotFound />

  const blog = data.post

  // In your new service, images might be separate or just the featured one.
  // We'll create an array for the gallery. If 'og_image_url' exists, we'll use it too.
  const galleryImages = [
    blog.featured_image_url,
    blog.og_image_url,
  ].filter(Boolean) as string[]

  const nextImage = () =>
    setActiveImage(i => (i + 1) % galleryImages.length)

  const prevImage = () =>
    setActiveImage(i => (i - 1 + galleryImages.length) % galleryImages.length)

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero
        title={blog.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="md:max-w-[94%] max-w-[99%] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12"
      >
        <article className="flex-1">
          {/* Main Image */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => {
              if (galleryImages.length > 0) {
                setActiveImage(0)
                setOpen(true)
              }
            }}
            className="cursor-zoom-in rounded-3xl h-full md:h-[500px] w-full overflow-hidden mb-8 aspect-video border border-slate-100 dark:border-slate-800"
          >
            <img 
              src={blog.featured_image_url || "/placeholder-blog.jpg"} 
              className="w-full h-full object-cover" 
              alt={blog.title}
            />
          </motion.div>

          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm font-medium border-y py-4 border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-[#1e3a5f]" /> 
                {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : "Draft"}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-[#1e3a5f]" /> 
                { "GGEC"}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} className="text-[#1e3a5f]" /> 
                {blog.seo_keywords?.[0] || "General"}
              </span>
            </div>

            {/* Render the HTML content from the Service */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:text-slate-900 dark:prose-headings:text-white
                prose-p:text-slate-600 dark:prose-p:text-slate-400
                prose-strong:text-[#1e3a5f] dark:prose-strong:text-blue-400"
              dangerouslySetInnerHTML={{ __html: blog.content }} 
            />

            {/* Dual/Gallery Image Section (if more than 1 image exists) */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {galleryImages.slice(1).map((img, i) => (
                  <motion.img
                    key={img}
                    src={img}
                    onClick={() => {
                      setActiveImage(i + 1)
                      setOpen(true)
                    }}
                    whileHover={{ scale: 1.03 }}
                    className="rounded-2xl h-64 w-full object-cover cursor-zoom-in border border-slate-100 dark:border-slate-800"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Related */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Related Blogs
            </h2>
            {/* Pass current blog info to RelatedBlogs to filter out current post */}
            <RelatedBlogs currentCategoryId={blog.seo_keywords?.[0]} excludeId={blog.id} />
          </div>
        </article>
      </motion.div>

      <div className="py-10">
        <CTA />
      </div>

      {/* IMAGE DIALOG (LIGHTBOX) */}
      <AnimatePresence>
        {open && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          >
            <motion.img
              key={activeImage}
              src={galleryImages[activeImage]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-full rounded-lg shadow-2xl"
            />

            {/* Controls */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
            
            <div className="absolute bottom-6 text-white/60 text-sm font-medium">
              {activeImage + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SingleBlogPage