import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

export function NavStats({
  stats,
}: {
  stats: {
    title: string
    count: number
    url: string
    icon: LucideIcon
  }[]
}) {
  const url = window.location.pathname;
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Notifications</SidebarGroupLabel>
      <SidebarMenu>
        {stats.map((stat) => (
          <SidebarMenuItem key={stat.title}>
            <SidebarMenuButton asChild isActive={url === stat.url}>
              <Link to={stat.url} >
                <stat.icon />
                <span>{stat.title}</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuBadge>{stat.count}</SidebarMenuBadge>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
