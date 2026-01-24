import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Navbar } from "./Navbar"

const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <nav className="h-16 border-b flex items-center justify-between px-6">
        <Navbar />
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="h-14 border-t flex items-center justify-center text-sm">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
