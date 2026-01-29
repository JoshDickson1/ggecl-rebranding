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
  Youtube,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <div
          className={`bg-[#1e3a5f] text-white transition-all duration-300 overflow-hidden ${
            isAtTop ? "h-10 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="flex justify-between items-center h-10 px-4 md:px-10 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-300" />
                <span>+44 (0) 330 113 7424</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <MapPin size={14} className="text-blue-300" />
                <span>148 Rose Bowl, Portland Crescent, UK</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Facebook size={16} />
              <Instagram size={16} />
              <Twitter size={16} />
              <Linkedin size={16} />
              <Send size={16} />
              <Youtube size={16} />
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 md:px-10 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center bg-zinc-100 p-0 border-2 border-[#1e3a5f]/50 rounded-full">
              <img
                src="/ggecl_logo.png"
                alt="GGECL Logo"
                className="h-14 w-14 md:h-20 md:w-20 object-contain"
              />
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex gap-8 text-slate-600 dark:text-slate-300 font-medium">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/contact">Contact</Link>
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-14">
              <Search size={20} className="text-slate-500" />
              <button 
                onClick={()=> window.open("https://docs.google.com/forms/d/e/1FAIpQLSdYbDNQn9zYvD0GQFNPI3HDEBchzR0H39IeFzW2JSuUuQOh7w/viewform", "_blank")}
                className="h-13 px-10 text-white rounded-xl transition-color cursor-pointer bg-[#1e3a5f] hover:bg-[#2a5288]">
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <PanelRight size={28} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-white/60 dark:bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
          <button
            className="absolute top-6 right-6 text-zinc-900 dark:text-white"
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

            <div className="flex gap-6 mt-6">
              {/* <Search size={22} /> */}
              <Button 
                onClick={()=> window.open("https://docs.google.com/forms/d/e/1FAIpQLSdYbDNQn9zYvD0GQFNPI3HDEBchzR0H39IeFzW2JSuUuQOh7w/viewform", "_blank")}
                className="h-12 px-8 bg-[#1e3a5f] text-white hover:bg-[#2a5288]">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
