import { NavLink, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck 
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { name: "Manage Blogs", path: "/admin/blogs", icon: <FileText size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ]

  return (
    <aside 
      className={`
        ${isOpen ? "w-64" : "w-0 opacity-0 -translate-x-full"} 
        transition-all duration-300 ease-in-out border-r bg-card flex flex-col h-screen overflow-hidden
      `}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b shrink-0">
        <div className="flex items-center gap-2 min-w-[150px]">
          <div className="bg-primary p-1.5 rounded-lg">
            <ShieldCheck className="text-primary-foreground" size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight whitespace-nowrap">
            Admin<span className="text-primary">Core</span>
          </span>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 whitespace-nowrap">
          Main Menu
        </p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2.5 rounded-md transition-all group whitespace-nowrap
              ${isActive 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}
            `}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t bg-muted/30">
        <button 
          onClick={() => navigate("/admin/logout")}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors whitespace-nowrap"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar