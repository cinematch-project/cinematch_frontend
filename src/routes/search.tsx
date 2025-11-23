import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { InputSm, MovieCardBig, MultiSelect, RangeFilterPopup } from "@/components";
import { moviesApi } from "@/service/api";
import { useDebounce } from "@/lib/hooks";

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

  const [isPopoverOpen, setIsPopoverOpen] = useState(() => ({
    voteAverage: false,
    year: false,
    runtime: false,
    genres: false,
    countries: false,
  }));

  const changePopoverOpen = useCallback((key: keyof typeof isPopoverOpen) => {
    setIsPopoverOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const [page, setPage] = useState(1);

  const debouncedSearchValue = useDebounce(searchValue, 750);

  const { data: filters, isFetching: filtersFetching } = useQuery({
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

  if (filtersFetching || moviesFetching || !movies || !filters) {
    return (
      <div className="grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="pt-4 pb-12 text-xl font-bold">Search for your favorite movies</h2>
      <section className="flex flex-wrap gap-x-4 gap-y-4">
        <InputSm
          className="border-primary/80 w-fit sm:min-w-[250px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Title..."
          name="search"
        />
        <RangeFilterPopup
          open={isPopoverOpen.voteAverage}
          onOpenChange={(open) => changePopoverOpen("voteAverage")}
          label={`Rating: ${voteAverageValue[0]} - ${voteAverageValue[1]}`}
          min={0}
          max={10}
          step={0.1}
          values={voteAverageValue}
          onChange={setVoteAverageValue}
        />
        <RangeFilterPopup
          label={`Year: ${yearValue[0]} - ${yearValue[1]}`}
          min={1970}
          max={2025}
          step={1}
          values={yearValue}
          onChange={setYearValue}
        />
        <RangeFilterPopup
          label={`Runtime (minutes): ${runtimeValue[0]} - ${runtimeValue[1]}`}
          min={0}
          max={300}
          step={10}
          values={runtimeValue}
          onChange={setRuntimeValue}
        />
        <MultiSelect
          placeholder="Genres"
          hideSelectAll={true}
          options={filters.genres.map((g) => ({ label: g.name, value: g.id.toString() }))}
          value={selectedGenres}
          onValueChange={setSelectedGenres}
          autoSize={true}
        />
        <MultiSelect
          placeholder="Countries"
          hideSelectAll={true}
          options={filters.countries.map((c) => ({ label: c.name, value: c.id.toString() }))}
          value={selectedCountries}
          onValueChange={setSelectedCountries}
          autoSize={true}
        />
      </section>
      <section className="space-y-8 py-8">
        {movies.items.map((m) => (
          <MovieCardBig key={m.id} movie={m} />
        ))}
      </section>
    </div>
  );
}
