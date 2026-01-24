import { useEffect, useState } from "react"
import { Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Hidden on scroll */}
      <div 
        className={`bg-[#1e3a5f] px-10 text-white py-2 px-6 flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isAtTop ? "h-10 opacity-100" : "h-0 opacity-0"
        }`}
      >
        <div className="flex items-center gap-6 text-xs font-light">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-blue-300" />
            <span>+44 (0) 330 113 7424</span>
          </div>
          <div className="md:flex hidden items-center gap-2">
            <MapPin size={14} className="text-blue-300" />
            <span>148 Rose Bowl, Portland Crescent, United Kingdom.</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Facebook size={16} className="cursor-pointer hover:text-blue-300" />
          <Instagram size={16} className="cursor-pointer hover:text-blue-300" />
          <Twitter size={16} className="cursor-pointer hover:text-blue-300" />
          <Linkedin size={16} className="cursor-pointer hover:text-blue-300" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white px-10 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          {/* Replace with your actual logo img */}
          <div className="w-20 h-20 dark:bg-zinc-200 bg-zinc-100 rounded-full flex items-center justify-center border-2 border-blue-900 overflow-hidden">
             <img src="/ggecl_logo.png" alt="Golden Goshen Education Consultancy (GGECL) Logo" className="w-30 h-30 object-contain" />
          </div>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300 font-medium">
          <li className="hover:text-blue-900 dark:hover:text-white cursor-pointer transition-colors">Home</li>
          <li className="hover:text-blue-900 dark:hover:text-white cursor-pointer transition-colors">About</li>
          <li className="hover:text-blue-900 dark:hover:text-white cursor-pointer transition-colors">Services</li>
          <li className="hover:text-blue-900 dark:hover:text-white cursor-pointer transition-colors">Blogs</li>
          <li className="hover:text-blue-900 dark:hover:text-white cursor-pointer transition-colors">Contact</li>
        </ul>

        <div className="flex items-center gap-4">
          <Search size={20} className="text-slate-500 cursor-pointer hover:text-blue-900" />
          <Button className="bg-[#1e3a5f] hover:bg-[#2a5288] text-white px-6 rounded-md">
            Get Started
          </Button>
        </div>
      </nav>
    </header>
  )
}