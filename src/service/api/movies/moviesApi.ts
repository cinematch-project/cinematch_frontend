import type {
  GetMoviesRequest,
  GetMoviesResponse,
  Movie,
  MovieFilters,
  RecommendMoviesRequest,
} from "@/service/api/movies/types";
import { api } from "@/service/api";

function searchMovies(request: GetMoviesRequest) {
  const params = new URLSearchParams();
  if (request.search) params.append("search", request.search);
  if (request.year_from !== undefined) params.append("year_from", request.year_from.toString());
  if (request.year_to !== undefined) params.append("year_to", request.year_to.toString());
  if (request.vote_average_from !== undefined)
    params.append("vote_average_from", request.vote_average_from.toString());
  if (request.vote_average_to !== undefined)
    params.append("vote_average_to", request.vote_average_to.toString());
  if (request.runtime_from !== undefined)
    params.append("runtime_from", request.runtime_from.toString());
  if (request.runtime_to !== undefined) params.append("runtime_to", request.runtime_to.toString());
  if (request.genres) request.genres.forEach((id) => params.append("genres", id.toString()));
  if (request.countries)
    request.countries.forEach((id) => params.append("countries", id.toString()));
  return api<GetMoviesResponse>(`movies/search`, { params });
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

function getFilters() {
  return api<MovieFilters>(`movies/filters`);
}

export const moviesApi = {
  searchMovies,
  getMoviesById,
  recommend,
  getFilters,
};
