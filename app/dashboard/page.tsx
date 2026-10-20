"use client";
import Image from "next/image";
import AddRepo from "@/features/dashbaord/components/add-repo";
import AddNewButton from "@/features/dashbaord/components/add-new-btn";
import ProjectTable from "@/features/dashbaord/components/project-table";
import {
  deleteProjectById,
  duplicateProjectById,
  editProjectById,
  getAllPlaygroundForUser,
} from "@/features/dashbaord/actions";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Image
      src="/empty-state.png"
      alt="No projects found in Rivet"
      width={768}
      height={512}
      className="h-auto w-full max-w-2xl object-contain"
    />

    <h2 className="text-xl font-semibold text-foreground">No projects found</h2>
    <p className="mt-2 text-sm text-muted-foreground">
      Create a new project to get started!
    </p>
  </div>
);

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();

  const hasProjects = Boolean(playgrounds && playgrounds.length > 0);

  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground transition-colors duration-200 sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage your projects and continue building with Rivet.
          </p>
        </div>

        {/* Create project actions */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <AddNewButton />
          <AddRepo />
        </div>

        {/* Projects section */}
        <section className="mt-10 w-full">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Your projects
            </h2>

            <span className="text-sm text-muted-foreground">
              {playgrounds?.length ?? 0}{" "}
              {(playgrounds?.length ?? 0) === 1 ? "project" : "projects"}
            </span>
          </div>

          {hasProjects ? (
            <ProjectTable
              projects={playgrounds}
              onDeleteProject={deleteProjectById}
              onUpdateProject={editProjectById}
              onDuplicateProject={duplicateProjectById}
            />
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardMainPage;
