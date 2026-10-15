import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// Next.js handles this global stylesheet at build time.
// @ts-ignore — no standalone TypeScript declarations are needed for CSS.
import "./global.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/provider/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Rivet — Build Without Friction",
    template: "%s | Rivet",
  },
  description:
    "Rivet is your AI-powered development workspace. Prompt, code, run, and bring your ideas to life without friction.",
  applicationName: "Rivet",
  keywords: [
    "Rivet",
    "AI IDE",
    "AI development",
    "online code editor",
    "AI coding workspace",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} min-h-screen font-sans antialiased`}
      >
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
