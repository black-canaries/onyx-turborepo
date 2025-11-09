export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-md text-fg-quaternary">
          Overview of your key metrics and activities
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-sm font-medium text-fg-quaternary">
            Total Projects
          </h3>
          <p className="text-display-sm font-semibold">24</p>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-sm font-medium text-fg-quaternary">
            Active Tasks
          </h3>
          <p className="text-display-sm font-semibold">10</p>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-sm font-medium text-fg-quaternary">
            Team Members
          </h3>
          <p className="text-display-sm font-semibold">12</p>
        </div>
      </div>
    </div>
  );
}
