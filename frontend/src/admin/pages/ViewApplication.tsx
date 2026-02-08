import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { 
  ArrowLeft, User, Mail, Phone, GraduationCap, FileText, ExternalLink, Loader2, 
  ShieldCheck, MapPin, CheckCircle2, XCircle, AlertCircle, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/AuthProvider"

const API_BASE_URL = "https://ggecl-rebranding.onrender.com/api/applications"

const ViewApplication = () => {
  const { id } = useParams() 
  const navigate = useNavigate()
  const { session } = useAuth()
  
  const [app, setApp] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const token = session?.access_token || localStorage.getItem('admin_token')

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        setLoading(true)
        // FIXED: Endpoint for specific ID is GET /:id, not /admin/:id
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setApp(response.data.application)
      } catch (err) {
        console.error("Error fetching application details:", err)
      } finally {
        setLoading(false)
      }
    }
    if (id && token) fetchFullDetails()
  }, [id, token])

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true)
    try {
      // Endpoint for status update is PATCH /admin/:id/status
      await axios.patch(`${API_BASE_URL}/admin/${id}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setApp({ ...app, status: newStatus }) 
    } catch (err) {
      alert("Failed to update status. Ensure you have admin permissions.")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return (
    <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
      <Loader2 className="animate-spin text-[#1e3a5f]" size={40} />
      <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Loading Dossier...</p>
    </div>
  )

  if (!app) return (
    <div className="p-20 text-center space-y-4">
      <AlertCircle className="mx-auto text-red-500" size={48} />
      <h2 className="font-bold text-xl uppercase">Application Not Found</h2>
      <Button onClick={() => navigate("/admin/applications")}>Return to List</Button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-8 animate-in fade-in duration-500">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/applications")}
          className="w-fit hover:bg-slate-100 gap-2 font-bold uppercase text-xs"
        >
          <ArrowLeft size={16} /> Back to Portal
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            disabled={updating || app.status === 'rejected'}
            onClick={() => handleStatusChange('rejected')}
            className="border-red-200 text-red-600 hover:bg-red-50 gap-2 rounded-xl"
          >
            <XCircle size={18} /> Reject
          </Button>
          <Button 
            disabled={updating || app.status === 'approved'}
            onClick={() => handleStatusChange('approved')}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 rounded-xl"
          >
            {updating ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
            Approve Application
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-[#1e3a5f] mb-4 border-2 border-[#1e3a5f]/10">
                <User size={40} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase leading-tight">{app.full_name}</h2>
              <Badge className={cn(
                "mt-3 uppercase text-[10px] font-bold px-3 py-1",
                app.status === 'approved' ? "bg-green-100 text-green-700 border-green-200" : 
                app.status === 'rejected' ? "bg-red-100 text-red-700 border-red-200" : "bg-blue-100 text-blue-700 border-blue-200"
              )}>
                {app.status.replace('_', ' ')}
              </Badge>
              
              <div className="w-full mt-8 pt-8 border-t space-y-4 text-left">
                <DetailItem icon={<Mail size={14}/>} label="Email" value={app.email} />
                <DetailItem icon={<Phone size={14}/>} label="Phone" value={app.phone} />
                <DetailItem icon={<MapPin size={14}/>} label="Origin" value={app.country} />
              </div>
            </div>
          </div>

          <div className="bg-[#1e3a5f] text-white rounded-[2.5rem] p-8 shadow-xl">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 opacity-60">Study Goal</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs opacity-60 uppercase font-bold">Country of Interest</p>
                <p className="text-xl font-bold">{app.country_of_interest}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs opacity-60 uppercase font-bold">Program</p>
                <p className="font-medium text-blue-200">{app.required_program}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Area */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Academic History" icon={<GraduationCap className="text-[#1e3a5f]" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoBlock label="Highest Qualification" value={app.highest_qualification} />
              <InfoBlock label="Submission Date" value={new Date(app.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })} />
            </div>
          </SectionCard>

          <SectionCard 
            title="Attached Documents" 
            icon={<FileText className="text-[#1e3a5f]" />}
          >
            <div className="grid gap-3">
              {/* Combine various document arrays into a single viewable list */}
              {[
                ...(app.certificates || []).map((url: string) => ({ type: 'Certificate', url })),
                ...(app.travel_documents || []).map((url: string) => ({ type: 'Passport/Travel', url })),
                ...(app.birth_certificates || []).map((url: string) => ({ type: 'Birth Certificate', url })),
                ...(app.ielts || []).map((url: string) => ({ type: 'IELTS/English', url })),
                ...(app.sop || []).map((url: string) => ({ type: 'SOP', url })),
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 group hover:border-[#1e3a5f]/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl shadow-sm"><ShieldCheck size={20} className="text-green-500" /></div>
                    <p className="text-sm font-bold uppercase tracking-wide">{doc.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => window.open(doc.url, '_blank')} className="rounded-xl gap-2 hover:bg-[#1e3a5f] hover:text-white">
                    <ExternalLink size={14} /> View Document
                  </Button>
                </div>
              ))}
              {(!app.certificates?.length && !app.travel_documents?.length) && (
                <p className="text-center py-4 text-slate-400 text-sm italic">No documents attached.</p>
              )}
            </div>
          </SectionCard>

          {/* Activity Logs */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border rounded-[2.5rem] p-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Clock size={14} /> Application Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-[#1e3a5f] rounded-full border-4 border-white shadow-sm" />
                <p className="text-sm font-bold">Application Submitted</p>
                <p className="text-xs text-slate-500">{new Date(app.created_at).toLocaleString()}</p>
              </div>
              {app.reviewed_at && (
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm" />
                  <p className="text-sm font-bold">Review Completed</p>
                  <p className="text-xs text-slate-500">{new Date(app.reviewed_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helpers
const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex flex-col">
    <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1.5">{icon} {label}</span>
    <span className="text-sm font-semibold truncate">{value}</span>
  </div>
)

const InfoBlock = ({ label, value }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</label>
    <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{value}</p>
  </div>
)

const SectionCard = ({ title, icon, badge, children }: any) => (
  <div className="bg-white dark:bg-slate-900 border rounded-[2.5rem] p-8 shadow-sm">
    <div className="flex items-center justify-between mb-8 border-b pb-5">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-bold uppercase tracking-tight text-lg">{title}</h3>
      </div>
      {badge && <Badge variant="secondary" className="rounded-lg">{badge}</Badge>}
    </div>
    {children}
  </div>
)

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default ViewApplication