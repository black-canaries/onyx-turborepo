'use client';

import { Button } from "@repo/ui";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-display-md font-semibold tracking-tight">
            Welcome to Onyx
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-fg-quaternary">
            A modern full-stack monorepo built with Untitled UI components.
            Beautiful, accessible, and ready to scale.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button color="primary" size="lg">
              Get Started
            </Button>
            <Button color="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-secondary bg-primary p-6">
            <div className="mb-4 inline-flex rounded-lg bg-brand-solid/10 p-3">
              <svg
                className="size-6 text-brand-solid"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Lightning Fast</h3>
            <p className="text-sm text-fg-quaternary">
              Built on modern web technologies for optimal performance and user experience.
            </p>
          </div>

          <div className="rounded-xl border border-secondary bg-primary p-6">
            <div className="mb-4 inline-flex rounded-lg bg-brand-solid/10 p-3">
              <svg
                className="size-6 text-brand-solid"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Secure by Default</h3>
            <p className="text-sm text-fg-quaternary">
              Enterprise-grade security features built in from the ground up.
            </p>
          </div>

          <div className="rounded-xl border border-secondary bg-primary p-6">
            <div className="mb-4 inline-flex rounded-lg bg-brand-solid/10 p-3">
              <svg
                className="size-6 text-brand-solid"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Fully Customizable</h3>
            <p className="text-sm text-fg-quaternary">
              Tailor every aspect to match your brand and requirements.
            </p>
          </div>
        </section>
      </div>
  );
}
