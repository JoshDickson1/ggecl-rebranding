import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {  
  Image as ImageIcon, 
  Tag as TagIcon, 
  Type, 
  Layout, 
  Send, 
  X,
  Loader2,
  CheckCircle2,
  FileText
} from "lucide-react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/AuthProvider"
import { cn } from "@/lib/utils"

const CATEGORIES = ["University", "Education", "Lifestyle", "Innovation"]
const API_BASE_URL = "https://ggecl-rebranding.onrender.com/api/blog"

const AddBlog = () => {
  const { session } = useAuth()
  const navigate = useNavigate()
  
  // State
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [tagInput, setTagInput] = useState("")
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "Education",
    image_url: "",
    tags: [] as string[],
    status: "published" as "published" | "draft"
  })

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const token = session?.access_token || localStorage.getItem('admin_token')
      
      // Post request to API as per Documentation
      await axios.post(API_BASE_URL, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setSuccess(true)
      setTimeout(() => navigate("/admin/blogs/view"), 2000)
    } catch (error) {
      console.error("Error creating blog:", error)
      alert("Failed to create blog. Check console for details.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="bg-green-100 p-4 rounded-full text-green-600 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-tight">Post Created Successfully!</h2>
        <p className="text-slate-500">Redirecting to blog management...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight uppercase">Create New Post</h1>
        <p className="text-slate-500 text-sm">Draft or publish a new article to the Golden Goshen blog.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Type size={14} /> Blog Title
              </label>
              <Input 
                required
                placeholder="Enter a catchy title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="py-6 text-lg font-semibold rounded-xl border-slate-200 dark:border-slate-800 focus:ring-[#1e3a5f]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Layout size={14} /> Brief Excerpt
              </label>
              <textarea 
                required
                rows={3}
                placeholder="A short summary for the preview card..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <FileText size={14} /> Full Content (Markdown or HTML)
              </label>
              <textarea 
                required
                rows={12}
                placeholder="Write your blog post here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <aside className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            {/* Status Selector */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Publication Status</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "published" })}
                  className={cn(
                    "py-2 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all",
                    formData.status === "published" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Publish
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, status: "draft" })}
                  className={cn(
                    "py-2 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all",
                    formData.status === "draft" ? "bg-[#1e3a5f] text-white border-[#1e3a5f]" : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  )}
                >
                  Draft
                </button>
              </div>
            </div>

            {/* Category Selector */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-sm font-bold focus:ring-[#1e3a5f]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <ImageIcon size={14} /> Cover Image URL
              </label>
              <Input 
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="rounded-xl border-slate-200 dark:border-slate-800"
              />
              {formData.image_url && (
                <div className="mt-2 rounded-xl overflow-hidden h-32 border">
                  <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" />
                </div>
              )}
            </div>

            {/* Tags Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <TagIcon size={14} /> Tags
              </label>
              <Input 
                placeholder="Type and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="rounded-xl border-slate-200 dark:border-slate-800"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 gap-1 rounded-lg">
                    {tag}
                    <X size={12} className="cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1e3a5f] hover:bg-[#152943] text-white py-6 rounded-2xl shadow-lg shadow-[#1e3a5f]/20 font-bold uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" size={18} />
              ) : (
                <Send className="mr-2" size={18} />
              )}
              {formData.status === "published" ? "Publish Article" : "Save Draft"}
            </Button>
          </div>
        </aside>
      </form>
    </div>
  )
}

export default AddBlog