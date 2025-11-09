export default function AllProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          All Projects
        </h1>
        <p className="text-md text-fg-quaternary">
          Complete list of all projects
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-6">
        <h2 className="mb-4 text-lg font-semibold">Project List</h2>
        <p className="text-sm text-fg-quaternary">
          All projects across your organization will be displayed here, regardless of status.
        </p>
      </div>
    </div>
  );
}
