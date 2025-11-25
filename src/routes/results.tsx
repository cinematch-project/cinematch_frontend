import { Link, createFileRoute } from "@tanstack/react-router";
import qs from "query-string";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { Movie, MovieScoreOverview } from "@/service/api/movies";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  MovieCardBig,
  Progress,
} from "@/components";
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
    queryFn: () => moviesApi.recommend({ ids }),
    queryKey: ["movies", { ids }],
    enabled: ids.length > 0,
  });

  const [explanation, setExplanation] = useState<MovieScoreOverview | null>(null);

  const onExplainPress = (movie: Movie) => {
    setExplanation(movie.score_overview || null);
  };

  return (
    <div className="flex flex-col gap-y-12">
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
        {isLoading ? (
          <div className="grid place-items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {data?.map((movie) => (
              <MovieCardBig
                key={movie.id}
                movie={movie}
                onExplainPress={() => onExplainPress(movie)}
              />
            ))}
          </div>
        )}
        {data?.length && (
          <Button asChild variant={"link"} className="mx-auto flex w-fit">
            <Link to="/">Back to search</Link>
          </Button>
        )}
      </section>
      <Dialog open={!!explanation} onOpenChange={() => setExplanation(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Relevance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Relevance score — {((explanation?.relevance_score ?? 0) * 100).toFixed(2)}%</p>
            <div className="space-y-2">
              {Object.entries(explanation?.column_contribution || {}).map(([k, v]) => (
                <div>
                  <p className="pb-1">
                    {k[0].toUpperCase() + k.slice(1)} — {v}%
                  </p>
                  <Progress value={v} />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
