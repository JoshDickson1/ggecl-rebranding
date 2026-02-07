import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ShieldCheck,
  ClipboardList,
  PlusCircle,
  Eye,
  ChevronDown
} from "lucide-react"
import { useAuth } from "@/AuthProvider" // Ensure this path is correct

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Assuming your AuthProvider has a logout function
  const [isBlogsOpen, setIsBlogsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // 1. Clear session via Auth Provider if available
      if (logout) {
        await logout();
      }
      
      // 2. Clear local storage tokens manually as a fallback
      localStorage.removeItem("admin_token");
      localStorage.removeItem("sb-token"); // If using Supabase
      
      // 3. Redirect to login
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Fallback redirect
      navigate("/login");
    }
  };

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
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 whitespace-nowrap">
          Main Menu
        </p>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all whitespace-nowrap
            ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent"}
          `}
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/applications"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all whitespace-nowrap
            ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent"}
          `}
        >
          <ClipboardList size={18} />
          <span className="text-sm font-medium">Applications</span>
        </NavLink>

        <div className="space-y-1">
          <button
            onClick={() => setIsBlogsOpen(!isBlogsOpen)}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-all text-muted-foreground hover:bg-accent group whitespace-nowrap
              ${isBlogsOpen ? "text-foreground" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} />
              <span className="text-sm font-medium">Blogs</span>
            </div>
            <ChevronDown 
              size={14} 
              className={`transition-transform duration-200 ${isBlogsOpen ? "rotate-180" : ""}`} 
            />
          </button>

          <div className={`pl-9 space-y-1 overflow-hidden transition-all duration-300 ${isBlogsOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}>
            <NavLink
              to="/admin/blogs/add"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all
                ${isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <PlusCircle size={16} />
              <span>Add Blog</span>
            </NavLink>
            <NavLink
              to="/admin/blogs/view"
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all
                ${isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <Eye size={16} />
              <span>View Added</span>
            </NavLink>
          </div>
        </div>

        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-md transition-all whitespace-nowrap
            ${isActive ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-accent"}
          `}
        >
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </NavLink>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t bg-muted/30">
        <button 
          onClick={handleLogout}
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