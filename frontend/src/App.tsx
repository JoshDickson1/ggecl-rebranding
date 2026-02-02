import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

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

// Admin Imports (Adjust paths as necessary)
import AdminLayout from "@/admin/outlet/Layout" 
import AdminHome from "@/admin/pages/Home"
import AdminLogin from "@/admin/pages/Login"

import "./App.css"
import Apply from "./pages/Apply"
import Apply1 from "./components_/Apply1"
import Apply2 from "./components_/Apply2"
import Apply3 from "./components_/Apply3"
import Apply4 from "./components_/Apply4"

export function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Main App Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<SingleBlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Application Portal Routes */}
          <Route path="/apply" element={<Apply />}>
            <Route index element={<Navigate to="start" />} />
            <Route path="start" element={<Apply1 />} />
            <Route path="qualifications" element={<Apply2 />} />
            <Route path="documentation" element={<Apply3 />} />
            <Route path="acknowledgement" element={<Apply4 />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="login" element={<AdminLogin />} />
            {/* For 'logout', usually this is a function or a redirecting component */}
            <Route path="logout" element={<Navigate to="/admin/login" />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}