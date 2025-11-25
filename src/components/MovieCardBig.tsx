import { Heart, HeartPlus, Info, Star } from "lucide-react";
import type { Movie } from "@/service/api/movies";
import { cn } from "@/lib/utils";
import { Badge, Button } from "@/components";
import { useFavoriteMovies } from "@/lib/hooks";

type MovieCardBigProps = React.ComponentProps<"article"> & {
  movie: Movie;
  onExplainPress?: () => void;
};

export function MovieCardBig({ movie, className, onExplainPress, ...rest }: MovieCardBigProps) {
  const { favoriteMovies, toggleMovie } = useFavoriteMovies();

  const isFavorite = favoriteMovies.includes(movie.id);

  return (
    <article className={cn("relative transition duration-300", className)} {...rest}>
      <div className="flex gap-4">
        <div className="w-[92px] shrink-0 self-start rounded">
          <object data={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} type="image/png">
            <img
              src={`https://placehold.co/92x138/0064b3/f2f2f2/?text=${movie.title}`}
              alt={movie.title}
              width={92}
            />
          </object>
        </div>
        <div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted">{new Date(movie.release_date).getFullYear()}</span>
            <span className="text-muted">|</span>
            <Star className="size-4 fill-yellow-300/90 stroke-0" />
            <span className="text-yellow-300/85">{movie.vote_average.toFixed(2)}</span>
          </div>
          <h3 className="py-2 font-bold">
            <a
              href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
              target="__blank"
              className="hover:underline"
            >
              {movie.title}
            </a>
            {!!movie.original_title && movie.original_title !== movie.title && (
              <span className="text-muted"> ({movie.original_title})</span>
            )}
          </h3>
          {!!movie.genres.length && (
            <div className="flex flex-wrap gap-2 pb-2">
              {movie.genres.map((g) => (
                <Badge key={g.id} variant={"secondary"}>
                  {g.name}
                </Badge>
              ))}
            </div>
          )}
          <p className="text-muted mb-2 line-clamp-3">{movie.overview}</p>
          <div className="flex w-full flex-col gap-x-1 pt-1 text-xs sm:flex-row">
            <p className="text-muted flex-1">Runtime:</p>
            <p className="flex-6">{movie.runtime} minutes</p>
          </div>
          {movie.production_countries.length > 0 && (
            <div className="flex w-full flex-col gap-x-1 pt-2 text-xs sm:flex-row sm:pt-1">
              <p className="text-muted flex-1">Countries:</p>
              <p className="flex-6">{movie.production_countries.map((c) => c.name).join(" | ")}</p>
            </div>
          )}
          {movie.keywords.length > 0 && (
            <div className="flex w-full flex-col gap-x-1 pt-2 text-xs sm:flex-row sm:pt-1">
              <span className="text-muted flex-1">Keywords:</span>
              <p className="flex-6">{movie.keywords.map((c) => c.name).join(" | ")}</p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-2 right-2 space-x-1 sm:top-4 sm:right-4">
        {!!movie.score_overview && !!onExplainPress && (
          <Button size={"icon-sm"} variant={"ghost"} onClick={onExplainPress}>
            <Info />
            <span className="sr-only">{"Score overview"}</span>
          </Button>
        )}
        <Button
          size={"icon-sm"}
          variant={isFavorite ? "default" : "ghost"}
          onClick={() => toggleMovie(movie.id)}
        >
          {isFavorite ? <Heart className="fill-foreground stroke-0" /> : <HeartPlus />}
          <span className="sr-only">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>
      </div>
    </article>
  );
}
