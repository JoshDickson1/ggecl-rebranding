import { useAuth } from "@/AuthProvider"
import { 
  Users, 
  FileText, 
  MousePointer2, 
  Plus,
  Trash2,
  UserCheck,
  Clock,  
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { user, session } = useAuth();
  
  console.log(user, ' and ', session)

  const [blogs, setBlogs] = useState([
    { id: 1, title: "10 Tips for Modern React", status: "Published", date: "2024-03-10" },
    { id: 2, title: "Mastering Tailwind CSS", status: "Published", date: "2024-03-12" },
    { id: 3, title: "The Future of AI in Web", status: "Draft", date: "2024-03-15" },
    { id: 4, title: "Modern Backend Architectures", status: "Failed", date: "2024-03-15" },
  ])

  // New state for Applications
  const [applications] = useState([
    { id: "APP-001", name: "John Doe", role: "Content Writer", status: "Pending", time: "2h ago" },
    { id: "APP-002", name: "Jane Smith", role: "Editor", status: "Reviewed", time: "5h ago" },
    { id: "APP-003", name: "Mike Ross", role: "Guest Contributor", status: "New", time: "1d ago" },
  ])
  
  const stats = [
    { label: "Total Visitors", value: "12,482", icon: <Users className="text-blue-500" />, trend: "+12%" },
    { label: "Blog Posts", value: blogs.length.toString(), icon: <FileText className="text-orange-500" />, trend: "+2" },
    { label: "New Applications", value: applications.length.toString(), icon: <UserCheck className="text-green-500" />, trend: "Active" },
    { label: "Categories", value: "5", icon: <MousePointer2 className="text-purple-500" />, trend: "+2%" },
  ]

  const deleteBlog = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Managing blogs and application portal activity.</p>
        </div>
        <button 
          onClick={() => navigate("/admin/blogs/add")}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all active:scale-95">
          <Plus size={18} />
          Create New Post
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
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
        {/* Blogs Table (Left - 2/3 width) */}
        <div className="lg:col-span-2 bg-card border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-muted/20">
            <h3 className="font-semibold">Recent Blogs</h3>
            <button className="text-xs text-primary font-medium hover:underline">View All</button>
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
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium truncate max-w-[200px]">{blog.title}</td>
                    <td className="px-6 py-3">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase border ${
                        blog.status === "Published" ? "bg-green-50 text-green-700 border-green-200" :
                        blog.status === "Failed" ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-orange-700 border-orange-200"
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => deleteBlog(blog.id)} className="text-muted-foreground hover:text-red-500 p-1">
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