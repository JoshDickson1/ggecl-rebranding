import CTA from "@/components_/CTA"
import IELTSGrid from "@/components_/IELTSGrid"
import { PageHero } from "@/components_/PageHero"
import RegisterIELTS from "@/components_/RegisterIELTS"
import ServicesSlider from "@/components_/ServicesSlider"
import StudyPrograms from "@/components_/StudyPrograms"
import Why from "@/components_/Why"

const Services = () => {
  return (
    <div>
      <div className="">
        <PageHero
          title="Services"
          backgroundImage="/otherhero.svg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services" },
          ]}
        />
      </div>
      <div className="">
        <IELTSGrid />
      </div>
      <div className="">
        <ServicesSlider />
      </div>
      <div className="">
        <RegisterIELTS />
      </div>
      <div className="">
        <Why />
      </div>

      <div className="">
        <StudyPrograms />
      </div>

      <div className="">
        <CTA />
      </div>
    </div>
  )
}

export default Services