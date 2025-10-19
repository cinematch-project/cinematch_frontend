import { Link, createFileRoute } from "@tanstack/react-router";
import qs from "query-string";
import { MovieList } from "@/components";

type TParams = {
  ids: Array<number>;
};

export const Route = createFileRoute("/results")({
  validateSearch: (search): TParams => {
    const stringified = qs.stringify(search);
    const parsed = qs.parse(stringified);

    return {
      ids: ((parsed.ids ?? []) as Array<string>).map(Number),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { ids } = Route.useSearch();

  return (
    <div className="flex flex-col gap-y-12">
      <header>
        <h1>
          <Link
            to="/"
            className="after:bg-foreground relative text-3xl font-bold after:absolute after:bottom-0 after:block after:h-1 after:w-full after:origin-left after:scale-0 after:transition hover:after:scale-100"
          >
            CineMatch
          </Link>
        </h1>
      </header>
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <h2 className="text-xl font-bold">Recommendations</h2>
        <MovieList ids={ids} />
      </section>
    </div>
  );
}
