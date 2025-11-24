import React, { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Popover } from "radix-ui";
import { Input, MovieWithFavoriteButton } from "@/components";
import { useDebounce } from "@/lib/hooks";
import { moviesApi } from "@/service/api";

type SearchbarProps = {
  onMovieClick: (id: number) => void;
  favoriteMovies: Array<number>;
};

export function Searchbar({ onMovieClick, favoriteMovies }: SearchbarProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { data: searchResults, isFetching } = useQuery({
    queryFn: () => moviesApi.searchMovies({ search: debouncedSearchValue }),
    queryKey: ["movies", { searchValue: debouncedSearchValue }],
    enabled: debouncedSearchValue.trim().length > 2,
  });

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="w-full"
          onClick={(e) => {
            if (open) e.preventDefault();
          }}
        >
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
          className="bg-bg-light scrollbar border-border animate-slideDownAndFade shadow-bg-light h-[calc(var(--radix-popover-content-available-height)-2rem)] w-(--radix-popover-trigger-width) overflow-y-scroll rounded-xl border-3 shadow-lg"
          sideOffset={16}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {isFetching ? (
            <Message>
              <Loader2 className="size-8 animate-spin" />
            </Message>
          ) : searchValue.trim().length < 3 ? (
            <Message>Type to search...</Message>
          ) : searchResults?.items.length === 0 ? (
            <Message>No results found</Message>
          ) : (
            searchResults?.items.map((movie) => (
              <MovieWithFavoriteButton
                key={movie.id}
                movie={movie}
                favoriteMovies={favoriteMovies}
                onClick={() => onMovieClick(movie.id)}
              />
            ))
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full w-full place-items-center">
      <p className="text-muted">{children}</p>
    </div>
  );
}
