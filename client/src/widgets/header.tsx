import { Link } from "@tanstack/react-router";

import { useMe } from "@/entity/user/hooks/use-me";

import { Logo } from "../shared/ui/logo";
import { Button } from "../shared/ui/button";

const Header = () => {
  const { data: me } = useMe();

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex h-14 items-center px-4 lg:px-6">
        <Link
          className="flex items-center justify-center"
          to="/"
        >
          <Logo />
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            to={"/search/jobs"}
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Вакансии
          </Link>
          <Link
            to="/search/companies"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Компании
          </Link>

          <Button asChild>
            <Link href={me ? "/jobs/create" : "/login"}>Опубликовать</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export { Header };
