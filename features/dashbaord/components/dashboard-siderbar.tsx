"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Code2,
  Compass,
  Database,
  Flame,
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

interface DashboardSidebarProps {
  initialPlaygroundData: PlaygroundData[];
}

const lucideIconMap: Record<string, LucideIcon> = {
  Zap,
  Lightbulb,
  Database,
  Compass,
  Flame,
  Terminal,
  Code2,
};

export function DashboardSidebar({
  initialPlaygroundData,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const starredPlaygrounds = useMemo(
    () => initialPlaygroundData.filter((playground) => playground.starred),
    [initialPlaygroundData],
  );

  const recentPlaygrounds = initialPlaygroundData;

  const isPlaygroundActive = (id: string) =>
    pathname === `/playground/${id}` ||
    pathname.startsWith(`/playground/${id}/`);

  const renderPlayground = (playground: PlaygroundData) => {
    const IconComponent = lucideIconMap[playground.icon] ?? Code2;
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
            <span
              aria-hidden="true"
              className="absolute bottom-2 left-0 top-2 w-0.5 rounded-full bg-primary"
            />
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
      <SidebarHeader className="px-3 pt-4">
        <Link
          href="/"
          aria-label="Rivet home"
          className="flex h-20 items-center justify-start rounded-lg px-2 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <Image
            src="/rivet-logo.gif"
            alt="Rivet"
            width={240}
            height={80}
            priority
            className="h-16 w-full max-w-[200px] object-contain object-left"
          />
        </Link>

        <div className="mx-3 mt-3 border-t border-sidebar-border" />
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Workspace navigation */}
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
            title="View starred projects"
            aria-label="View starred projects"
            className="rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
            onClick={() => {
              window.location.href = "/playgrounds?filter=starred";
            }}
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
            title="Create a new playground"
            aria-label="Create a new playground"
            className="rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
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
                  isActive={pathname === "/playgrounds"}
                  tooltip="View all playgrounds"
                  className="h-9 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
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
