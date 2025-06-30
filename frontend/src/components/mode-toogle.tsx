import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authStore } from "@/states/auth"

export function ModeToggle() {
  const { theme, setTheme } = authStore()

  return (
    <Button 
      variant="outline" 
      size="icon"
      className="cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] text-gray-800 dark:text-gray-200 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] text-gray-800 dark:text-gray-200 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
