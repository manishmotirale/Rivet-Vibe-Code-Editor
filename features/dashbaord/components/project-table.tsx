"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  ExternalLink,
  Copy,
  Link as LinkIcon,
  Eye,
  Code2,
  CalendarDays,
  UserRound,
  Star,
} from "lucide-react";
import { toast } from "sonner";

import type { Project } from "../types";
import { MarkedToggleButton } from "./toggle-star";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectTableProps {
  projects: Project[];
  onUpdateProject?: (
    id: string,
    data: { title: string; description: string },
  ) => Promise<void>;
  onDeleteProject?: (id: string) => Promise<void>;
  onDuplicateProject?: (id: string) => Promise<void>;
  onMarkasFavorite?: (id: string) => Promise<void>;
}

interface EditProjectData {
  title: string;
  description: string;
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
  onMarkasFavorite,
}: ProjectTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [editData, setEditData] = useState<EditProjectData>({
    title: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    "edit" | "delete" | "duplicate" | "favorite" | null
  >(null);

  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setEditData({
      title: project.title,
      description: project.description || "",
    });
    setEditDialogOpen(true);
  };

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) {
      toast.error("Project update is unavailable.");
      return;
    }

    const title = editData.title.trim();

    if (!title) {
      toast.error("Project title cannot be empty.");
      return;
    }

    setIsLoading(true);
    setLoadingAction("edit");

    try {
      await onUpdateProject(selectedProject.id, {
        title,
        description: editData.description.trim(),
      });

      setEditDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project updated successfully.");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) {
      toast.error("Project deletion is unavailable.");
      return;
    }

    setIsLoading(true);
    setLoadingAction("delete");

    try {
      await onDeleteProject(selectedProject.id);

      setDeleteDialogOpen(false);
      setSelectedProject(null);
      toast.success("Project deleted successfully.");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  const handleDuplicateProject = async (project: Project) => {
    if (!onDuplicateProject) {
      toast.error("Project duplication is unavailable.");
      return;
    }

    setIsLoading(true);
    setLoadingAction("duplicate");

    try {
      await onDuplicateProject(project.id);
      toast.success("Project duplicated successfully.");
    } catch (error) {
      console.error("Error duplicating project:", error);
      toast.error("Failed to duplicate project.");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  const handleMarkAsFavorite = async (project: Project) => {
    if (!onMarkasFavorite) {
      toast.error("Favorite action is unavailable.");
      return;
    }

    setIsLoading(true);
    setLoadingAction("favorite");

    try {
      await onMarkasFavorite(project.id);
      toast.success("Favorite status updated.");
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite status.");
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  const copyProjectUrl = async (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Project URL copied to clipboard.");
    } catch (error) {
      console.error("Error copying project URL:", error);
      toast.error("Could not copy the project URL.");
    }
  };

  const formatCreatedDate = (date: Project["createdAt"]) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown";
    }

    return format(parsedDate, "MMM d, yyyy");
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col gap-1 border-b border-border px-5 py-4 sm:px-6">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            All projects
          </h3>
          <p className="text-sm text-muted-foreground">
            Manage your playgrounds and development workspaces.
          </p>
        </div>

        {/* Projects table */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border bg-muted/40 hover:bg-muted/40">
                <TableHead className="min-w-[220px] px-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-6">
                  Project
                </TableHead>

                <TableHead className="min-w-[130px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Template
                </TableHead>

                <TableHead className="min-w-[140px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Created
                </TableHead>

                <TableHead className="min-w-[160px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Owner
                </TableHead>

                <TableHead className="w-[60px] pr-5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {projects.map((project) => {
                const ownerName = project.user?.name || "Unknown user";
                const ownerImage = project.user?.image || "/placeholder.svg";
                const isFavorite = Boolean(project.Starmark?.[0]?.isMarked);

                return (
                  <TableRow
                    key={project.id}
                    className="border-border transition-colors hover:bg-muted/30"
                  >
                    {/* Project name and description */}
                    <TableCell className="px-5 py-4 sm:px-6">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
                          <Code2 className="h-4 w-4" />
                        </div>

                        <div className="flex min-w-0 flex-col gap-1">
                          <Link
                            href={`/playground/${project.id}`}
                            className="w-fit max-w-full truncate text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {project.title}
                          </Link>

                          <p className="line-clamp-2 max-w-[300px] text-xs leading-5 text-muted-foreground">
                            {project.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Template badge */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="rounded-md border-primary/25 bg-primary/10 font-medium text-primary"
                      >
                        {project.template}
                      </Badge>
                    </TableCell>

                    {/* Created date */}
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        <span>{formatCreatedDate(project.createdAt)}</span>
                      </div>
                    </TableCell>

                    {/* Owner */}
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                          {project.user?.image ? (
                            <Image
                              src={ownerImage}
                              alt={ownerName}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <UserRound className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        <span className="max-w-[130px] truncate text-sm text-foreground">
                          {ownerName}
                        </span>
                      </div>
                    </TableCell>

                    {/* Project actions */}
                    <TableCell className="pr-5 text-right sm:pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"
                            aria-label={`Actions for ${project.title}`}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-52 border-border bg-popover p-1.5"
                        >
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              void handleMarkAsFavorite(project);
                            }}
                            disabled={!onMarkasFavorite || isLoading}
                            className="cursor-pointer gap-2"
                          >
                            <Star
                              className={`h-4 w-4 ${
                                isFavorite
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            {isFavorite
                              ? "Update favorite"
                              : "Add to favorites"}
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link
                              href={`/playground/${project.id}`}
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <Eye className="h-4 w-4 text-muted-foreground" />
                              Open project
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem asChild>
                            <Link
                              href={`/playground/${project.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex cursor-pointer items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              Open in new tab
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-border" />

                          <DropdownMenuItem
                            onSelect={() => handleEditClick(project)}
                            disabled={!onUpdateProject || isLoading}
                            className="cursor-pointer gap-2"
                          >
                            <Edit3 className="h-4 w-4 text-muted-foreground" />
                            Edit project
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onSelect={() => {
                              void handleDuplicateProject(project);
                            }}
                            disabled={!onDuplicateProject || isLoading}
                            className="cursor-pointer gap-2"
                          >
                            <Copy className="h-4 w-4 text-muted-foreground" />
                            Duplicate project
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onSelect={() => {
                              void copyProjectUrl(project.id);
                            }}
                            className="cursor-pointer gap-2"
                          >
                            <LinkIcon className="h-4 w-4 text-muted-foreground" />
                            Copy project URL
                          </DropdownMenuItem>

                          <DropdownMenuSeparator className="bg-border" />

                          <DropdownMenuItem
                            onSelect={() => {
                              setSelectedProject(project);
                              setDeleteDialogOpen(true);
                            }}
                            disabled={!onDeleteProject || isLoading}
                            className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}

              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-36 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Code2 className="h-8 w-8 text-muted-foreground/50" />
                      <p className="text-sm font-medium text-foreground">
                        No projects found
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Create a new playground to get started.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table footer */}
        {projects.length > 0 && (
          <div className="border-t border-border bg-muted/20 px-5 py-3 sm:px-6">
            <p className="text-xs text-muted-foreground">
              Showing {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        )}
      </div>

      {/* Edit project dialog */}
      <Dialog
        open={editDialogOpen}
        onOpenChange={(open) => {
          if (!isLoading) {
            setEditDialogOpen(open);
          }
        }}
      >
        <DialogContent className="border-border bg-background sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit project</DialogTitle>

            <DialogDescription className="text-muted-foreground">
              Update your project's name and description.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-3">
            <div className="grid gap-2">
              <Label htmlFor="project-title">Project title</Label>

              <Input
                id="project-title"
                value={editData.title}
                onChange={(event) =>
                  setEditData((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                placeholder="Enter project title"
                maxLength={100}
                disabled={isLoading}
                className="border-border bg-background"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>

              <Textarea
                id="project-description"
                value={editData.description}
                onChange={(event) =>
                  setEditData((previous) => ({
                    ...previous,
                    description: event.target.value,
                  }))
                }
                placeholder="Describe your project"
                rows={4}
                maxLength={1000}
                disabled={isLoading}
                className="resize-none border-border bg-background"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={() => void handleUpdateProject()}
              disabled={isLoading || !editData.title.trim()}
              className="gap-2"
            >
              {loadingAction === "edit" && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              {loadingAction === "edit" ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!isLoading) {
            setDeleteDialogOpen(open);
          }
        }}
      >
        <AlertDialogContent className="border-border bg-background">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Delete project?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {selectedProject?.title}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void handleDeleteProject();
              }}
              disabled={isLoading || !onDeleteProject}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loadingAction === "delete" && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              {loadingAction === "delete" ? "Deleting..." : "Delete project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
