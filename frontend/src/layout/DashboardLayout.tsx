import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import {
  IconChartBar,
  IconHelp,
  IconInnerShadowTop,
  IconSettings,
  IconBuildingStore,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
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
  ],
  navSecondary: [
    {
      key: 'settings',
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      key: 'help',
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
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
  const { user_data } = useSelector((state: any) => state.data);
  const activeModule = getModuleFromPath(location.pathname);

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
                  <IconInnerShadowTop className="size-5" />
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
          {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user_data} />
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
