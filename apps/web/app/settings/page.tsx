export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-md text-fg-quaternary">
          Configure your application preferences
        </p>
      </div>

      <div className="grid gap-6">
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-lg font-semibold">General Settings</h3>
          <p className="text-sm text-fg-quaternary">
            Manage your account settings, preferences, and application configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
