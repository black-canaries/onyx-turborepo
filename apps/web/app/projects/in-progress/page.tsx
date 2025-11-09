export default function InProgressProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          In Progress Projects
        </h1>
        <p className="text-md text-fg-quaternary">
          Projects currently being worked on
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">In Progress (12)</h2>
        </div>
        <p className="text-sm text-fg-quaternary">
          This page shows the 12 projects that are currently in progress, as indicated by the badge in the navigation.
        </p>
      </div>
    </div>
  );
}
