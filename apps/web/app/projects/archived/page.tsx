export default function ArchivedProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Archived Projects
        </h1>
        <p className="text-md text-fg-quaternary">
          Completed and archived projects
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-6">
        <h2 className="mb-4 text-lg font-semibold">Archived Projects</h2>
        <p className="text-sm text-fg-quaternary">
          Browse through projects that have been completed or archived for future reference.
        </p>
      </div>
    </div>
  );
}
