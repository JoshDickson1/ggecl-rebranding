import { useState, useEffect } from "react"
import { Scale, ChevronRight, ArrowUp, Printer } from "lucide-react"

const Terms = () => {
  const [activeSection, setActiveSection] = useState("introduction")
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll spy for active navigation
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        const top = section.offsetTop - 100
        if (window.scrollY >= top) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const content = [
    { id: "introduction", title: "Introduction", text: "Welcome to Golden Goshen Educational Consultancy. These terms govern your use of our website and services. By engaging with us, you confirm that you are at least 18 years of age or have parental consent to seek international educational counseling." },
    { id: "services", title: "Consultancy Services", text: "Our services include university selection, application processing, transcript evaluation guidance, and visa interview preparation. We do not provide legal advice or guarantee the outcome of any visa application." },
    { id: "obligations", title: "Client Obligations", text: "Clients must provide truthful, accurate, and complete documentation. Forging transcripts, bank statements, or identification is strictly prohibited and will result in immediate termination of service without refund." },
    { id: "liability", title: "Limitation of Liability", text: "Golden Goshen shall not be held liable for any delays caused by third-party institutions, embassies, or postal services. Our total liability is limited to the amount paid for our consultancy services." },
    { id: "termination", title: "Termination", text: "We reserve the right to terminate our relationship with any client who exhibits abusive behavior toward staff or fails to comply with the documentation requirements of their chosen institution." },
  ]

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#0B0F1A] min-h-screen font-serif">
      {/* Header Area */}
      <header className="bg-white dark:bg-slate-900 border-b md:py-35 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full mb-6">
            <Scale size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight text-slate-900 dark:text-white mb-4">
            Legal Terms of Service
          </h1>
          <p className="text-slate-500 font-sans uppercase text-xs tracking-[0.2em]">
            Effective Date: February 07, 2026 • Version 2.4
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Floating Sticky Navigation */}
          <aside className="lg:w-1/4 lg:sticky lg:top-40 h-fit space-y-8 font-sans">
            <div>
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                On this page
              </h4>
              <nav className="space-y-3">
                {content.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center text-sm transition-all ${
                      activeSection === item.id 
                      ? "text-slate-900 dark:text-white font-bold" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <ChevronRight 
                      size={14} 
                      className={`mr-2 transition-transform ${activeSection === item.id ? "opacity-100" : "opacity-0 -translate-x-2"}`} 
                    />
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white border-b-2 border-slate-900 dark:border-white pb-1 hover:opacity-70 transition-opacity"
            >
              <Printer size={14} /> PRINT DOCUMENT
            </button>
          </aside>

          {/* Main Content Area */}
          <main className="lg:w-3/4 space-y-16">
            {content.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20">
                <h2 className="text-2xl font-sans font-bold text-slate-900 dark:text-white mb-6">
                  {section.title}
                </h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {section.text}
                  </p>
                </div>
              </section>
            ))}

            <div className="pt-16 border-t border-slate-200 dark:border-slate-800">
              <div className="bg-slate-900 dark:bg-white p-8 rounded-2xl text-white dark:text-slate-900 font-sans">
                <h3 className="text-xl font-bold mb-2">Acceptance of Terms</h3>
                <p className="text-slate-300 dark:text-slate-600 text-sm leading-relaxed mb-6">
                  By clicking "Apply Now" or submitting any document to our consultancy, you agree to comply with all terms listed above. If you do not agree, please cease use of our services immediately.
                </p>
                <div className="text-[10px] uppercase tracking-widest opacity-60">
                  © 2026 Golden Goshen Educational Consultancy. All Rights Reserved.
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 bg-white dark:bg-slate-800 border shadow-lg rounded-full transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <ArrowUp size={20} className="text-slate-900 dark:text-white" />
      </button>
    </div>
  )
}

export default Terms