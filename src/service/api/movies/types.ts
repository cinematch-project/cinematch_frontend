export type Movie = {
  id: number;
  tmdb_id: number;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  poster_path: string;
  genres: Array<string>;
};

export type RecommendMoviesRequest = {
  ids: Array<number>;
  top_n: number;
  similarity_weight: number;
};
