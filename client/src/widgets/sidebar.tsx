import { Rocket, ListIcon, Building } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";

import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui/logo";
import { Button } from "@/shared/ui/button";
import { postAuthLogout } from "@/__generated__";

const NAV_ITEMS = [
  { name: "Добавить вакансию", to: "/jobs/create", icon: Rocket },
  { name: "Вакансии", to: "/jobs", icon: ListIcon },
  { name: "Компания", to: "/company", icon: Building },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postAuthLogout,
    onSettled: () => {
      queryClient.resetQueries({ queryKey: ["Me"] });
      navigate({ to: "/" });
    },
  });

  return (
    <nav className="flex h-dvh min-w-[300px] flex-col gap-2 border-r bg-white p-2 px-4">
      <Link
        to="/"
        className="mb-6 flex items-center gap-4 text-lg font-medium"
      >
        <Logo className="text-4xl" />
        Job Join
      </Link>
      <ul className="m-0 -mx-4 flex flex-col">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li
              className="flex w-full"
              key={item.to}
            >
              <Link
                className={cn(
                  "flex w-full items-center gap-2 p-2 px-4 font-medium hover:bg-blue-500 hover:text-white",
                  isActive && "bg-blue-100",
                )}
                to={item.to}
              >
                <item.icon />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Button
        onClick={() => mutate({})}
        className="mt-auto w-fit"
      >
        Выйти
      </Button>
    </nav>
  );
};

export { Sidebar };
