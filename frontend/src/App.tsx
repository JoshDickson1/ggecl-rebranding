import { ThemeProvider } from "@/theme-provider"
import { ModeToggle } from "@/mode-toggle"
import "./App.css"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Hello World</h1>
        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}