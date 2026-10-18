import { Footer } from "@/features/home/components/footer";
import { Header } from "@/features/home/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Rivet",
    default: "Rivet — AI Development Workspace",
  },
  description:
    "Build, run, and ship projects in Rivet, your AI-powered development workspace.",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-background text-foreground transition-colors duration-300">
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:40px_40px]"
      />

      {/* Soft ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.09),transparent_65%)]"
      />

      {/* Main application header */}
      <div className="relative z-20">
        <Header />
      </div>

      {/* Page content */}
      <main className="relative z-10 flex-1">{children}</main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
