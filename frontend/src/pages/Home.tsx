import BlogPreview from "@/components_/BlogPreview"
import CTA from "@/components_/CTA"
import FAQ from "@/components_/FAQ"
import Hero from "@/components_/Hero"
import ServicesSlider from "@/components_/ServicesSlider"
import StudyPrograms from "@/components_/StudyPrograms"
import SubHero from "@/components_/SubHero"

const Home = () => {
  return (
    <div>
      <div className="">
        <Hero />
      </div>
      <div className="">
        <SubHero />
      </div>
      <div className="">
        <ServicesSlider />
      </div>
      <div className="">
        <StudyPrograms />
      </div>

      <div className="">
        <BlogPreview />
      </div>
      <div className="">
        <FAQ />
      </div>
      <div className="">
        <CTA />
      </div>
    </div>
  )
}

export default Home