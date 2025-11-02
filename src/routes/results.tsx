import { Link, createFileRoute } from "@tanstack/react-router";
import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { Button, MovieList } from "@/components";
import { moviesApi } from "@/service/api";

type TParams = {
  ids: Array<number>;
};

export const Route = createFileRoute("/results")({
  validateSearch: (search): TParams => {
    const stringified = qs.stringify(search);
    const parsed = qs.parse(stringified);

    let ids = parsed.ids ?? [];
    ids = Array.isArray(ids) ? ids : [ids];

    return {
      ids: (ids as Array<string>).map(Number),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { ids } = Route.useSearch();

  const { data, isLoading } = useQuery({
    queryFn: () => moviesApi.recommend({ ids, top_n: 20, similarity_weight: 0.65 }),
    queryKey: ["movies", { ids }],
    enabled: ids.length > 0,
  });

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
        {!data?.length && !isLoading ? (
          <div className="grid place-items-center">
            <p className="text-muted py-4 text-center">No recommendations found</p>
            <Button asChild variant={"link"}>
              <Link to="/">Back to search</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap justify-between gap-2">
            <h2 className="text-xl font-bold">Recommendations</h2>
            <Button asChild variant={"link"}>
              <Link to="/">Back to search</Link>
            </Button>
          </div>
        )}
        <MovieList data={data} isLoading={isLoading} />
        {data?.length && (
          <Button asChild variant={"link"} className="mx-auto flex w-fit">
            <Link to="/">Back to search</Link>
          </Button>
        )}
      </section>
    </div>
  );
}
