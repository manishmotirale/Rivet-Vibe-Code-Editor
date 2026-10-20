"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, ArrowUpRight } from "lucide-react";

import TemplateSelectionModal from "@/components/modal/template-selector-modal";
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
      const res = await createPlayground(data);

      if (!res?.id) {
        toast.error("Unable to create playground. Please try again.");
        return;
      }

      toast.success("Playground created successfully!");
      setIsModalOpen(false);
      router.push(`/playground/${res.id}`);
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
        onClick={() => setIsModalOpen(true)}
        className="group flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-accent/40 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
        aria-label="Create a new playground"
      >
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-primary transition-all duration-200 group-hover:border-primary/40 group-hover:bg-primary/10">
            <Plus
              size={23}
              className="transition-transform duration-200 group-hover:rotate-90"
            />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Add New
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a new playground
            </p>

            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Get started
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        <div className="relative hidden h-24 w-24 shrink-0 overflow-hidden sm:block">
          <Image
            src="/add-new.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="96px"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
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
