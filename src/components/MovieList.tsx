import { Loader2 } from "lucide-react";
import type { Movie } from "@/service/api/movies";
import { MovieWithFavoriteButton } from "@/components/MovieWithFavoriteButton";
import { useFavoriteMovies } from "@/lib/hooks/useFavoriteMovies";

type MovieListProps = {
  data: Array<Movie> | undefined;
  isLoading: boolean;
};

export function MovieList({ data, isLoading }: MovieListProps) {
  const { favoriteMovies, toggleMovie } = useFavoriteMovies();

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
