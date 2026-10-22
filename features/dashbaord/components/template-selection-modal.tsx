"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Code2,
  Globe,
  Layers3,
  Plus,
  Search,
  Server,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

type PlaygroundTemplate =
  | "REACT"
  | "NEXTJS"
  | "EXPRESS"
  | "VUE"
  | "HONO"
  | "ANGULAR";

type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: PlaygroundTemplate;
    description?: string;
  }) => void;
};

type TemplateOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularity: number;
  tags: string[];
  features: string[];
  category: "frontend" | "backend" | "fullstack";
};

const templates: TemplateOption[] = [
  {
    id: "react",
    name: "React",
    description:
      "Build interactive interfaces with reusable components and a flexible UI architecture.",
    icon: "/react.svg",
    color: "#61DAFB",
    popularity: 5,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Component-Based", "Virtual DOM", "JSX Support"],
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "Build production-ready React applications with server rendering and routing.",
    icon: "/nextjs-icon.svg",
    color: "#F4F6FC",
    popularity: 5,
    tags: ["React", "SSR", "Fullstack"],
    features: ["Server Components", "API Routes", "File-based Routing"],
    category: "fullstack",
  },
  {
    id: "express",
    name: "Express",
    description:
      "Create lightweight Node.js servers, APIs, and backend applications.",
    icon: "/expressjs-icon.svg",
    color: "#F4F6FC",
    popularity: 4,
    tags: ["Node.js", "API", "Backend"],
    features: ["Middleware", "Routing", "HTTP Utilities"],
    category: "backend",
  },
  {
    id: "vue",
    name: "Vue.js",
    description:
      "Create responsive interfaces with an approachable reactive framework.",
    icon: "/vuejs-icon.svg",
    color: "#4FC08D",
    popularity: 4,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
    category: "frontend",
  },
  {
    id: "hono",
    name: "Hono",
    description:
      "Build fast, lightweight web applications using modern web standards.",
    icon: "/hono.svg",
    color: "#E36002",
    popularity: 3,
    tags: ["Node.js", "TypeScript", "Backend"],
    features: ["Lightweight Routing", "TypeScript Support", "Web Standards"],
    category: "backend",
  },
  {
    id: "angular",
    name: "Angular",
    description:
      "Build structured, scalable web applications with a comprehensive framework.",
    icon: "/angular-2.svg",
    color: "#DD0031",
    popularity: 3,
    tags: ["Frontend", "TypeScript", "Fullstack"],
    features: ["Dependency Injection", "TypeScript", "Component System"],
    category: "fullstack",
  },
];

const templateMap: Record<string, PlaygroundTemplate> = {
  react: "REACT",
  nextjs: "NEXTJS",
  express: "EXPRESS",
  vue: "VUE",
  hono: "HONO",
  angular: "ANGULAR",
};

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  fullstack: Globe,
};

const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TemplateSelectionModalProps) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");
  const [projectName, setProjectName] = useState("");

  const selectedOption = templates.find(
    (template) => template.id === selectedTemplate,
  );

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return templates.filter((template) => {
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesCategory =
        category === "all" || template.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  const resetState = () => {
    setStep("select");
    setSelectedTemplate(null);
    setSearchQuery("");
    setCategory("all");
    setProjectName("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCreateProject = () => {
    if (!selectedOption) return;

    const title = projectName.trim() || `New ${selectedOption.name} Project`;

    onSubmit({
      title,
      template: templateMap[selectedOption.id],
      description: selectedOption.description,
    });

    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden border-border bg-background p-0 text-foreground shadow-2xl shadow-primary/10 sm:max-w-[820px]">
        {/* Header */}
        <DialogHeader className="border-b border-border bg-card/60 px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              {step === "select" ? (
                <Layers3 className="h-5 w-5" />
              ) : (
                <Sparkles className="h-5 w-5" />
              )}
            </div>

            <div className="min-w-0">
              <DialogTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                {step === "select"
                  ? "Create a playground"
                  : "Configure your project"}
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm leading-5 text-muted-foreground">
                {step === "select"
                  ? "Choose your stack and start building in Rivet."
                  : `Set up your ${selectedOption?.name ?? ""} workspace.`}
              </DialogDescription>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div
              className={`h-1 flex-1 rounded-full ${
                step === "select" ? "bg-primary" : "bg-primary/40"
              }`}
            />
            <div
              className={`h-1 flex-1 rounded-full ${
                step === "configure" ? "bg-primary" : "bg-muted"
              }`}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className={step === "select" ? "text-primary" : ""}>
              01 · Choose template
            </span>
            <span className={step === "configure" ? "text-primary" : ""}>
              02 · Project details
            </span>
          </div>
        </DialogHeader>

        {step === "select" ? (
          <>
            {/* Search and category filters */}
            <div className="space-y-4 px-5 pt-5 sm:px-7">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder="Search frameworks and technologies..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-11 border-border bg-card pl-10 placeholder:text-muted-foreground/70 focus-visible:ring-primary/40"
                />
              </div>

              <Tabs
                value={category}
                onValueChange={(value) =>
                  setCategory(
                    value as "all" | "frontend" | "backend" | "fullstack",
                  )
                }
              >
                <TabsList className="grid h-auto w-full grid-cols-4 rounded-xl border border-border bg-card p-1">
                  {[
                    { value: "all", label: "All" },
                    { value: "frontend", label: "Frontend" },
                    { value: "backend", label: "Backend" },
                    { value: "fullstack", label: "Fullstack" },
                  ].map((item) => (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="rounded-lg px-2 py-2 text-xs transition-all data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:shadow-none sm:text-sm"
                    >
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">
                  Available templates
                </p>
                <span className="text-xs text-muted-foreground">
                  {filteredTemplates.length}{" "}
                  {filteredTemplates.length === 1 ? "template" : "templates"}
                </span>
              </div>
            </div>

            {/* Template cards */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-7">
              <RadioGroup
                value={selectedTemplate ?? ""}
                onValueChange={setSelectedTemplate}
                className="grid grid-cols-1 gap-3 md:grid-cols-2"
              >
                {filteredTemplates.map((template) => {
                  const isSelected = selectedTemplate === template.id;
                  const CategoryIcon = categoryIcons[template.category];

                  return (
                    <div key={template.id} className="relative">
                      <RadioGroupItem
                        value={template.id}
                        id={`template-${template.id}`}
                        className="sr-only"
                      />

                      <label
                        htmlFor={`template-${template.id}`}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`group relative flex h-full min-h-[180px] cursor-pointer flex-col rounded-xl border p-4 transition-all duration-200 sm:p-5 ${
                          isSelected
                            ? "border-primary bg-primary/[0.07] shadow-[0_0_0_1px_rgba(139,92,246,0.25),0_8px_30px_rgba(139,92,246,0.08)]"
                            : "border-border bg-card hover:border-primary/40 hover:bg-accent/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background"
                            style={{
                              boxShadow: isSelected
                                ? "0 0 24px rgba(139,92,246,0.12)"
                                : undefined,
                            }}
                          >
                            <Image
                              src={template.icon}
                              alt={`${template.name} logo`}
                              width={30}
                              height={30}
                              className="object-contain"
                            />
                          </div>

                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold tracking-tight text-foreground">
                                {template.name}
                              </h3>
                              {template.popularity >= 5 && (
                                <span className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                                  Popular
                                </span>
                              )}
                            </div>

                            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <CategoryIcon className="h-3.5 w-3.5" />
                              <span className="capitalize">
                                {template.category}
                              </span>
                            </div>
                          </div>

                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-transparent group-hover:border-primary/50"
                            }`}
                          >
                            <Check className="h-3 w-3" />
                          </div>
                        </div>

                        <p className="mt-4 line-clamp-2 text-sm leading-5 text-muted-foreground">
                          {template.description}
                        </p>

                        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                          {template.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-border bg-background/70 px-2 py-1 text-[11px] text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </label>
                    </div>
                  );
                })}

                {filteredTemplates.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-5 py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                      <Search className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">No templates found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Try another search term or category.
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-primary hover:text-primary"
                      onClick={() => {
                        setSearchQuery("");
                        setCategory("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </RadioGroup>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-3 border-t border-border bg-card/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-4 w-4 shrink-0" />
                <span>
                  {selectedOption
                    ? "Your workspace will be ready to configure."
                    : "Select a template to continue."}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("configure")}
                  disabled={!selectedTemplate}
                  className="gap-2 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Project configuration */}
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
              <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-4 sm:p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                    {selectedOption && (
                      <Image
                        src={selectedOption.icon}
                        alt={`${selectedOption.name} logo`}
                        width={34}
                        height={34}
                        className="object-contain"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">
                        {selectedOption?.name}
                      </h3>
                      <span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        Selected
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {selectedOption?.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-name">Project name</Label>
                <Input
                  id="project-name"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="my-awesome-project"
                  maxLength={80}
                  className="h-11 border-border bg-card focus-visible:ring-primary/40"
                />
                <p className="text-xs text-muted-foreground">
                  Choose a name for your new Rivet workspace.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">
                  Included features
                </h3>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {selectedOption?.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-card/70 px-3 py-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Zap className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-3.5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs leading-5 text-muted-foreground">
                  Ready to build? Create your workspace and start developing
                  with Rivet.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border bg-card/40 px-5 py-4 sm:px-7">
              <Button
                variant="outline"
                onClick={() => setStep("select")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                onClick={handleCreateProject}
                disabled={!selectedOption}
                className="gap-2 bg-primary text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                Create project
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
