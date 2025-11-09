export default function TasksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Tasks
        </h1>
        <p className="text-md text-fg-quaternary">
          Manage and track your active tasks
        </p>
      </div>

      <div className="rounded-xl border border-secondary bg-primary p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Tasks (10)</h2>
        </div>
        <p className="text-sm text-fg-quaternary">
          Your task list will appear here. This page corresponds to the Tasks navigation item with a badge showing 10 active tasks.
        </p>
      </div>
    </div>
  );
}
