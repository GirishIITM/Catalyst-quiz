"use client"

import { AudioWaveform, BookOpen, ClipboardList, Command, GalleryVerticalEnd, MessageSquare, User } from "lucide-react"
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
    name: "John Student",
    email: "john.student@school.edu",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  teams: [
    {
      name: "Math 101",
      logo: GalleryVerticalEnd,
      plan: "Enrolled",
    },
    {
      name: "Physics 201",
      logo: AudioWaveform,
      plan: "Enrolled",
    },
    {
      name: "Chemistry 301",
      logo: Command,
      plan: "Completed",
    },
  ],
  navMain: [
    {
      title: "Learning",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: routes.student.dashboard.replace(":classroom", "math-101"),
        },
        {
          title: "View Notes",
          url: routes.student.viewNotes.replace(":classroom", "math-101"),
        },
        {
          title: "Feedback",
          url: routes.student.feedback.replace(":classroom", "math-101"),
        },
      ],
    },
    {
      title: "Assessments",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Take Quiz",
          url: routes.student.takeQuiz.replace(":classroom", "math-101"),
        },
        {
          title: "Submissions",
          url: routes.student.submissions.replace(":classroom", "math-101"),
        },
      ],
    },
  ],
  quickActions: [
    {
      title: "Take Quiz",
      url: routes.student.takeQuiz.replace(":classroom", "math-101"),
      icon: ClipboardList,
    },
    {
      title: "View Profile",
      url: routes.student.profile.replace(":classroom", "math-101"),
      icon: User,
    },
  ],
  stats: [
    {
      title: "New Feedback",
      count: 2,
      url: routes.student.feedback.replace(":classroom", "math-101"),
      icon: MessageSquare,
    },
  ],
}

export function StudentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
