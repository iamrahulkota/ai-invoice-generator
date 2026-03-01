import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { handleLogout } from "@/lib/utils";
import {
  IconChartBar,
  IconBuildingStore,
  IconPackage,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";
import { SiteHeader } from "@/components/site-header";
import { useSelector } from "react-redux";
import { NavUser } from "@/components/nav-user";

const data = {
  navMain: [
    {
      key: 'dashboard',
      title: "Dashboard",
      url: "/dashboard",
      icon: IconChartBar,
    },
    {
      key: 'shops',
      title: "Shops",
      url: "/dashboard/shops",
      icon: IconBuildingStore,
    },
    {
      key: 'stock',
      title: "Stock",
      url: "/dashboard/stock",
      icon: IconPackage,
      locked: true,
    }
  ],
};

const getModuleFromPath = (path: string) => {
  const parts = path.split('/').filter(Boolean);
  const segment = parts[0] === 'dashboard' ? (parts[1] ?? 'dashboard') : parts[0];
  if (data.navMain.find((item) => item.key === segment)) {
    return segment;
  }
  return 'dashboard';
};

export default function DashboardLayout({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { user } = useSelector((state: any) => state.data);
  const activeModule = getModuleFromPath(location.pathname);


  const handleLogoutClick = () => {
    handleLogout();
  }

  return (
    <SidebarProvider className="bg-sidebar">
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5"
              >
                <Link to={"/"}>
                  <span className="text-base font-semibold">
                    Invoice Generator
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} activeModule={activeModule} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} handleLogoutClick={handleLogoutClick} />
        </SidebarFooter>
      </Sidebar>
      <div className="bg-background w-full overflow-y-auto overflow-x-hidden flex-col m-0 md:m-2.5 rounded-lg">
        <SiteHeader activeModule={activeModule} />
        <div className="p-2 md:p-4">
        <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
