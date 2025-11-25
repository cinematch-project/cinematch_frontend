export type MovieDetail = {
  id: number;
  name: string;
  slug: string;
};

export type MovieScoreOverview = {
  relevance_score: number;
  column_contribution: Record<string, number>;
};

export type Movie = {
  id: number;
  tmdb_id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  original_title: string | null;
  poster_path: string | null;
  runtime: number;
  genres: Array<MovieDetail>;
  keywords: Array<MovieDetail>;
  production_countries: Array<MovieDetail>;
  production_companies: Array<MovieDetail>;
  score_overview?: MovieScoreOverview;
};

export type GetMoviesRequest = {
  search?: string | undefined;
  year_from?: number | undefined;
  year_to?: number | undefined;
  vote_average_from?: number | undefined;
  vote_average_to?: number | undefined;
  runtime_from?: number | undefined;
  runtime_to?: number | undefined;
  genres?: Array<number> | undefined;
  countries?: Array<number> | undefined;
  page?: number | undefined;
};

export type GetMoviesResponse = {
  items: Array<Movie>;
  totalPages: number;
};

export type RecommendMoviesRequest = {
  ids: Array<number>;
  top_n?: number;
  similarity_weight?: number;
  min_score?: number;
};

export type FilterItem = {
  id: number;
  name: string;
};

export type MovieFilters = {
  genres: Array<FilterItem>;
  countries: Array<FilterItem>;
};
