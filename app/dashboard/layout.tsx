import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/features/dashbaord/components/dashboard-siderbar";
import type React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const playgroundData = await getAllPlaygroundForUser();

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "Flame",
    ANGULAR: "Terminal",
  };

  const formattedPlaygroundData =
    playgroundData?.map((item) => ({
      id: item.id,
      name: item.title,
      starred: item.Starmark?.[0]?.isMarked || false,
      icon: technologyIconMap[item.template] || "Code2",
    })) || [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden bg-background text-foreground transition-colors duration-300">
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />

        <main className="min-w-0 flex-1 bg-background">
          <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
