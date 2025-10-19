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
        <img
          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
          alt={movie.title}
          width={92}
          className="self-start rounded"
        />
        <div>
          <div className="flex items-center gap-1 text-sm text-yellow-300/85">
            <Star className="size-4 fill-yellow-300/90 stroke-0" />
            <span>{movie.vote_average.toFixed(2)}</span>
          </div>
          <h3 className="py-2 font-bold">{movie.title}</h3>
          <p className="text-muted line-clamp-3">{movie.overview}</p>
        </div>
      </div>
      {children}
    </article>
  );
}
