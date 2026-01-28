import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Breadcrumb = {
  label: string
  href?: string
}

type PageHeroProps = {
  title: string;
  // backgroundImage is kept in props to avoid breaking types, but we won't use it for the bg
  backgroundImage?: string; 
  breadcrumbs: Breadcrumb[];
  className?: string;
}

export function PageHero({
  title,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative h-[400px] mt-10 md:mt-20 w-full overflow-hidden bg-black",
        className
      )}
    >

  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#0f172a",
      backgroundImage: `
        linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
      
      {/* Radial Gradient for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />

      {/* Centered Title */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl text-center tracking-tight">
          {title}
        </h1>
      </div>

      {/* Breadcrumbs - Positioned at the bottom */}
      <div className="relative z-10 flex h-full items-end px-6 md:px-12">
        <div className="inline-flex items-center gap-2 rounded-t-lg bg-white dark:bg-slate-950 px-5 py-2.5 text-sm font-medium shadow-lg">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-2">
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="text-blue-600 dark:text-blue-400 hover:underline transition-all"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">{crumb.label}</span>
              )}

              {index < breadcrumbs.length - 1 && (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}