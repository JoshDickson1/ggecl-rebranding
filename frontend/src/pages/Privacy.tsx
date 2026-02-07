import { useState, useEffect } from "react"
import { Lock, Eye, ShieldCheck, Database, ArrowUp, Printer, ChevronRight } from "lucide-react"

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("collection")
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        const top = section.offsetTop - 100
        if (window.scrollY >= top) setActiveSection(section.id)
      })
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const sections = [
    { 
      id: "collection", 
      title: "Data Collection", 
      icon: <Database size={18} />,
      text: "We collect personal information necessary for your educational applications, including your name, contact details, academic transcripts, international passport copies, and financial statements. This data is collected through our secure application portal." 
    },
    { 
      id: "usage", 
      title: "How We Use Data", 
      icon: <Eye size={18} />,
      text: "Your information is used strictly to process university admissions, provide visa counseling, and communicate updates regarding your application status. We may also use anonymized data to improve our consultancy services." 
    },
    { 
      id: "security", 
      title: "Data Security", 
      icon: <ShieldCheck size={18} />,
      text: "We implement industry-standard AES-256 encryption for all uploaded documents. Access to your sensitive information is restricted to authorized counselors and administrative staff directly involved in your case." 
    },
    { 
      id: "retention", 
      title: "Retention Policy", 
      icon: <Lock size={18} />,
      text: "We retain your information for as long as necessary to fulfill the application process. Upon successful admission or at your request, you may ask for the permanent deletion of your physical and digital records." 
    }
  ]

  return (
    <div className="bg-[#FDFDFD] dark:bg-[#080B14] min-h-screen font-serif text-slate-900 dark:text-slate-100 md:pt-20">
      {/* Editorial Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl mb-8">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-sans max-w-2xl mx-auto text-lg leading-relaxed">
            At Golden Goshen, your privacy is our priority. We are committed to protecting the sensitive documentation you entrust to us.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 font-sans text-xs font-bold tracking-widest text-slate-400 uppercase">
            <span>Published: Feb 2026</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full" />
            <span>Ref: GG-PL-001</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-52">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Navigation Sidebar */}
          <aside className="lg:w-1/4 lg:sticky lg:top-40 h-fit space-y-10 font-sans">
            <div>
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8">
                Policy Outline
              </h4>
              <nav className="space-y-4">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`group flex items-center text-sm transition-all duration-300 ${
                      activeSection === item.id 
                      ? "text-blue-600 font-bold translate-x-2" 
                      : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <ChevronRight 
                      size={14} 
                      className={`mr-2 transition-opacity ${activeSection === item.id ? "opacity-100" : "opacity-0"}`} 
                    />
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Need a physical copy for your records or embassy submission?
              </p>
              <button 
                onClick={() => window.print()}
                className="w-full py-3 bg-white dark:bg-slate-800 border shadow-sm rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Printer size={14} /> Download PDF
              </button>
            </div>
          </aside>

          {/* Policy Content */}
          <main className="lg:w-3/4 space-y-24">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-6 font-sans">
                    <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                        {section.icon}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">
                        {section.title}
                    </h2>
                </div>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                    {section.text}
                  </p>
                </div>
              </section>
            ))}

            {/* Visual Callout for Consent */}
            <div className="bg-blue-600 rounded-[2rem] p-10 md:p-14 text-white font-sans relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                    <h3 className="text-3xl font-bold mb-4">Your Rights & Consent</h3>
                    <p className="text-blue-100 text-lg leading-relaxed mb-8">
                        By using our portal, you consent to the processing of your data as described. You retain the right to access, rectify, or withdraw your documents at any time.
                    </p>
                    {/* <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-sm hover:shadow-xl transition-all">
                            Request Data Access
                        </button>
                        <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-400 transition-all border border-blue-400">
                            Privacy FAQ
                        </button>
                    </div> */}
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-black/10 rounded-full blur-2xl" />
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 p-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 shadow-2xl rounded-2xl transition-all duration-500 hover:scale-110 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <ArrowUp size={24} className="text-blue-600" />
      </button>
    </div>
  )
}

export default Privacy