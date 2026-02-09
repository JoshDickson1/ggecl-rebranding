import { useEffect, useState } from "react"
import {
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Search,
  PanelRight,
  X,
  Send,
  Youtube
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation style for the infinite scroll
  const marqueeStyle = {
    display: 'flex',
    whiteSpace: 'nowrap',
    animation: 'marquee 25s linear infinite',
  };

  return (
    <>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div
          className={`bg-[#1e3a5f] text-white transition-all duration-300 md:block hidden overflow-hidden ${
            isAtTop ? "h-10 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex justify-between items-center h-10 px-4 md:px-10 text-sm">
            {/* Infinite Scroll Container */}
            <div className="relative flex-1 overflow-hidden">
              <div style={marqueeStyle} className="flex items-center gap-20">
                {/* Set 1 */}
                <div className="flex items-center gap-10">
                  <span className="font-bold tracking-wider uppercase">Golden Goshen Educational Consultancy limited  (GGECL)</span>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-300" />
                    <span>+44 (0) 330 113 7424</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-300" />
                    <span>148 Rose Bowl, Portland Crescent, UK</span>
                  </div>
                </div>
                {/* Duplicate Set for Seamless Loop */}
                <div className="flex items-center gap-10">
                  <span className="font-bold tracking-wider uppercase">Golden Goshen Educational Consultancy limited (GGECL)</span>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-300" />
                    <span>+44 (0) 330 113 7424</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-blue-300" />
                    <span>148 Rose Bowl, Portland Crescent, UK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Social Icons */}
            <div className="flex gap-4 ml-6 pl-6 bg-[#1e3a5f] z-10">
              <a href="https://facebook.com/ggecl" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><Facebook size={16} /></a>
              <a href="https://instagram.com/ggecl" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><Instagram size={16} /></a>
              <a href="https://twitter.com/ggecl" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><Twitter size={16} /></a>
              <a href="https://linkedin.com/company/ggecl" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><Linkedin size={16} /></a>
              <a href="mailto:info@ggecl.com" className="hover:text-blue-300 transition-colors"><Send size={16} /></a>
              <a href="https://youtube.com/@ggecl" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-colors"><Youtube size={16} /></a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 md:px-10 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center bg-zinc-100 p-0 border-2 border-[#1e3a5f]/50 rounded-full transition-transform hover:scale-105">
              <img
                src="/ggecl_logo.png"
                alt="GGECL Logo"
                className="h-14 w-14 md:h-20 md:w-20 object-contain"
              />
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-8 text-slate-600 dark:text-slate-300 font-medium">
              <Link to="/" className="hover:text-[#1e3a5f] transition-colors">Home</Link>
              <Link to="/about" className="hover:text-[#1e3a5f] transition-colors">About</Link>
              <Link to="/services" className="hover:text-[#1e3a5f] transition-colors">Services</Link>
              <Link to="/blogs" className="hover:text-[#1e3a5f] transition-colors">Blogs</Link>
              <Link to="/contact" className="hover:text-[#1e3a5f] transition-colors">Contact</Link>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-14">
              <Link to="/blogs" className="hover:text-[#1e3a5f] transition-colors">
                <Search size={20} className="text-slate-500 cursor-pointer hover:text-[#1e3a5f]" />
              </Link>
              <button 
                onClick={() => navigate("/apply/start")}
                className="h-13 px-10 text-white rounded-xl transition-all cursor-pointer bg-[#1e3a5f] hover:bg-[#2a5288] shadow-lg hover:shadow-blue-900/20 active:scale-95">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-800 dark:text-white"
              onClick={() => setMenuOpen(true)}
            >
              <PanelRight size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white/90 dark:bg-black/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          <button
            className="absolute top-6 right-6 text-zinc-900 dark:text-white hover:rotate-90 transition-transform"
            onClick={() => setMenuOpen(false)}
          >
            <X size={32} />
          </button>

          <div className="flex flex-col items-center gap-8 text-zinc-950 dark:text-white text-xl font-medium">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/blogs" onClick={() => setMenuOpen(false)}>Blogs</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            <div className="flex flex-col items-center gap-6 mt-6">
              <button 
                onClick={()=> window.open("https://docs.google.com/forms/d/e/1FAIpQLSdYbDNQn9zYvD0GQFNPI3HDEBchzR0H39IeFzW2JSuUuQOh7w/viewform", "_blank")}
                className="h-12 rounded-md px-10 bg-[#1e3a5f] text-white hover:bg-[#2a5288] transition-colors">
                Apply Now
              </button>
              
              <div className="flex gap-4 opacity-70">
                 <Facebook size={20} />
                 <Instagram size={20} />
                 <Linkedin size={20} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}