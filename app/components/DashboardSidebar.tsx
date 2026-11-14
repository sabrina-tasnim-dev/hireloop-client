"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  Bookmark,
  Briefcase,
  Building2,
  CirclePlus,
  CreditCard,
  FileText,
  LayoutGrid,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

type Role = "seeker" | "recruiter" | "admin"

type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutGrid },
    { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutGrid },
    { id: "add-job", name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: CirclePlus },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutGrid },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const role = (session?.user?.role as Role | undefined) ?? "seeker"
  const menuItems = menuItemsByRole[role]

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={pathname === item.url}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
