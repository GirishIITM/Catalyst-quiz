"use client"

import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavQuickActions({
  actions,
}: {
  actions: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const url = window.location.pathname;
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
      <SidebarMenu>
        {actions.map((action) => (
          <SidebarMenuItem key={action.title}>
            <SidebarMenuButton asChild>
              <Link to={action.url} className={url === action.url ? "bg-red" : ""}>
                <action.icon />
                <span>{action.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
