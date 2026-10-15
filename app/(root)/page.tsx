import { Button } from "@/components/ui/button";
import GithubIcon from "@/components/ui/github-icon";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Play,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Bot,
    title: "AI-powered coding",
    description: "Build with intelligence",
  },
  {
    icon: Play,
    title: "Instant preview",
    description: "Run directly in your browser",
  },
  {
    icon: Sparkles,
    title: "Ready-made templates",
    description: "Start with less setup",
  },
];

export default function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">
      <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8 lg:px-10 lg:py-20">
        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Meet your AI development workspace</span>
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Turn your ideas into{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              working code.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Meet Rivet, your AI-powered coding workspace. Build applications,
            explore ideas, and bring your projects to life in your browser.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/dashboard">
              <Button
                variant="brand"
                size="lg"
                className="group h-12 gap-2 px-6"
              >
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link
              href="https://github.com/manishmotirale/Rivet-Vibe-Code-Editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-12 gap-2 border-border px-5"
              >
                <GithubIcon className="h-4 w-4" />
                Explore GitHub
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
            <div className="flex -space-x-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-violet-500/15 text-violet-500">
                <Bot className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-blue-500/15 text-blue-500">
                <Play className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-cyan-500/15 text-cyan-600">
                <Sparkles className="h-4 w-4" />
              </span>
            </div>

            <div>
              <p className="text-sm font-medium">Prompt. Code. Run.</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                One workspace for your ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="pointer-events-none absolute inset-10 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-violet-950/10">
            <Image
              src="/hero1.png"
              alt="Rivet AI IDE with an intelligent coding workspace, code editor, browser preview, and AI assistant"
              width={1500}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>

          <div className="absolute -bottom-4 -left-3 hidden items-center gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-xl backdrop-blur-xl sm:flex lg:-left-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium">Your ideas, connected.</p>
              <p className="text-xs text-muted-foreground">
                From prompt to application
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3 sm:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">{feature.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
