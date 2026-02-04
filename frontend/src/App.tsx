import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"

import { ThemeProvider } from "@/theme-provider"
import Layout from "@/outlet/Layout"
import { Loading } from "@/pages/Loading"
import { NotFound } from "@/pages/NotFound"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import Blogs from "@/pages/Blogs"
import SingleBlogPage from "@/components_/SingleBlogPage"
import Services from "@/pages/Services"

import AdminLayout from "@/admin/outlet/Layout" 
import AdminHome from "@/admin/pages/Home"
import AdminLogin from "@/admin/pages/Login"
import AdminLogout from "@/admin/pages/Logout" // Use the logic-based logout we created

import "@/App.css"
import Apply from "@/pages/Apply"
import Apply1 from "@/components_/Apply1"
import Apply2 from "@/components_/Apply2"
import Apply3 from "@/components_/Apply3"
import Apply4 from "@/components_/Apply4"
import AddBlog from "@/admin/pages/AddBlog"
import  Settings from "@/admin/pages/Settings"
import ViewBlog from "./admin/pages/ViewBlog"
import Applications from "./admin/pages/Applications"

// Simple Guard: Redirects to login if not authenticated
const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("admin_auth") === "true";
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* 1. PUBLIC ROUTES */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
          </Route>

          {/* 2. APPLICATION PORTAL */}
          <Route path="/apply" element={<Apply />}>
            <Route index element={<Navigate to="start" />} />
            <Route path="start" element={<Apply1 />} />
            <Route path="qualifications" element={<Apply2 />} />
            <Route path="documentation" element={<Apply3 />} />
            <Route path="acknowledgement" element={<Apply4 />} />
          </Route>

          {/* 3. ADMIN AUTH (No Sidebar/Layout) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/logout" element={<AdminLogout />} />

          {/* 4. PROTECTED ADMIN DASHBOARD */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="blogs/add" element={<AddBlog />} />
              <Route path="blogs/view" element={<ViewBlog />} />
              <Route path="applications" element={<Applications />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* 5. 404 CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}