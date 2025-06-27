import * as React from "react"
import { BookOpen, ClipboardList, FileText, MessageSquare, LayoutDashboard } from 'lucide-react'

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

const studentMenuItems = [
  {
    title: "Dashboard",
    url: routes.student.dashboard,
    icon: LayoutDashboard,
  },
  {
    title: "View Notes",
    url: routes.student.viewNotes,
    icon: BookOpen,
  },
  {
    title: "Take Quiz",
    url: routes.student.takeQuiz,
    icon: ClipboardList,
  },
  {
    title: "Submissions",
    url: routes.student.submissions,
    icon: FileText,
  },
  {
    title: "Feedback",
    url: routes.student.feedback,
    icon: MessageSquare,
  },
]
export function StudentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

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
                    <span className="text-xs">Student</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Student Portal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {studentMenuItems.map((item) => (
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
                    <Link to={routes.student.profile}>
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
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}

