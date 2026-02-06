import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)


  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar - Pass state down */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Navbar - Pass toggle function */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout