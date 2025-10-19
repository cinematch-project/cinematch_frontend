import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const LOCAL_STORAGE_KEY = "favoriteMovies";

const favoriteMoviesAtom = atomWithStorage<Array<number>>(LOCAL_STORAGE_KEY, []);

export function useFavoriteMovies() {
  const [favoriteMovies, setFavoriteMovies] = useAtom(favoriteMoviesAtom);

  const toggleMovie = (id: number) => {
    if (favoriteMovies.includes(id)) {
      setFavoriteMovies(favoriteMovies.filter((movieId) => movieId !== id));
    } else {
      setFavoriteMovies([...favoriteMovies, id]);
    }
  };

  return { favoriteMovies, setFavoriteMovies, toggleMovie };
}
