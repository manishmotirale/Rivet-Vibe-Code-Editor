"use client";

import Image from "next/image";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const AddRepo = () => {
  const handleOpenRepository = () => {
    // Connect your GitHub OAuth and repository selection flow here.
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleOpenRepository}
      aria-label="Open a GitHub repository"
      className="group relative h-auto w-full justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-accent/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
    >
      {/* Subtle violet background glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-300 group-hover:bg-primary/20"
      />

      {/* Card content */}
      <span className="relative z-10 flex min-w-0 items-center gap-4">
        {/* Action icon */}
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
          <ArrowDownToLine className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>

        {/* Text */}
        <span className="flex min-w-0 flex-col">
          <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Open GitHub Repository
          </span>

          <span className="mt-1 max-w-[240px] text-sm font-normal leading-5 text-muted-foreground">
            Import your repository and start coding in Rivet.
          </span>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Connect repository
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>

      {/* GitHub illustration */}
      <span className="relative z-10 hidden h-24 w-24 shrink-0 sm:block md:h-32 md:w-32">
        <Image
          src="/github.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 768px) 128px, 96px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </span>
    </Button>
  );
};

export default AddRepo;
