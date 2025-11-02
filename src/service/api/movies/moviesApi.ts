import type { Movie, RecommendMoviesRequest } from "@/service/api/movies/types";
import { api } from "@/service/api";

function searchMovies(search: string) {
  return api<Array<Movie>>(`movies/search?search=${search}`);
}

function getMoviesById(ids: Array<number>) {
  const params = new URLSearchParams();
  ids.forEach((id) => params.append("ids", id.toString()));

  return api<Array<Movie>>(`movies/batch`, { params });
}

function recommend(body: RecommendMoviesRequest) {
  return api<Array<Movie>, RecommendMoviesRequest>(`movies/recommend`, {
    method: "POST",
    body,
  });
}

export const moviesApi = {
  searchMovies,
  getMoviesById,
  recommend,
};
