import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Next.js handles this stylesheet import during the build.
// @ts-expect-error The CSS module is resolved by Next.js, not TypeScript.
import "./global.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#080A12] font-sans text-[#F4F6FC] antialiased`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
