import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { authStore } from "@/states/auth";
import { ModeToggle } from "./mode-toogle";

function Header({ title }: { title?: string }) {
  const { classroomId } = authStore((state) => state);

  return (
    <header className="fixed bg-secondary w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between calc-width-header px-4 box-border">
        <div className="flex items-center gap-2 desktop:gap-4">
          <SidebarTrigger className="ml-1" />
          <Breadcrumb >
            <BreadcrumbList className="white-space-nowrap flex-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{classroomId}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;
