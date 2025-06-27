import type { LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

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
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Notifications</SidebarGroupLabel>
      <SidebarMenu>
        {stats.map((stat) => (
          <SidebarMenuItem key={stat.title}>
            <SidebarMenuButton asChild>
              <a href={stat.url}>
                <stat.icon />
                <span>{stat.title}</span>
              </a>
            </SidebarMenuButton>
            <SidebarMenuBadge>{stat.count}</SidebarMenuBadge>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
