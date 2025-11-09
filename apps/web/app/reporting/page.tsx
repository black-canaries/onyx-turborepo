export default function ReportingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Reporting
        </h1>
        <p className="text-md text-fg-quaternary">
          Analytics and insights for your projects
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h2 className="mb-4 text-lg font-semibold">Report Overview</h2>
          <p className="text-sm text-fg-quaternary">
            View detailed analytics, charts, and reports for your projects and tasks. This page will display various metrics and visualizations.
          </p>
        </div>
      </div>
    </div>
  );
}
