import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header>
      <nav className="flex items-center gap-8">
        <Link
          to="/"
          className="after:bg-foreground relative mr-auto text-3xl font-bold after:absolute after:bottom-0 after:block after:h-1 after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100"
        >
          CineMatch
        </Link>
        <Link
          to="/search"
          className="after:bg-foreground relative text-xl font-bold after:absolute after:bottom-0 after:block after:h-px after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100"
          activeProps={{ className: "after:scale-100" }}
        >
          Search
        </Link>
        <Link
          to="/favorite"
          className="after:bg-foreground relative text-xl font-bold after:absolute after:bottom-0 after:block after:h-px after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100"
          activeProps={{ className: "after:scale-100" }}
        >
          Favorite
        </Link>
      </nav>
    </header>
  );
}
