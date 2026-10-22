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
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center sm:py-16">
    <Image
      src="/empty-state.png"
      alt="No projects found"
      width={480}
      height={320}
      className="mb-5 h-auto w-full max-w-sm object-contain"
    />
    <h2 className="text-xl font-semibold tracking-tight text-foreground">
      No projects yet
    </h2>
    <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
      Your next idea starts here. Create a playground and start building with
      Rivet.
    </p>
  </div>
);

const DashboardMainPage = async () => {
  const playgrounds = await getAllPlaygroundForUser();
  const projects = playgrounds ?? [];
  const projectCount = projects.length;

  return (
    <main className="min-h-screen w-full min-w-0 bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Page heading */}
        <header className="mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                RIVET WORKSPACE
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Dashboard
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                Manage your projects and continue building with Rivet.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-lg border border-border bg-card px-3 py-2 sm:self-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-sm text-muted-foreground">
                {projectCount} {projectCount === 1 ? "project" : "projects"}
              </span>
            </div>
          </div>
        </header>

        {/* Action cards: equal height and aligned content */}
        <section
          aria-label="Project actions"
          className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5"
        >
          <AddNewButton />
          <AddRepo />
        </section>

        {/* Projects */}
        <section className="mt-10 min-w-0">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                Your projects
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                All your development workspaces in one place.
              </p>
            </div>

            <span className="text-sm text-muted-foreground">
              {projectCount} {projectCount === 1 ? "project" : "projects"}
            </span>
          </div>

          {projectCount > 0 ? (
            <ProjectTable
              projects={projects}
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
