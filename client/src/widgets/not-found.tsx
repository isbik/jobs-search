import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/button";

import { Header } from "./header";
import { Footer } from "./footer";

const NotFound = () => {
  return (
    <>
      <Header />

      <main className="flex grow flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mb-4 text-2xl">Страница не найдена</p>
        <Button
          asChild
          variant="outline"
        >
          <Link to="/">На главную</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
};

export { NotFound };
