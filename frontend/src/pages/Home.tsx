import BlogPreview from "@/components_/BlogPreview"
import CTA from "@/components_/CTA"
import ServicesSlider from "@/components_/ServicesSlider"
import StudyPrograms from "@/components_/StudyPrograms"

const Home = () => {
  return (
    <div>
      
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
        <CTA />
      </div>
    </div>
  )
}

export default Home