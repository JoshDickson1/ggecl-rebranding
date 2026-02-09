import { Clock, MapPin, Phone, Mail, Globe, CheckCircle2, AlertCircle } from "lucide-react"

const WorkHours = () => {
  const days = [
    { day: "Monday", hours: "09:00 AM - 17:00 PM", status: "Open" },
    { day: "Tuesday", hours: "09:00 AM - 17:00 PM", status: "Open" },
    { day: "Wednesday", hours: "09:00 AM - 17:00 PM", status: "Open" },
    { day: "Thursday", hours: "09:00 AM - 17:00 PM", status: "Open" },
    { day: "Friday", hours: "09:00 AM - 17:00 PM", status: "Open" },
    { day: "Saturday", hours: "12:00 AM - 16:00 PM", status: "By Appointment" },
    { day: "Sunday", hours: "Closed", status: "Closed" },
  ]

  // Logic to check if currently open (Optional for static feel)
  const currentHour = new Date().getHours()
  const isOpenNow = currentHour >= 8 && currentHour < 17

  return (
    <div className="max-w-6xl mx-auto px-6 md:pt-35 pt-20 pb-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Visit Our Office</h2>
        <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
          Planning a visit to discuss your study abroad dreams? Check our weekly schedule and location details below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Schedule Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold">Opening Hours</h3>
            </div>
            {isOpenNow ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full uppercase tracking-wider">
                <CheckCircle2 size={14} /> Open Now
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-wider">
                <AlertCircle size={14} /> Closed
              </span>
            )}
          </div>

          <div className="p-8 space-y-4">
            {days.map((item) => (
              <div key={item.day} className="flex justify-between items-center group">
                <span className={`font-medium ${item.day === "Sunday" ? "text-slate-400" : "text-slate-700 dark:text-slate-300"}`}>
                  {item.day}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500 font-mono">{item.hours}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === "Open" ? "bg-green-500" : 
                    item.status === "By Appointment" ? "bg-blue-400" : "bg-slate-300"
                  }`} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 text-center">
            <p className="text-sm text-slate-500 italic">
              * Note: We are closed on all Public Holidays.
            </p>
          </div>
        </div>

        {/* Right Column: Contact & Quick Info */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Phone className="text-blue-600 mb-4" size={28} />
              <h4 className="font-bold mb-1">Call Us</h4>
              <a href="tel:+447943477853" className="text-sm text-slate-500">+44 7943 47 7853</a><br />
              <a href="tel:+447999965256" className="text-sm text-slate-500">+44 7999 965 256</a>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
              <Mail className="text-blue-600 mb-4" size={28} />
              <h4 className="font-bold mb-1">Email Support</h4>
              <a href="mailto:info@ggecl.com" className="text-sm text-slate-500">info@ggecl.com</a> <br />
              <a href="mailto:daniel.vincent@ggecl.com" className="text-sm text-slate-500">daniel.vincent@ggecl.com</a>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-blue-600 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <MapPin className="mb-4" size={32} />
              <h4 className="text-xl font-bold mb-2">Our Headquarters</h4>
              <p className="text-blue-100 mb-6 leading-relaxed">
                148 Rose Bowl, Portland Crescent, UK
              </p>
              <a href="https://maps.app.goo.gl/ETTCkbbUufVjsyrL9" className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                Get Directions <Globe size={16} />
              </a>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkHours