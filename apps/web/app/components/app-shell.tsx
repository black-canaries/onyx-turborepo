"use client";

import { Home02, BarChart01, Users01, Settings01, Bell01 } from "@untitledui/icons";
import { Button } from "@repo/ui";

type NavItem = {
  label: string;
  href: string;
  current?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    current: true,
    icon: Home02,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart01,
  },
  {
    label: "Team",
    href: "/team",
    icon: Users01,
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-secondary bg-primary">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="text-xl font-bold">Onyx</div>

            {/* Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          item.current
                            ? "bg-primary_hover text-secondary"
                            : "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover"
                        }`}
                      >
                        {Icon && <Icon className="size-5" />}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              color="tertiary"
              size="md"
              aria-label="Notifications"
            >
              <Bell01 className="size-5" />
            </Button>
            <Button
              color="tertiary"
              size="md"
              aria-label="Settings"
            >
              <Settings01 className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-secondary bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-tertiary">
            Built with Untitled UI
          </p>
        </div>
      </footer>
    </div>
  );
}
