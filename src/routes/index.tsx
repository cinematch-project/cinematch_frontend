import { Link, createFileRoute } from "@tanstack/react-router";
import { Sparkles, Trash2 } from "lucide-react";
import { Button, MovieList, Searchbar } from "@/components";
import { useFavoriteMovies } from "@/lib/hooks";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { favoriteMovies, toggleMovie, setFavoriteMovies } = useFavoriteMovies();

  const onClearAllClick = () => {
    setFavoriteMovies([]);
  };

  return (
    <div className="flex flex-col gap-y-12 pt-16">
      <header>
        <h1 className="text-center text-7xl font-bold">CineMatch</h1>
        <p className="text-muted text-center text-lg font-medium">
          Search your favorite movies and get personalized recommendations
        </p>
      </header>
      <form className="mx-auto w-full max-w-3xl">
        <Searchbar favoriteMovies={favoriteMovies} onMovieClick={toggleMovie} />
      </form>
      <section className="mx-auto mt-16 w-full max-w-5xl space-y-6">
        {favoriteMovies.length === 0 ? (
          <div className="grid flex-1 place-items-center">
            <p className="text-muted text-center">No favorites yet. Search and add some!</p>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Your favorites</h3>
            <div className="flex gap-2">
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
        <MovieList ids={favoriteMovies} />
      </section>
    </div>
  );
}
