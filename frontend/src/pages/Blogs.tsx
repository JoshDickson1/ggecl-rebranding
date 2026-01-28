import CTA from "@/components_/CTA"
import { PageHero } from "@/components_/PageHero"
import { BlogContent } from "@/components_/BlogContent"
import SingleBlogPage from "@/components_/SingleBlogPage"

const Blogs = () => {
  return (
    <div className="bg-slate-50 dark:bg-black transition-colors duration-300">
      <PageHero
        title="Blogs"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blogs" },
        ]}
      />

      <BlogContent />

      <div className="mt-20">
        <CTA />
      </div>

      <div className="">
        <SingleBlogPage />
      </div>
    </div>
  )
}

export default Blogs