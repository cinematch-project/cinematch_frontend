import { Star } from "lucide-react";
import type { Movie } from "@/service/api/movies";
import { cn } from "@/lib/utils";

type MovieCardProps = React.ComponentProps<"article"> & {
  movie: Movie;
  hover?: boolean;
};

export function MovieCard({ movie, className, children, hover, ...rest }: MovieCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl p-4 transition duration-300",
        hover && "hover:from-primary/10 hover:to-bg-light hover:bg-linear-to-tl hover:from-15%",
        className,
      )}
      {...rest}
    >
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
          <div className="flex items-center gap-1 text-sm text-yellow-300/85">
            <Star className="size-4 fill-yellow-300/90 stroke-0" />
            <span>{movie.vote_average.toFixed(2)}</span>
          </div>
          <h3 className="py-2 font-bold">
            <a
              href={`https://www.themoviedb.org/movie/${movie.tmdb_id}`}
              target="__blank"
              className="hover:underline"
            >
              {movie.title}{" "}
              <span className="text-muted">({new Date(movie.release_date).getFullYear()})</span>
            </a>
          </h3>
          <p className="text-muted line-clamp-3">{movie.overview}</p>
        </div>
      </div>
      {children}
    </article>
  );
}
