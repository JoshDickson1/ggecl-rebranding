import AboutSect from "@/components_/AboutSect"
import CTA from "@/components_/CTA"
import FAQ from "@/components_/FAQ"
import MisVis from "@/components_/MisVis"
import { PageHero } from "@/components_/PageHero"
import ServicesSlider from "@/components_/ServicesSlider"
import Team from "@/components_/Team"

const About = () => {
  return (
    <div>
      <div className="">
        <PageHero
          title="About Us"
          backgroundImage="/otherhero.svg"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About Us" },
          ]}
        />
      </div>

      <div className="">
        <AboutSect />
      </div>

      <div className="">
        <MisVis />
      </div>

      <div className="">
        <ServicesSlider />
      </div>

      <div className="">
        <Team />
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

export default About