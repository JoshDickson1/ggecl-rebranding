import { Search, Bell, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "@/theme-provider"

interface NavbarProps {
  toggleSidebar: () => void
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Sidebar Toggler */}
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Menu size={20} />
        </button>

        <div className="hidden md:flex items-center relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full bg-muted/50 pl-9 pr-4 py-2 rounded-md text-sm outline-none transition-all focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="p-2 hover:bg-accent rounded-full relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="w-[1px] h-6 bg-border mx-1"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block leading-tight">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-[10px] text-muted-foreground uppercase">Super Admin</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar