import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Breadcrumb = {
  label: string
  href?: string
}

type PageHeroProps = {
  title: string
  backgroundImage: string
  breadcrumbs: Breadcrumb[]
  className?: string
}

export function PageHero({
  title,
  backgroundImage,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative h-[360px] w-full overflow-hidden",
        className
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end px-6 pb-0 md:px-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            {title}
          </h1>

          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2 rounded-t-md bg-background px-4 py-2 text-sm font-medium text-gray-800">
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-primary hover:underline"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-zinc-500">{crumb.label}</span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
