export default function ActiveProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Active Projects
        </h1>
        <p className="text-md text-fg-quaternary">
          Currently active projects
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-6">
        <h2 className="mb-4 text-lg font-semibold">Active Projects</h2>
        <p className="text-sm text-fg-quaternary">
          View and manage projects that are currently active and require attention.
        </p>
      </div>
    </div>
  );
}
