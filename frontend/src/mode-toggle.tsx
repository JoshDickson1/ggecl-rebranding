import { Switch } from "@/components/ui/switch"
import { useTheme } from "./theme-provider"
import { Label } from "@/components/ui/label"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      
      <Switch
        id="airplane-mode"
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      
      <Label htmlFor="airplane-mode">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </Label>
    </div>
  )
}