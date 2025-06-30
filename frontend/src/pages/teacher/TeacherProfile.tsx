import Header from "@/components/header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeacherProfile() {
  const teacher = {
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    department: "Computer Science",
    id: "T-1024",
  }

  return (
    <SidebarInset>
      <Header title="Teacher Profile" />
      <div className="flex flex-col gap-4 p-4 pt-0 mt-20">
        <Card className="min-h-[100vh]">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4 mb-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/teacher-placeholder.svg" alt={teacher.name} />
                <AvatarFallback>
                  {teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <div className="text-xl font-semibold">{teacher.name}</div>
                <div className="text-sm text-muted-foreground">{teacher.email}</div>
                <div className="text-sm text-muted-foreground">{teacher.department}</div>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-3 text-sm">
              <p className="border rounded-md p-3 bg-muted">
                <strong>Teacher ID:</strong> {teacher.id}
              </p>
              <p className="border rounded-md p-3 bg-muted">
                <strong>Department:</strong> {teacher.department}
              </p>
              <p className="border rounded-md p-3 bg-muted">
                <strong>Email:</strong> {teacher.email}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
