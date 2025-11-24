import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header>
      <nav className="flex items-center gap-4 sm:gap-8">
        <Link
          to="/"
          className="after:bg-foreground relative mr-auto text-2xl font-bold after:absolute after:bottom-0 after:block after:h-1 after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100 sm:text-3xl"
        >
          CineMatch
        </Link>
        <Link
          to="/search"
          className="after:bg-foreground relative text-lg font-bold after:absolute after:bottom-0 after:block after:h-px after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100 sm:text-xl"
          activeProps={{ className: "after:scale-100" }}
        >
          Search
        </Link>
        <Link
          to="/favorite"
          className="after:bg-foreground relative text-lg font-bold after:absolute after:bottom-0 after:block after:h-px after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100 sm:text-xl"
          activeProps={{ className: "after:scale-100" }}
        >
          Favorite
        </Link>
      </nav>
    </header>
  );
}
