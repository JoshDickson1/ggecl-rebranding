import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        // User is already logged in, redirect to admin
        navigate("/admin", { replace: true })
      } else {
        setCheckingSession(false)
      }
    }

    checkSession()
  }, [navigate])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      navigate("/admin")
    }
  }

  // Show loading spinner while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-muted/30">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary p-3 rounded-2xl mb-4 shadow-lg shadow-primary/20">
              <ShieldCheck className="text-primary-foreground" size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your credentials to access the portal
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 text-sm bg-destructive/10 border border-destructive/20 text-destructive rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border rounded-md pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
                {/* <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a> */}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border rounded-md pl-10 pr-10 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-md hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 mt-2 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Sign In"}
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-muted/50 border-t text-center">
          <p className="text-xs text-muted-foreground">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  )
}

export default Login