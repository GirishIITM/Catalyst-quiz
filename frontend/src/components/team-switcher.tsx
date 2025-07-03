import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { logo } from "@/assets"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
  onAddClassroom,
  activeClassroom,
  onClassroomChange,
}: {
  teams: {
    name: string
    logo?: React.ElementType
    plan: string
    id?: string
  }[]
  onAddClassroom?: () => void
  activeClassroom?: string
  onClassroomChange?: (classroomId: string) => void
}) {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const params = useParams()
  
  const currentClassroomId = activeClassroom || params.classroom
  const activeTeam = teams.find(team => team.id === currentClassroomId) || teams[0]

  const handleTeamChange = (team: typeof teams[0]) => {
    if (onClassroomChange) {
      onClassroomChange(team.id!)
    }
    
    if (team.id) {
      const currentPath = window.location.pathname
      
      const hasClassroomParam = currentPath.includes(`/${currentClassroomId}/`) || 
                               currentPath.startsWith(`/${currentClassroomId}`)
      
      if (hasClassroomParam && currentClassroomId) {
        const newPath = currentPath.replace(`/${currentClassroomId}`, `/${team.id}`)
        navigate(newPath)
      } else {
        navigate(currentPath)
      }
    }
  }

  if (!activeTeam && teams.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" onClick={onAddClassroom}>
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <img src={logo} alt="Logo" className="size-8" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">No Classrooms</span>
              <span className="truncate text-xs">Click to create</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {activeTeam?.logo ? (
                  <activeTeam.logo className="size-6" />
                ) : (
                  <img src={logo} alt="Logo" className="size-8" />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeTeam?.name || "Select Classroom"}</span>
                <span className="truncate text-xs">{activeTeam?.plan || "No classroom selected"}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">Classrooms</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem 
                key={team.id || team.name} 
                onClick={() => handleTeamChange(team)} 
                className="gap-2 p-2"
              >
                <div className="flex size-8 items-center justify-center rounded-sm border">
                  {team.logo ? (
                    <team.logo className="size-5 shrink-0" />
                  ) : (
                    <img src={logo} alt="Logo" className="size-6 shrink-0" />
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={onAddClassroom}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add classroom</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
