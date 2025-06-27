import type * as React from "react"
import {
  BookOpen,
  ClipboardList,
  Upload,
  Users,
  BarChart3,
  LayoutDashboard,
  FileText,
  PlusCircle,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ModeToggle } from "../mode-toogle"
import { routes } from "@/types/routes"
import { Link } from "react-router-dom"

const teacherMenuItems = [
  {
    title: "Dashboard",
    url: routes.teacher.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "Create Quiz",
    url: routes.teacher.createQuiz,
    icon: PlusCircle,
  },
  {
    title: "Upload Notes",
    url: routes.teacher.uploadNotes,
    icon: Upload,
  },
  {
    title: "My Quizzes",
    url: routes.teacher.myQuizzes,
    icon: ClipboardList,
  },
  {
    title: "Classroom",
    url: routes.teacher.classroom,
    icon: Users,
  },
  {
    title: "Evaluation",
    url: routes.teacher.evaluation,
    icon: BarChart3,
  },
]

export function TeacherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <SidebarProvider>
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to={routes.home}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <BookOpen className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">EduPortal</span>
                    <span className="text-xs">Teacher</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Teacher Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {teacherMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Quick Access</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={routes.quizes}>
                      <ClipboardList />
                      <span>All Quizzes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={routes.teacher.profile}>
                      <FileText />
                      <span>Profile</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex items-center justify-between p-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Dr. Jane Smith</span>
                  <span className="text-xs text-muted-foreground">Mathematics Dept.</span>
                </div>
                <ModeToggle />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

