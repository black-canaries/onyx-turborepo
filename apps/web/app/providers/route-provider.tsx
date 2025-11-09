"use client";

import type { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: {
      scroll?: boolean;
    };
  }
}

export const RouteProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const navigate = (path: string, options?: { scroll?: boolean }) => {
    router.push(path as any, options);
  };

  return <RouterProvider navigate={navigate}>{children}</RouterProvider>;
};
