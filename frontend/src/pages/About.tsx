import { PageHero } from "@/components_/PageHero"

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
    </div>
  )
}

export default About