import { PageHero } from "@/components_/PageHero"

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
    </div>
  )
}

export default Services