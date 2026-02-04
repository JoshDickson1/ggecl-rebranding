// admin/components/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("admin_auth") === "true"
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default ProtectedRoute