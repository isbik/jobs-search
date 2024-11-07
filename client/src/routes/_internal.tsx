import { createFileRoute, Navigate, Outlet, useLocation } from "@tanstack/react-router";

import { Sidebar } from "@/widgets/sidebar";
import { useMe } from "@/entity/user/hooks/use-me";

export const Route = createFileRoute("/_internal")({
  component: Internal,
});

function Internal() {
  const location = useLocation();

  const { data, isFetched, isLoading } = useMe();

  if (isFetched && !data) {
    return (
      <Navigate
        to={"/login"}
        replace={true}
        search={{ redirect: location.pathname }}
      />
    );
  }

  if (isLoading) {
    return <main className="flex grow items-center justify-center p-2">Загрузка...</main>;
  }

  return (
    <main className="flex max-h-dvh gap-2 overflow-hidden">
      <Sidebar />
      <div className="flex grow flex-col overflow-auto p-2">
        <Outlet />
      </div>
    </main>
  );
}
