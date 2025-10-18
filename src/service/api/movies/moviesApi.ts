import type { Movie } from "@/service/api/movies/types";
import { api } from "@/service/api";

function searchMovies(search: string) {
  return api<Array<Movie>>(`movies/?search=${search}`);
}

export const moviesApi = {
  searchMovies,
};
