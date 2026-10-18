"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Code2,
  Compass,
  FolderPlus,
  History,
  Home,
  LayoutDashboard,
  Lightbulb,
  type LucideIcon,
  Plus,
  Settings,
  Star,
  Terminal,
  Zap,
  Database,
  Flame,
  ChevronRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

interface PlaygroundData {
  id: string;
  name: string;
  icon: string;
  starred: boolean;
}

const lucideIconMap: Record<string, LucideIcon> = {
  Zap,
  Lightbulb,
  Database,
  Compass,
  Flame,
  FlameIcon: Flame,
  Terminal,
  Code2,
};

export function DashboardSidebar({
  initialPlaygroundData,
}: {
  initialPlaygroundData: PlaygroundData[];
}) {
  const pathname = usePathname();

  const [starredPlaygrounds] = useState(
    initialPlaygroundData.filter((playground) => playground.starred),
  );

  const [recentPlaygrounds] = useState(initialPlaygroundData);

  const isPlaygroundActive = (id: string) => pathname === `/playground/${id}`;

  const renderPlayground = (playground: PlaygroundData) => {
    const IconComponent = lucideIconMap[playground.icon] || Code2;
    const active = isPlaygroundActive(playground.id);

    return (
      <SidebarMenuItem key={playground.id}>
        <SidebarMenuButton
          render={<Link href={`/playground/${playground.id}`} />}
          isActive={active}
          tooltip={playground.name}
          className="group relative h-9 rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary"
        >
          {active && (
            <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-primary" />
          )}

          <IconComponent className="h-4 w-4 shrink-0" />
          <span className="truncate">{playground.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {/* Brand */}
      <SidebarHeader className="px-2 pt-3">
        <Link
          href="/"
          aria-label="Rivet home"
          className="flex h-12 items-center gap-3 rounded-lg px-3 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <Image
            src="/rivet-logo.gif"
            alt="Rivet"
            width={32}
            height={32}
            priority
            className="h-8 w-8 shrink-0 object-contain"
          />

          <span className="text-base font-semibold tracking-tight">
            Rivet<span className="ml-1 text-primary">.</span>
          </span>
        </Link>

        <div className="mx-3 mt-3 border-t border-sidebar-border" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/" />}
                  isActive={pathname === "/"}
                  tooltip="Home"
                  className="h-9 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/dashboard" />}
                  isActive={
                    pathname === "/dashboard" ||
                    pathname.startsWith("/dashboard/")
                  }
                  tooltip="Dashboard"
                  className="h-9 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Starred projects */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Star className="mr-2 h-3.5 w-3.5" />
            Starred
          </SidebarGroupLabel>

          <SidebarGroupAction
            title="Add starred playground"
            aria-label="Add starred playground"
            className="rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
          >
            <Plus className="h-4 w-4" />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              {starredPlaygrounds.length > 0 ? (
                starredPlaygrounds.map(renderPlayground)
              ) : (
                <SidebarMenuItem>
                  <div className="px-3 py-3 text-xs leading-5 text-muted-foreground">
                    No starred projects yet.
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent projects */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <History className="mr-2 h-3.5 w-3.5" />
            Recent
          </SidebarGroupLabel>

          <SidebarGroupAction
            title="Create new playground"
            aria-label="Create new playground"
            className="rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
          >
            <FolderPlus className="h-4 w-4" />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <SidebarMenu>
              {recentPlaygrounds.length > 0 ? (
                recentPlaygrounds.map(renderPlayground)
              ) : (
                <SidebarMenuItem>
                  <div className="px-3 py-3 text-xs leading-5 text-muted-foreground">
                    Create your first playground to get started.
                  </div>
                </SidebarMenuItem>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/playgrounds" />}
                  tooltip="View all playgrounds"
                  className="h-9 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                >
                  <span>View all playgrounds</span>
                  <ChevronRight className="ml-auto h-3.5 w-3.5" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2 pb-3">
        <div className="mx-3 mb-2 border-t border-sidebar-border" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/settings" />}
              isActive={
                pathname === "/settings" || pathname.startsWith("/settings/")
              }
              tooltip="Settings"
              className="h-9 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-3 pt-2">
          <p className="text-[10px] text-muted-foreground">
            Rivet <span className="text-primary">•</span> Prompt · Code · Run
          </p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
