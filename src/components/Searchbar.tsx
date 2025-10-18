import { Loader2, Search } from "lucide-react";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Popover } from "radix-ui";
import { Input, MovieCard } from "@/components";
import { useDebounce } from "@/lib/hooks";
import { moviesApi } from "@/service/api";

export function Searchbar() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: searchResults, isFetching } = useQuery({
    queryFn: () => moviesApi.searchMovies(debouncedSearchValue),
    queryKey: ["movies", { searchValue: debouncedSearchValue }],
    enabled: debouncedSearchValue.trim().length > 2,
  });

  return (
    <form className="mx-auto w-full max-w-3xl">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="w-full">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              IconLeft={Search}
              name="search"
              label="Search"
            />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="bg-bg-light scrollbar border-border animate-slideDownAndFade h-[calc(var(--radix-popover-content-available-height)-2rem)] w-(--radix-popover-trigger-width) overflow-y-scroll rounded-xl border-3 shadow-lg"
            sideOffset={16}
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            {isFetching ? (
              <Message>
                <Loader2 className="size-8 animate-spin" />
              </Message>
            ) : searchValue.trim().length < 3 ? (
              <Message>Type to search...</Message>
            ) : searchResults?.length === 0 ? (
              <Message>No results found</Message>
            ) : (
              searchResults?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </form>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full w-full place-items-center">
      <p className="text-muted">{children}</p>
    </div>
  );
}
