import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronRightCircleIcon, Loader2 } from "lucide-react";
import { useGetAllPosts } from "@/hooks/useBlog"; // Path to your hook
// import { cn } from "@/lib/utils";

const BlogPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch only the latest 6 posts to use for shuffling/preview
  const { data, isLoading, isError } = useGetAllPosts({
    limit: "6",
    status: "published",
  });

  const blogs = data?.posts || [];

  // Rotation logic: Pick 3 blogs starting from a rotating index
  // This creates a "fresh" look every 10 seconds without heavy shuffling
  useEffect(() => {
    if (blogs.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % (blogs.length - 2));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [blogs.length]);

  const displayBlogs = blogs.slice(currentIndex, currentIndex + 3);

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  if (isError || blogs.length === 0) return null;

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
          <Link to="/blogs">
            <button className="bg-[#1e3a5f] items-center justify-between hover:bg-blue-900 text-white rounded-xl px-10 py-5 h-auto flex gap-3 font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all active:scale-95">
              <span>See All</span> <ChevronRightCircleIcon size={20} />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        <AnimatePresence mode="wait">
          {/* Main Featured Card (Large Left) */}
          {displayBlogs[0] && (
            <motion.div
              key={`main-${displayBlogs[0].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="lg:col-span-7 group relative flex flex-col bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={displayBlogs[0].featured_image_url || "/placeholder-blog.jpg"}
                  alt={displayBlogs[0].title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="p-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tighter">
                    {displayBlogs[0].title}
                  </h3>
                  <Link to={`/blogs/${displayBlogs[0].slug}`}>
                    <div className="p-3 rounded-full border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white group-hover:bg-[#1e3a5f] group-hover:text-white transition-all">
                      <ChevronRight size={24} />
                    </div>
                  </Link>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md line-clamp-2">
                  {displayBlogs[0].excerpt ||
                    "Our commitment to quality, reliability, and excellence reflects in every research piece."}
                </p>
              </div>
            </motion.div>
          )}

          {/* Side Column (Two stacked cards) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {displayBlogs.slice(1, 3).map((blog, idx) => (
              <motion.div
                key={`side-${blog.id}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={blog.featured_image_url || "/placeholder-blog.jpg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2 line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                        {blog.excerpt || "Discover our latest insights and educational updates."}
                      </p>
                    </div>
                    <Link to={`/blogs/${blog.slug}`} className="shrink-0">
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
  );
};

export default BlogPreview;