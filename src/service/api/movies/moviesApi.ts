import type { Movie } from "@/service/api/movies/types";
import { api } from "@/service/api";

function searchMovies(search: string) {
  return api<Array<Movie>>(`movies/search?search=${search}`);
}

function getMoviesById(ids: Array<number>) {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("ids", id.toString()));

  return api<Array<Movie>>(`movies/batch`, { params });
}

export const moviesApi = {
  searchMovies,
  getMoviesById,
};
