"use client"

import { Bell, BookOpen, FlaskConical, Plus, Upload } from "lucide-react"
import type * as React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { NavMain } from "@/components/nav-main"
import { NavQuickActions } from "@/components/nav-quick-actions"
import { NavStats } from "@/components/nav-stats"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { routes } from "@/types/routes"
import { classroomStore } from "@/states/teacher"

export function TeacherSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { classroomsStudents, fetchClassroomsStudents } = classroomStore()
  const navigate = useNavigate()
  const params = useParams()
  const [activeClassroom, setActiveClassroom] = useState<string>("")

  useEffect(() => {
    fetchClassroomsStudents()
  }, [fetchClassroomsStudents])

  useEffect(() => {
    if (params.classroom) {
      setActiveClassroom(params.classroom)
    } else if (classroomsStudents.length > 0 && !activeClassroom) {
      setActiveClassroom(classroomsStudents[0].id)
    }
  }, [params.classroom, classroomsStudents, activeClassroom])

  const handleAddClassroom = () => {
    navigate(routes.teacher.classrooms)
  }

  const handleClassroomChange = (classroomId: string) => {
    setActiveClassroom(classroomId)
  }

  const teams = classroomsStudents.map(classroom => ({
    name: classroom.name,
    plan: `${classroom.students?.length || 0} students`,
    id: classroom.id
  }))

  const currentClassroom = activeClassroom || classroomsStudents[0]?.id || "default"

  const data = {
    user: {
      name: "John Teacher",
      email: "john@school.edu",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    teams,
    navMain: [
      {
        title: "Classroom",
        url: "#",
        icon: BookOpen,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: routes.teacher.dashboard.replace(":classroom", currentClassroom),
          },
          {
            title: "Classrooms",
            url: routes.teacher.classrooms,
          },
          {
            title: "Notes",
            url: routes.teacher.uploadNotes.replace(":classroom", currentClassroom),
          },
          {
            title: "Feedback",
            url: routes.teacher.feedback.replace(":classroom", currentClassroom),
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
            url: routes.teacher.myQuizzes.replace(":classroom", currentClassroom),
          },
          {
            title: "Evaluation",
            url: routes.teacher.evaluation.replace(":classroom", currentClassroom),
          },
        ],
      },
    ],
    quickActions: [
      {
        title: "Create Quiz",
        url: routes.teacher.createQuiz.replace(":classroom", currentClassroom),
        icon: Plus,
      },
      {
        title: "Upload Notes",
        url: routes.teacher.uploadNotes.replace(":classroom", currentClassroom),
        icon: Upload,
      },
    ],
    stats: [
      {
        title: "New Submissions",
        count: 3,
        url: routes.teacher.submissions.replace(":classroom", currentClassroom),
        icon: Bell,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher 
          teams={data.teams} 
          onAddClassroom={handleAddClassroom}
          activeClassroom={activeClassroom}
          onClassroomChange={handleClassroomChange}
        />
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