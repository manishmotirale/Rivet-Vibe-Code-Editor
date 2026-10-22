"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const AddRepo = () => {
  const handleOpenRepository = () => {
    window.open(
      "https://github.com/new/import",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleOpenRepository}
      aria-label="Open GitHub repository import"
      className="group relative flex h-auto min-h-[176px] w-full items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:scale-[1.01] hover:border-primary/50 hover:bg-accent/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
    >
      {/* Subtle Rivet glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-colors duration-300 group-hover:bg-primary/20"
      />

      {/* Content */}
      <span className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
          <ArrowDownToLine className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>

        <span className="flex min-w-0 flex-col items-start">
          <span className="text-left text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Open GitHub Repository
          </span>

          <span className="mt-1 max-w-[260px] text-left text-sm font-normal leading-5 text-muted-foreground">
            Work with your repositories in the Rivet editor.
          </span>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
            Import repository
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </span>

      {/* GitHub illustration */}
      <span className="relative z-10 hidden h-24 w-24 shrink-0 sm:block md:h-28 md:w-28">
        <Image
          src="/github.png"
          alt=""
          aria-hidden="true"
          width={112}
          height={112}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </span>
    </Button>
  );
};

export default AddRepo;
