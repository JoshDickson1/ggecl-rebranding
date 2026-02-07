import { useState, useEffect } from "react"
import { 
  Search, 
  Filter, 
  Download,  
  CheckCircle, 
  XCircle,  
  Mail,
  ExternalLink,
  Loader2,
  AlertCircle,
  Globe
} from "lucide-react"
import axios from "axios"
import { useAuth } from "@/AuthProvider"

// Base URL from Application API Documentation
const API_BASE_URL = "http://localhost:4000/api/applications"

const Applications = () => {
  const { session } = useAuth();
  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  // Fetch applications from API
  const fetchApplications = async () => {
    try {
      setLoading(true)
      const token = session?.access_token || localStorage.getItem('admin_token')
      const response = await axios.get(`${API_BASE_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setApplicants(response.data.applications)
      setTotalCount(response.data.total)
      setError(null)
    } catch (err: any) {
      console.error("Fetch Applications Error:", err)
      setError("Could not load applications. Please verify your admin permissions.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [session])

  // Update Application Status (Approve/Reject)
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const token = session?.access_token || localStorage.getItem('admin_token')
      await axios.patch(`${API_BASE_URL}/admin/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Refresh list after update
      fetchApplications()
    } catch (err) {
      alert("Failed to update status. Check API connectivity.")
    }
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-700 dark:bg-green-950/30 border-green-200"
      case "rejected": return "bg-red-100 text-red-700 dark:bg-red-950/30 border-red-200"
      case "under_review": return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 border-blue-200"
      case "pending_documents": return "bg-orange-100 text-orange-700 dark:bg-orange-950/30 border-orange-200"
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 border-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application Portal</h1>
          <p className="text-muted-foreground text-sm">Review and manage incoming candidate submissions for Golden Goshen.</p>
        </div>
        <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors border">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 text-sm">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Quick Filters / Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by name, email or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-card border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-card text-sm hover:bg-muted/50 transition-colors">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-sm text-muted-foreground font-medium">Loading submissions...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-[11px] uppercase tracking-wider border-b">
                  <th className="px-6 py-4 font-semibold">Applicant & Origin</th>
                  <th className="px-6 py-4 font-semibold">Program & Goal</th>
                  <th className="px-6 py-4 font-semibold">Submission Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {applicants.map((app: any) => (
                  <tr key={app.id} className="hover:bg-muted/20 transition-colors group">
                    {/* Name & Country of Residence */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{app.full_name}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Globe size={10} /> Resident: {app.country}
                        </span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Mail size={10} /> {app.email}
                        </span>
                      </div>
                    </td>
                    {/* Program & Interest */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-foreground font-medium">{app.required_program}</span>
                        <span className="text-[10px] text-primary font-bold uppercase tracking-tight">
                          Target: {app.country_of_interest}
                        </span>
                        <span className="block text-[10px] text-muted-foreground font-mono mt-0.5">ID: {app.id.split('-')[0]}</span>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase border ${getStatusStyle(app.status)}`}>
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <button 
                          onClick={() => updateStatus(app.id, 'approved')}
                          title="Approve" 
                          className="p-2 text-muted-foreground hover:text-green-600 transition-colors disabled:opacity-30"
                          disabled={app.status === 'approved'}
                        >
                          <CheckCircle size={18} />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'rejected')}
                          title="Reject" 
                          className="p-2 text-muted-foreground hover:text-red-600 transition-colors disabled:opacity-30"
                          disabled={app.status === 'rejected'}
                        >
                          <XCircle size={18} />
                        </button>
                        <div className="w-[1px] h-4 bg-border mx-1"></div>
                        <button 
                          onClick={() => window.open(`/admin/applications/${app.id}`, '_blank')}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination Footer */}
        <div className="p-4 border-t bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing {applicants.length} of {totalCount} applicants</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-card hover:bg-muted disabled:opacity-50 transition-colors">Prev</button>
            <button className="px-3 py-1 border rounded bg-card hover:bg-muted transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applications