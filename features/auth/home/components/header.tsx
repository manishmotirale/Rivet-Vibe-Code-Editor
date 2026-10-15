import Link from "next/link";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import UserButton from "../../components/user-button";
import GithubIcon from "@/components/ui/github-icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-xl border border-border bg-background/95 px-3 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5">
        {/* Brand and navigation */}
        <div className="flex min-w-0 items-center">
          <Link
            href="/"
            aria-label="Rivet home"
            className="flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image
              src="/rivet-logo.gif"
              alt="Rivet"
              width={140}
              height={70}
              priority
              unoptimized
              className="h-10 w-[100px] object-contain object-left"
            />
          </Link>

          <div className="mx-4 hidden h-5 w-px bg-border sm:block" />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 sm:flex"
          >
            <Link
              href="/docs"
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>

            <Link
              href="/api"
              className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              API
              <span className="rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                NEW
              </span>
            </Link>
          </nav>
        </div>

        {/* Header actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="https://github.com/manishmotirale"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </Link>

          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

          <ThemeToggle />

          <div className="ml-1 flex items-center border-l border-border pl-2">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
