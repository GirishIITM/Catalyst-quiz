import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { authStore } from "@/states/auth"
import { routes } from "@/types/routes"
import { useNavigate } from "react-router-dom"
import { Camera } from "lucide-react"

export default function StudentProfile() {
  const { user, classroomId, logout } = authStore()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileUrl, setProfileUrl] = useState("/placeholder.svg")

  if (!user) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setProfileUrl(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <SidebarInset>
      <Header title="Student Profile" />
      <div className="flex flex-col gap-4 p-4 pt-0 mt-20">
        <Card className="min-h-[100vh]">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Avatar + Name Section */}
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <div className="relative w-32 h-32">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileUrl} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Camera Icon */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-card border rounded-full p-2 shadow hover:bg-muted transition"
                >
                  <Camera className="w-5 h-5 text-muted-foreground" />
                </button>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="text-center">
                <div className="text-xl font-semibold">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
                <div className="text-sm text-muted-foreground capitalize">{user.role}</div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-3 text-sm">
              <p className="border rounded-md p-3 bg-muted">
                <strong>Student ID:</strong> {user.id}
              </p>

              <p className="border rounded-md p-3 bg-muted">
                <strong>Classroom:</strong> {classroomId}
              </p>
              <p className="border rounded-md p-3 bg-muted">
                <strong>Email:</strong> {user.email || "user@123"}
              </p>
              <p className="border rounded-md p-3 bg-muted">
                <strong>Role:</strong> {user.role || "user@123"}
              </p>


            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="destructive"
                onClick={() => {
                  logout()
                  navigate(routes.login)
                }}
              >
                Log out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
