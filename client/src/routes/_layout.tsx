import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "../widgets/footer";
import { Header } from "../widgets/header";

export const Route = createFileRoute("/_layout")({
  component: () => (
    <>
      <Header />
      <main className="flex grow flex-col gap-4">
        <Outlet />
      </main>
      <Footer className="mt-auto" />
    </>
  ),
});
