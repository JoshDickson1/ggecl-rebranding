import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@/theme-provider"

import Layout from "@/outlet/Layout"
import { Loading } from "@/pages/Loading"
import { NotFound } from "@/pages/NotFound"
import Home from "@/pages/Home"
import About from "@/pages/About"

import "./App.css"

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
          {/* Layout route */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* No layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
