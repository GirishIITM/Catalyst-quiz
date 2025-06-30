import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { authStore } from "@/states/auth"

export function ModeToggle() {
  const theme = authStore((state) => state.theme);
  const setTheme = authStore((state) => state.setTheme);

  return (
    <Button 
      variant="ghost" 
      className="cursor-pointer hover:bg-accent hover:text-accent-foreground border border-border" 
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
