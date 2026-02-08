import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"

import SingleBlogPage from "@/components_/SingleBlogPage"
import Layout from "@/outlet/Layout"
import About from "@/pages/About"
import Blogs from "@/pages/Blogs"
import Contact from "@/pages/Contact"
import Home from "@/pages/Home"
import { Loading } from "@/pages/Loading"
import { NotFound } from "@/pages/NotFound"
import Services from "@/pages/Services"
import { ThemeProvider } from "@/theme-provider"

import AdminLayout from "@/admin/outlet/Layout"
import AdminHome from "@/admin/pages/Home"
import AdminLogin from "@/admin/pages/Login"
import AdminLogout from "@/admin/pages/Logout"

import "@/App.css"
import { BlogEditor } from "@/admin/pages/AddBlog"
import Settings from "@/admin/pages/Settings"
import Apply1 from "@/components_/Apply1"
import Apply2 from "@/components_/Apply2"
import Apply3 from "@/components_/Apply3"
import Apply4 from "@/components_/Apply4"
import Apply from "@/pages/Apply"
import { QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider, useAuth } from "./AuthProvider"
import Applications from "./admin/pages/Applications"
import { BlogPostList } from "./admin/pages/BlogPostList"
import FAQ from "./components_/FAQ"
import { queryClient } from "./lib/tanstack"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import WorkHours from "./pages/WorkHours"

const ProtectedRoute = () => {
  const { session, loading } = useAuth();
  if (loading) return null; 
  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

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
              <Route path="/work-hours" element={<WorkHours />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<Privacy />} />
              {/* 5. 404 CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
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
            <Route element={<AuthProvider><ProtectedRoute /></AuthProvider>}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path="blogs/add" element={<BlogEditor mode="create" />} />
                <Route path="blogs/edit/:id" element={<BlogEditor mode="edit" />} />
                <Route path="blogs/view" element={<BlogPostList />} />
                <Route path="applications" element={<Applications />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* 5. 404 CATCH-ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}