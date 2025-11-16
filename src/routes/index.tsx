import { Link, createFileRoute } from "@tanstack/react-router";
import { Sparkles, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button, MovieList, Searchbar } from "@/components";
import { useFavoriteMovies } from "@/lib/hooks";
import { moviesApi } from "@/service/api";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { favoriteMovies, toggleMovie, setFavoriteMovies } = useFavoriteMovies();

  const { data, isLoading } = useQuery({
    queryFn: () => moviesApi.getMoviesById(favoriteMovies),
    queryKey: ["movies", { favoriteMovies }],
    enabled: favoriteMovies.length > 0,
  });

  const onClearAllClick = () => {
    setFavoriteMovies([]);
  };

  return (
    <div className="flex flex-col gap-y-6 pt-8 sm:gap-y-12 sm:pt-16">
      <header>
        <h1 className="text-center text-5xl font-bold sm:text-7xl">CineMatch</h1>
        <p className="text-muted text-center font-medium sm:text-lg">
          Search your favorite movies and get personalized recommendations
        </p>
      </header>
      <form className="mx-auto w-full max-w-3xl">
        <Searchbar favoriteMovies={favoriteMovies} onMovieClick={toggleMovie} />
      </form>
      <section className="mx-auto mt-8 w-full max-w-5xl space-y-6 sm:mt-16">
        {favoriteMovies.length === 0 ? (
          <div className="grid flex-1 place-items-center">
            <p className="text-muted text-center">No favorites yet. Search and add some!</p>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-lg font-bold">Your favorites</h3>
            <div className="flex flex-wrap justify-between gap-2 sm:justify-start">
              <Button variant={"secondary"} onClick={onClearAllClick}>
                <Trash2 />
                Clear all
              </Button>
              <Button asChild>
                <Link to="/results" search={{ ids: favoriteMovies }}>
                  <Sparkles /> Get recommendations
                </Link>
              </Button>
            </div>
          </div>
        )}
        <MovieList data={data} isLoading={isLoading} />
      </section>
    </div>
  );
}
