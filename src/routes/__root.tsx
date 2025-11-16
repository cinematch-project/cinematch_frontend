import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="container mx-auto grid min-h-svh px-4 py-6 sm:px-6">
      <Outlet />
    </main>
  ),
});
