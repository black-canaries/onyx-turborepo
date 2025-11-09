export default function SupportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-display-sm font-semibold tracking-tight">
          Support
        </h1>
        <p className="text-md text-fg-quaternary">
          Get help and access documentation
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-lg font-semibold">Documentation</h3>
          <p className="text-sm text-fg-quaternary">
            Access comprehensive guides and tutorials
          </p>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-6">
          <h3 className="mb-2 text-lg font-semibold">Contact Support</h3>
          <p className="text-sm text-fg-quaternary">
            Reach out to our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
}
