import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-w-0">
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashBoardLayout
