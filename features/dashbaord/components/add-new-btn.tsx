"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowUpRight, Plus } from "lucide-react";

import TemplateSelectionModal from "./template-selection-modal";
import { Button } from "@/components/ui/button";
import { createPlayground } from "../actions";

type PlaygroundTemplate = {
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
};

const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: PlaygroundTemplate) => {
    if (isCreating) return;

    setIsCreating(true);

    try {
      const result = await createPlayground(data);

      if (!result?.id) {
        toast.error("Unable to create playground. Please try again.");
        return;
      }

      toast.success("Playground created successfully!");
      setIsModalOpen(false);
      router.push(`/playground/${result.id}`);
    } catch (error) {
      console.error("Failed to create playground:", error);
      toast.error("Failed to create playground. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsModalOpen(true)}
        disabled={isCreating}
        aria-label="Create a new playground"
        className="group relative flex h-auto min-h-[176px] w-full items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-accent/30 hover:shadow-lg hover:shadow-primary/5 focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/15"
        />

        <span className="relative z-10 flex min-w-0 flex-1 items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
          </span>

          <span className="flex min-w-0 flex-col items-start">
            <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Add New
            </span>

            <span className="mt-1 text-sm font-normal leading-5 text-muted-foreground">
              Create a new playground
            </span>

            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Get started
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </span>
        </span>

        <span className="relative z-10 hidden h-24 w-24 shrink-0 sm:block md:h-28 md:w-28">
          <Image
            src="/add-new.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 768px) 112px, 96px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </span>
      </Button>

      <TemplateSelectionModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isCreating) setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddNewButton;
