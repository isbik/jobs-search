import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "../widgets/footer";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <main className="flex min-h-screen flex-col gap-4 overflow-auto">
      <div className="flex grow items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </main>
  ),
});
