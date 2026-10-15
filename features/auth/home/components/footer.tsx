import GithubIcon from "@/components/ui/github-icon";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/80 bg-background/80">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row sm:px-8">
        {/* Brand and copyright */}
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">Rivet</span>
          <span className="mx-2 text-muted-foreground">·</span>
          Build without friction.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/manishmotirale/Rivet-Vibe-Code-Editor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rivet on GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-all duration-200 hover:border-border hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
