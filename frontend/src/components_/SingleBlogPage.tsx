import { useParams } from "react-router-dom"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PageHero } from "@/components_/PageHero"
import RelatedBlogs from "./RelatedBlogs"
import CTA from "./CTA"
import { Calendar, User, Tag, ChevronLeft, ChevronRight, X } from "lucide-react"
import { blogs } from "@/data/Blogs"
import { NotFound } from "@/pages/NotFound"

const SingleBlogPage = () => {
  const { id } = useParams()
  const blog = blogs.find(b => b.id === Number(id))

  const [open, setOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  if (!blog) return <NotFound />

  const images = blog.images

  const nextImage = () =>
    setActiveImage(i => (i + 1) % images.length)

  const prevImage = () =>
    setActiveImage(i => (i - 1 + images.length) % images.length)

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
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setActiveImage(0)
              setOpen(true)
            }}
            className="cursor-zoom-in rounded-3xl h-full md:h-[400px] w-full overflow-hidden mb-8 aspect-video"
          >
            <img src={blog.image} className="w-full h-full object-cover" />
          </motion.div>

          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {blog.title}
            </h1>

            <div className="flex gap-6 text-sm font-medium border-y py-4 border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2">
                <Calendar size={16} /> {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={16} /> {blog.category}
              </span>
            </div>

            <p>{blog.content.intro}</p>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-[#1e3a5f] text-white p-8 md:p-12 rounded-3xl my-10 text-center"
            >
              <p className="text-xl italic font-medium">
                {blog.content.quote}
              </p>
            </motion.div>

            <p>{blog.content.outro}</p>

            {/* Dual Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              {images.map((img, i) => (
                <motion.img
                  key={img}
                  src={img}
                  onClick={() => {
                    setActiveImage(i)
                    setOpen(true)
                  }}
                  whileHover={{ scale: 1.03 }}
                  className="rounded-2xl h-64 w-full object-cover cursor-zoom-in"
                />
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">
              Related Blogs
            </h2>
            <RelatedBlogs />
          </div>
        </article>
      </motion.div>

      <div className="py-10">
        <CTA />
      </div>

      {/* IMAGE DIALOG */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          >
            <motion.img
              key={activeImage}
              src={images[activeImage]}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[80vh] max-w-[90vw] rounded-2xl"
            />

            {/* Controls */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-6 text-white"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-6 text-white"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SingleBlogPage
