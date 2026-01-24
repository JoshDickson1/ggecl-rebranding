import { PageHero } from "@/components_/PageHero"
import { ModeToggle } from "@/mode-toggle"

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
        <ModeToggle />
      </div>
    </div>
  )
}

export default About