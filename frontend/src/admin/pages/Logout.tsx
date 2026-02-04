import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loading } from "@/pages/Loading" // Reuse your existing loading spinner

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 1. Clear local storage / Cookies / Auth Context
    localStorage.removeItem("admin_auth")
    
    // 2. Short delay for better UX (optional)
    const timer = setTimeout(() => {
      navigate("/admin/login", { replace: true })
    }, 1000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
      <Loading />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Signing out securely...
      </p>
    </div>
  )
}

export default Logout