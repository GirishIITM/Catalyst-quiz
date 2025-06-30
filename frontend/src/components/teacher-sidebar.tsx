"use client"

import { Bell, BookOpen, FlaskConical, Plus, Upload } from "lucide-react"
import type * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavQuickActions } from "@/components/nav-quick-actions"
import { NavStats } from "@/components/nav-stats"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { routes } from "@/types/routes"

const data = {
  user: {
    name: "John Teacher",
    email: "john@school.edu",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "Math 101",
      plan: "Active",
    },
    {
      name: "Physics 201", 
      plan: "Active",
    },
    {
      name: "Chemistry 301",
      plan: "Archived",
    },
  ],
  navMain: [
    {
      title: "Classroom",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: routes.teacher.dashboard.replace(":classroom", "math-101"),
        },
        {
          title: "Notes",
          url: routes.teacher.uploadNotes.replace(":classroom", "math-101"),
        },
        {
          title: "Feedback",
          url: routes.teacher.feedback.replace(":classroom", "math-101"),
        },
      ],
    },
    {
      title: "Quizzes",
      url: "#",
      icon: FlaskConical,
      items: [
        {
          title: "My Quizzes",
          url: routes.teacher.myQuizzes.replace(":classroom", "math-101"),
        },
        {
          title: "Evaluation",
          url: routes.teacher.evaluation.replace(":classroom", "math-101"),
        },
      ],
    },
  ],
  quickActions: [
    {
      title: "Create Quiz",
      url: routes.teacher.createQuiz.replace(":classroom", "math-101"),
      icon: Plus,
    },
    {
      title: "Upload Notes",
      url: routes.teacher.uploadNotes.replace(":classroom", "math-101"),
      icon: Upload,
    },
  ],
  stats: [
    {
      title: "New Submissions",
      count: 3,
      url: routes.teacher.submissions.replace(":classroom", "math-101"),
      icon: Bell,
    },
  ],
}

export function TeacherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavQuickActions actions={data.quickActions} />
        <NavStats stats={data.stats} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}