import { Heart, HeartPlus } from "lucide-react";
import type { Movie } from "@/service/api/movies";
import { Button } from "@/components/Button";
import { MovieCard } from "@/components/MovieCard";
import { cn } from "@/lib/utils";

type MovieWithFavoriteButtonProps = React.ComponentProps<typeof MovieCard> & {
  favoriteMovies: Array<number>;
  movie: Movie;
};

export function MovieWithFavoriteButton({
  movie,
  favoriteMovies,
  onClick,
  className,
  ...rest
}: MovieWithFavoriteButtonProps) {
  const isFavorite = favoriteMovies.includes(movie.id);

  return (
    <MovieCard movie={movie} className={cn("relative", className)} {...rest}>
      <Button
        size={"icon-sm"}
        variant={isFavorite ? "default" : "ghost"}
        className="absolute top-6 right-4"
        onClick={onClick}
      >
        {isFavorite ? <Heart className="fill-foreground stroke-0" /> : <HeartPlus />}
        <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
      </Button>
    </MovieCard>
  );
}
