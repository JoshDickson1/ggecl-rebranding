import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, ChevronRight, User, Globe, AlertCircle, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useAuth } from "@/AuthProvider"
import { cn } from "@/lib/utils"

// Base URL from API Documentation [cite: 7]
const API_BASE_URL = "https://ggecl-rebranding.onrender.com/api/applications"

interface Application {
  id: string
  full_name: string
  required_program: string
  country: string
  status: string
  created_at: string
}

export const LatestApplications = () => {
  const navigate = useNavigate()
  const { session } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const token = session?.access_token || localStorage.getItem('admin_token')
        // Using GET /admin with a limit of 5 to show only recent ones [cite: 51, 54]
        const response = await axios.get(`${API_BASE_URL}/admin?limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setApplications(response.data.applications)
      } catch (err) {
        console.error("Dashboard Error:", err)
        setError("Failed to sync applications")
      } finally {
        setLoading(false)
      }
    }

    if (session || localStorage.getItem('admin_token')) {
      fetchLatest()
    }
  }, [session])

  return (
    <div className="flex flex-col h-full bg-card border rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b bg-muted/20 flex items-center justify-between">
        <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 text-slate-500">
          <Clock size={14} className="text-[#1e3a5f]" />
          Incoming Dossiers
        </h3>
        {applications.length > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full">
            Latest {applications.length}
          </span>
        )}
      </div>

      {/* Body Content */}
      <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar min-h-[300px]">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-2 opacity-50">
            <Loader2 className="animate-spin text-[#1e3a5f]" size={20} />
            <p className="text-[10px] font-bold uppercase tracking-tighter">Syncing Records...</p>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <AlertCircle className="text-red-400 mb-2" size={20} />
            <p className="text-xs font-medium text-slate-500">{error}</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs italic">
            No applications found.
          </div>
        ) : (
          applications.map((app) => (
            <div 
              key={app.id} 
              onClick={() => navigate(`/admin/applications/${app.id}`)}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 group cursor-pointer border border-transparent hover:border-slate-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors">
                  <User size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold leading-none text-slate-800 dark:text-slate-200 uppercase tracking-tight">
                    {app.full_name}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Globe size={10} /> {app.country}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="truncate max-w-[120px]">{app.required_program}</span>
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  {new Date(app.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className={cn(
                  "text-[8px] font-black uppercase px-2 py-0.5 rounded-md border",
                  app.status === 'approved' ? "bg-green-50 text-green-600 border-green-100" :
                  app.status === 'rejected' ? "bg-red-50 text-red-600 border-red-100" :
                  "bg-blue-50 text-[#1e3a5f] border-blue-100"
                )}>
                  {app.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Button */}
      <button 
        onClick={() => navigate("/admin/applications")}
        className="m-4 mt-0 py-3 text-[10px] font-bold uppercase tracking-widest border-2 border-slate-100 rounded-xl hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] transition-all flex items-center justify-center gap-2 group"
      >
        Access Review Portal
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}