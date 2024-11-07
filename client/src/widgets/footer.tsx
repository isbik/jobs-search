import { Link } from "@tanstack/react-router";

import { cn } from "@/shared/lib";
import { Logo } from "@/shared/ui/logo";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        "flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6",
        className,
      )}
    >
      <div className="container flex items-center justify-center gap-2">
        <Link to="/">
          <Logo />
        </Link>
        <p className="text-xs text-gray-500">© 2024 JJ. Все права защищены.</p>
      </div>
    </footer>
  );
};

export { Footer };
