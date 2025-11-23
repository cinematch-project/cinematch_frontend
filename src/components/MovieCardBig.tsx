import { Star } from "lucide-react";
import type { Movie } from "@/service/api/movies";
import { cn } from "@/lib/utils";
import { Badge } from "@/components";

export function MovieCardBig({ movie }: { movie: Movie }) {
  return (
    <article className={cn("transition duration-300")}>
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
          <p className="text-muted line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </article>
  );
}
