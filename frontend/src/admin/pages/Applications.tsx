import { useState } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail,
  ExternalLink 
} from "lucide-react"

const Applications = () => {
  // Mock Data - In production, this would be your 'apply' form submissions
  const [applicants, setApplicants] = useState([
    { id: "APP-921", name: "John Doe", email: "john@example.com", role: "Content Writer", date: "2024-03-20", status: "New" },
    { id: "APP-922", name: "Jane Smith", email: "jane@design.io", role: "UI Designer", date: "2024-03-19", status: "Under Review" },
    { id: "APP-923", name: "Mike Ross", email: "mike.r@legal.com", role: "Legal Consultant", date: "2024-03-18", status: "Accepted" },
    { id: "APP-924", name: "Sarah Connor", email: "sarah@future.net", role: "Security Lead", date: "2024-03-17", status: "Rejected" },
  ])

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-700 dark:bg-green-950/30 border-green-200"
      case "Rejected": return "bg-red-100 text-red-700 dark:bg-red-950/30 border-red-200"
      case "Under Review": return "bg-blue-100 text-blue-700 dark:bg-blue-950/30 border-blue-200"
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 border-slate-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Application Portal</h1>
          <p className="text-muted-foreground text-sm">Review and manage incoming candidate submissions.</p>
        </div>
        <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-4 py-2 rounded-lg text-sm font-medium transition-colors border">
          <Download size={16} />
          Export CSV
        </button>
      </div>

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
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground text-[11px] uppercase tracking-wider border-b">
                <th className="px-6 py-4 font-semibold">Applicant Details</th>
                <th className="px-6 py-4 font-semibold">Applied Role</th>
                <th className="px-6 py-4 font-semibold">Date Submitted</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applicants.map((app) => (
                <tr key={app.id} className="hover:bg-muted/20 transition-colors group">
                  {/* Name & Contact */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{app.name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Mail size={12} /> {app.email}
                      </span>
                    </div>
                  </td>
                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{app.role}</span>
                    <span className="block text-[10px] text-muted-foreground font-mono mt-0.5">{app.id}</span>
                  </td>
                  {/* Date */}
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {app.date}
                  </td>
                  {/* Status Badge */}
                  <td className="px-6 py-4">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase border ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  {/* Action Buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-1">
                      <button title="Approve" className="p-2 text-muted-foreground hover:text-green-600 transition-colors">
                        <CheckCircle size={18} />
                      </button>
                      <button title="Reject" className="p-2 text-muted-foreground hover:text-red-600 transition-colors">
                        <XCircle size={18} />
                      </button>
                      <div className="w-[1px] h-4 bg-border mx-1"></div>
                      <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Placeholder */}
        <div className="p-4 border-t bg-muted/10 flex items-center justify-between text-xs text-muted-foreground">
          <span>Showing 4 of 24 applicants</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded bg-card hover:bg-muted disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 border rounded bg-card hover:bg-muted">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applications