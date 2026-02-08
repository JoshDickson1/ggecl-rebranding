import { useAuth } from "@/AuthProvider"
import { 
  Users, 
  FileText, 
  MousePointer2, 
  Plus,
  Trash2,
  UserCheck,
  Clock,
  AlertCircle,
  Loader2  
} from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

// Base URL from your API documentation [cite: 8]
const API_BASE_URL = "https://ggecl-rebranding.onrender.com/api/blog"

const Home = () => {
  const { session} = useAuth();

  console.log('session is good', session?.access_token)
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [apiStats, setApiStats] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch Data from API [cite: 14, 137]
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const headers = { Authorization: `Bearer ${session?.access_token || localStorage.getItem('admin_token')}` }

        // 1. Get Blog Stats [cite: 138]
        const statsRes = await axios.get(`${API_BASE_URL}/admin/stats`, { headers })
        setApiStats(statsRes.data.stats)

        // 2. Get Recent Blogs [cite: 15, 18]
        const blogsRes = await axios.get(`${API_BASE_URL}/?limit=5`, { headers })
        setBlogs(blogsRes.data.posts)

        setError(null)
      } catch (err: any) {
        console.error("Dashboard Fetch Error:", err)
        setError("Failed to sync with API. Please check your connection.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [session])

  const deleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to soft-delete this post?")) {
      try {
        const headers = { Authorization: `Bearer ${session?.access_token || localStorage.getItem('admin_token')}` }
        // API Soft Delete Endpoint [cite: 114, 115]
        await axios.delete(`${API_BASE_URL}/${id}`, { headers })
        setBlogs(blogs.filter((blog: any) => blog.id !== id))
      } catch (err) {
        alert("Delete failed. You may lack permissions.")
      }
    }
  }

  // Mock state for Applications (as no API provided for this yet)
  const [applications] = useState([
    { id: "APP-001", name: "John Doe", role: "Content Writer", status: "Pending", time: "2h ago" },
    { id: "APP-002", name: "Jane Smith", role: "Editor", status: "Reviewed", time: "5h ago" },
    { id: "APP-003", name: "Mike Ross", role: "Guest Contributor", status: "New", time: "1d ago" },
  ])
  
  const statsCards = [
    { 
      label: "Total Views", 
      value: apiStats?.totalViews?.toLocaleString() || "0", 
      icon: <Users className="text-blue-500" />, 
      trend: "Lifetime" 
    },
    { 
      label: "Published Posts", 
      value: apiStats?.byStatus?.published?.toString() || "0", 
      icon: <FileText className="text-orange-500" />, 
      trend: `Total: ${apiStats?.total || 0}` 
    },
    { 
      label: "New Applications", 
      value: applications.length.toString(), 
      icon: <UserCheck className="text-green-500" />, 
      trend: "Active" 
    },
    { 
      label: "Drafts", 
      value: apiStats?.byStatus?.draft?.toString() || "0", 
      icon: <MousePointer2 className="text-purple-500" />, 
      trend: "Pending" 
    },
  ]

  if (loading) return (
    <div className="h-96 w-full flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  )

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Managing blogs and student application portal activity.</p>
        </div>
        <button 
          onClick={() => navigate("/admin/blogs/add")}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20">
          <Plus size={18} />
          Create New Post
        </button>
      </div>

      {/* Stats Grid  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, i) => (
          <div key={i} className="bg-card border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-muted rounded-lg">{stat.icon}</div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{stat.trend}</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blogs Table (Left - 2/3 width) [cite: 22] */}
        <div className="lg:col-span-2 bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-muted/20">
            <h3 className="font-semibold">Recent Blogs</h3>
            <button 
              onClick={() => navigate("/admin/blogs/view")}
              className="text-xs text-primary font-medium hover:underline"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-muted/30 text-muted-foreground text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {blogs.map((blog: any) => (
                  <tr key={blog.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]">
                      {blog.title}
                      <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(blog.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-3">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                        blog.status === "published" ? "bg-green-50 text-green-700 border-green-200" :
                        "bg-orange-50 text-orange-700 border-orange-200"
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button 
                        onClick={() => deleteBlog(blog.id)} 
                        className="text-muted-foreground hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Applications Panel (Right - 1/3 width) */}
        <div className="bg-card border rounded-xl shadow-sm flex flex-col">
          <div className="p-4 border-b bg-muted/20">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Clock size={16} className="text-primary" />
              Latest Applications
            </h3>
          </div>
          <div className="p-4 space-y-4 flex-1">
            {applications.map((app) => (
              <div key={app.id} className="flex items-start justify-between group cursor-pointer border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">{app.name}</p>
                  <p className="text-xs text-muted-foreground">{app.role}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{app.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-medium text-muted-foreground block mb-1">{app.time}</span>
                  <span className="text-[9px] font-bold text-primary uppercase">{app.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate("/admin/applications")}
            className="m-4 mt-0 py-2 text-xs font-semibold border rounded-lg hover:bg-muted transition-colors">
            Review Portal
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home