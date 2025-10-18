export type Movie = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  overview: string;
  poster_path: string;
  genres: Array<string>;
};
