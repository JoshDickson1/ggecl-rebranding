// import { motion } from "framer-motion";
import { PageHero } from "@/components_/PageHero";
import RelatedBlogs from "./RelatedBlogs";
import { Calendar, User, Tag } from "lucide-react";

const SingleBlogPage = () => {
  // In a real app, use useParams() to fetch blog data
  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <PageHero 
        title="Title of the Blog" 
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blogs", href: "/blogs" }, { label: "Detail" }]} 
      />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <article className="flex-1">
          {/* Main Image */}
          <div className="rounded-3xl overflow-hidden mb-8 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1523050335392-9befafa56bfb?w=1200" 
              className="w-full h-full object-cover" 
              alt="Header" 
            />
          </div>

          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">TITLE OF THE BLOG</h1>
            
            <div className="flex gap-6 text-sm font-medium border-y py-4 border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-2"><Calendar size={16} /> Jan 28, 2026</span>
              <span className="flex items-center gap-2"><User size={16} /> Admin</span>
              <span className="flex items-center gap-2"><Tag size={16} /> Education</span>
            </div>

            <p>
              A blog is a frequently updated, informational website or section of a site featuring informal, 
              article-style entries known as posts, usually displayed in reverse chronological order.
            </p>

            {/* Custom Blockquote from your screenshot */}
            <div className="relative bg-[#1e3a5f] text-white p-8 md:p-12 rounded-3xl my-10 overflow-hidden">
               <span className="absolute top-4 left-6 text-6xl opacity-20 font-serif">“</span>
               <p className="relative z-10 text-xl italic font-medium">
                 A blog is a frequently updated, informational website... They are used for personal expression, 
                 professional branding, or business marketing.
               </p>
               <span className="absolute bottom-2 right-6 text-6xl opacity-20 font-serif">”</span>
            </div>

            <p>
              They are used for personal expression, professional branding, or business marketing, 
              covering topics like technology, travel, or niche hobbies.
            </p>

            {/* Dual Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <img src="https://images.unsplash.com/photo-1541339907198-e087563ef3f5?w=600" className="rounded-2xl h-64 w-full object-cover" alt="Detail 1" />
              <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600" className="rounded-2xl h-64 w-full object-cover" alt="Detail 2" />
            </div>

            <p>
               A blog is a frequently updated, informational website or section of a site featuring informal, 
               article-style entries known as posts.
            </p>
          </div>

          {/* Related Blogs Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Related Blogs</h2>
            <RelatedBlogs />
          </div>
        </article>

        {/* Sidebar would go here (same as Blog page) */}
      </div>
    </div>
  );
};

export default SingleBlogPage;