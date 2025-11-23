import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import {
  Button,
  InputSm,
  MovieCardBig,
  MultiSelectPopup,
  Pagination,
  RangeFilterPopup,
} from "@/components";
import { moviesApi } from "@/service/api";
import { useDebounce, useFavoriteMovies } from "@/lib/hooks";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchValue, setSearchValue] = useState("");
  const [voteAverageValue, setVoteAverageValue] = useState([0, 10] as [number, number]);
  const [yearValue, setYearValue] = useState([1970, 2025] as [number, number]);
  const [runtimeValue, setRuntimeValue] = useState([0, 300] as [number, number]);
  const [selectedGenres, setSelectedGenres] = useState<Array<string>>([]);
  const [selectedCountries, setSelectedCountries] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);

  const onPageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const debouncedSearchValue = useDebounce(searchValue, 750, () => onPageChange(1));

  const onClearAll = () => {
    setSearchValue("");
    setVoteAverageValue([0, 10]);
    setYearValue([1970, 2025]);
    setRuntimeValue([0, 300]);
    setSelectedGenres([]);
    setSelectedCountries([]);
    onPageChange(1);
  };

  const onVoteAverageChange = (values: [number, number]) => {
    setVoteAverageValue(values);
    onPageChange(1);
  };

  const onYearChange = (values: [number, number]) => {
    setYearValue(values);
    onPageChange(1);
  };

  const onRuntimeChange = (values: [number, number]) => {
    setRuntimeValue(values);
    onPageChange(1);
  };

  const onSelectGenresChange = (values: Array<string>) => {
    setSelectedGenres(values);
    onPageChange(1);
  };

  const onSelectCountriesChange = (values: Array<string>) => {
    setSelectedCountries(values);
    onPageChange(1);
  };

  const { data: filters, isPending: filtersFetching } = useQuery({
    queryFn: moviesApi.getFilters,
    queryKey: ["filters"],
  });

  const { data: movies, isFetching: moviesFetching } = useQuery({
    queryFn: () =>
      moviesApi.searchMovies({
        search: debouncedSearchValue,
        vote_average_from: voteAverageValue[0],
        vote_average_to: voteAverageValue[1],
        year_from: yearValue[0],
        year_to: yearValue[1],
        runtime_from: runtimeValue[0],
        runtime_to: runtimeValue[1],
        genres: selectedGenres.map(Number),
        countries: selectedCountries.map(Number),
        page,
      }),
    queryKey: [
      "search-movies",
      debouncedSearchValue,
      voteAverageValue,
      yearValue,
      runtimeValue,
      selectedGenres,
      selectedCountries,
      page,
    ],
  });

  if (filtersFetching || !filters) {
    return (
      <div className="grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 pb-12">
        <h2 className="text-xl font-bold">Search for your favorite movies</h2>
        <div className="flex flex-wrap items-center gap-4">
          <GetRecommendationsButton />
          <Button variant={"secondary"} onClick={onClearAll}>
            <Trash2 />
            Clear all
          </Button>
        </div>
      </div>
      <section className="flex flex-wrap gap-x-4 gap-y-4">
        <InputSm
          className="border-primary/80 w-full sm:w-fit sm:min-w-[250px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Title..."
          name="search"
        />
        <RangeFilterPopup
          label={`Rating: ${voteAverageValue[0]} - ${voteAverageValue[1]}`}
          min={0}
          max={10}
          step={0.1}
          values={voteAverageValue}
          onChange={onVoteAverageChange}
        />
        <RangeFilterPopup
          label={`Year: ${yearValue[0]} - ${yearValue[1]}`}
          min={1970}
          max={2025}
          step={1}
          values={yearValue}
          onChange={onYearChange}
        />
        <RangeFilterPopup
          label={`Runtime (minutes): ${runtimeValue[0]} - ${runtimeValue[1]}`}
          min={0}
          max={300}
          step={10}
          values={runtimeValue}
          onChange={onRuntimeChange}
        />
        <MultiSelectPopup
          label="Genres"
          options={filters.genres}
          values={selectedGenres}
          onChange={onSelectGenresChange}
        />
        <MultiSelectPopup
          label="Countries"
          options={filters.countries}
          values={selectedCountries}
          onChange={onSelectCountriesChange}
        />
      </section>
      <section className="divide-muted/30 space-y-8 divide-y py-8">
        {moviesFetching || !movies ? (
          <div className="grid place-items-center py-8">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          movies.items.map((m) => <MovieCardBig key={m.id} movie={m} className="pb-6" />)
        )}
      </section>
      <Pagination page={page} onPageChange={onPageChange} totalPages={movies?.totalPages ?? 0} />
    </div>
  );
}

const GetRecommendationsButton = () => {
  const { favoriteMovies } = useFavoriteMovies();
  if (!favoriteMovies.length) {
    return null;
  }
  return (
    <Button variant={"default"} asChild>
      <Link to="/results" search={{ ids: favoriteMovies }}>
        <Sparkles /> Get recommendations
      </Link>
    </Button>
  );
};
