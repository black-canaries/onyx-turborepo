export default function ProjectSettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Project Settings
        </h1>
        <p className="text-md text-fg-quaternary">
          Configure project-specific settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-lg font-semibold">Project Configuration</h3>
          <p className="text-sm text-fg-quaternary">
            Manage project settings, permissions, and configurations. Configure defaults for new projects and adjust existing project parameters.
          </p>
        </div>
      </div>
    </div>
  );
}
