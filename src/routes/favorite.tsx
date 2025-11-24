import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components";
import { MovieCardBig } from "@/components/MovieCardBig";
import { useFavoriteMovies } from "@/lib/hooks";
import { moviesApi } from "@/service/api";

export const Route = createFileRoute("/favorite")({
  component: RouteComponent,
});

function RouteComponent() {
  const { favoriteMovies, setFavoriteMovies } = useFavoriteMovies();

  const { data } = useQuery({
    queryFn: () => moviesApi.getMoviesById(favoriteMovies),
    queryKey: ["movies", { favoriteMovies }],
    enabled: favoriteMovies.length > 0,
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="py-4 text-xl font-bold">Your favorite movies</h2>
        <div className="flex flex-wrap items-center gap-4">
          {favoriteMovies.length > 0 && (
            <Button asChild>
              <Link to="/results" search={{ ids: favoriteMovies }}>
                <Sparkles /> Get recommendations
              </Link>
            </Button>
          )}
          <Button variant={"secondary"} onClick={() => setFavoriteMovies([])}>
            <Trash2 />
            Clear all
          </Button>
        </div>
      </div>
      {favoriteMovies.length === 0 ? (
        <div className="grid place-items-center">
          <p className="text-muted py-4 text-center">No favorites yet. Search and add some!</p>
        </div>
      ) : !data ? (
        <div className="grid place-items-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-8 py-4">
          {data.map((movie) => (
            <MovieCardBig key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
