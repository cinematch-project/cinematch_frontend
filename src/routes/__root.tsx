import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Header } from "@/components/layout";

export const Route = createRootRoute({
  component: () => (
    <main className="container mx-auto grid min-h-svh grid-rows-[auto_1fr] gap-8 px-4 py-6 sm:px-6">
      <Header />
      <Outlet />
    </main>
  ),
});
