import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"

import "@/App.css"

// Providers
import { ThemeProvider } from "@/theme-provider"
import { AuthProvider, useAuth } from "./AuthProvider"
import { queryClient } from "./lib/tanstack"

// Layouts
import Layout from "@/outlet/Layout"
import AdminLayout from "@/admin/outlet/Layout"

// Public pages
import Home from "@/pages/Home"
import About from "@/pages/About"
import Services from "@/pages/Services"
import Contact from "@/pages/Contact"
import Blogs from "@/pages/Blogs"
import SingleBlogPage from "@/components_/SingleBlogPage"
import FAQ from "@/components_/FAQ"
import Terms from "@/pages/Terms"
import Privacy from "@/pages/Privacy"
import Careers from "@/pages/Careers"
import WorkHours from "@/pages/WorkHours"
import Apply from "@/pages/Apply"
import Apply1 from "@/components_/Apply1"
import Apply2 from "@/components_/Apply2"
import Apply3 from "@/components_/Apply3"
import Apply4 from "@/components_/Apply4"
import { Loading } from "@/pages/Loading"
import { NotFound } from "@/pages/NotFound"

// Admin pages
import AdminHome from "@/admin/pages/Home"
import AdminLogin from "@/admin/pages/Login"
import AdminLogout from "@/admin/pages/Logout"
import AddBlog, { BlogEditor } from "@/admin/pages/AddBlog"
import { BlogPostList } from "@/admin/pages/BlogPostList"
import Applications from "@/admin/pages/Applications"
import ViewApplication from "@/admin/pages/ViewApplication"
import Settings from "@/admin/pages/Settings"

// ---------- AUTH GUARD ----------
const ProtectedRoute = () => {
  const { session, loading } = useAuth()
  if (loading) return null
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />
}

// ---------- APP ----------
export function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              {/* ---------- PUBLIC ---------- */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<SingleBlogPage />} />
                <Route path="/work-hours" element={<WorkHours />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<Privacy />} />
                <Route path="/career" element={<Careers />} />
              </Route>

              {/* ---------- APPLY ---------- */}
              <Route path="/apply" element={<Apply />}>
                <Route index element={<Navigate to="start" />} />
                <Route path="start" element={<Apply1 />} />
                <Route path="qualifications" element={<Apply2 />} />
                <Route path="documentation" element={<Apply3 />} />
                <Route path="acknowledgement" element={<Apply4 />} />
              </Route>

              {/* ---------- ADMIN AUTH ---------- */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/logout" element={<AdminLogout />} />

              {/* ---------- ADMIN (PROTECTED) ---------- */}
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  <Route path="blogs/add" element={<AddBlog mode="create" />} />
                  <Route path="blogs/edit/:id" element={<BlogEditor mode="edit" />} />
                  <Route path="blogs/view" element={<BlogPostList />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="applications/:id" element={<ViewApplication />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Route>

              {/* ---------- 404 ---------- */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
