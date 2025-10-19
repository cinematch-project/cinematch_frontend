import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { moviesApi } from "@/service/api";
import { MovieWithFavoriteButton } from "@/components/MovieWithFavoriteButton";
import { useFavoriteMovies } from "@/lib/hooks/useFavoriteMovies";

type MovieListProps = {
  ids: Array<number>;
};

export function MovieList({ ids }: MovieListProps) {
  const { favoriteMovies, toggleMovie } = useFavoriteMovies();

  const { data, isLoading } = useQuery({
    queryFn: () => moviesApi.getMoviesById(ids),
    queryKey: ["movies", { ids }],
    enabled: ids.length > 0,
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data?.map((movie) => (
        <MovieWithFavoriteButton
          key={movie.id}
          movie={movie}
          favoriteMovies={favoriteMovies}
          onClick={() => toggleMovie(movie.id)}
          className="border-border/45 bg-bg-light/45 shadow-bg-light border shadow-sm"
        />
      ))}
    </div>
  );
}
