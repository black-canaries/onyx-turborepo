"use client";

import {
  Home02,
  BarChart01,
  Users01,
  Settings01,
  LifeBuoy01,
  LayoutGrid01,
  Folder,
  CheckSquare,
  FolderCheck,
  ClockFastForward,
  Archive,
} from "@untitledui/icons";
import { SidebarNavigationDualTier } from "@repo/ui";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  // Main navigation items matching the mockup
  const navItems: Array<{
    label: string;
    href: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
    items?: Array<{
      label: string;
      href: string;
      icon?: React.FC<{ className?: string }>;
      badge?: string;
    }>;
  }> = [
    {
      label: "Home",
      href: "/",
      icon: Home02,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid01,
    },
    {
      label: "Projects",
      href: "/projects",
      icon: Folder,
      items: [
        {
          label: "All Projects",
          href: "/projects/all",
          icon: Folder,
        },
        {
          label: "Active",
          href: "/projects/active",
          icon: FolderCheck,
        },
        {
          label: "In Progress",
          href: "/projects/in-progress",
          icon: ClockFastForward,
          badge: "12",
        },
        {
          label: "Archived",
          href: "/projects/archived",
          icon: Archive,
        },
        {
          label: "Project Settings",
          href: "/projects/settings",
          icon: Settings01,
        },
      ],
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      badge: "10",
    },
    {
      label: "Reporting",
      href: "/reporting",
      icon: BarChart01,
    },
    {
      label: "Users",
      href: "/users",
      icon: Users01,
    },
  ];

  // Footer navigation items
  const footerItems: Array<{
    label: string;
    href: string;
    icon: React.FC<{ className?: string }>;
  }> = [
    {
      label: "Support",
      href: "/support",
      icon: LifeBuoy01,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings01,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <SidebarNavigationDualTier
        items={navItems}
        footerItems={footerItems}
      />

      {/* Main content */}
      <main className="flex-1 bg-secondary">
        {children}
      </main>
    </div>
  );
}
