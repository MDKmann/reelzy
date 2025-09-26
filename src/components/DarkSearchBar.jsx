import useFetchMovies from "@/hooks/useFetchMovies";
import { useSearchState } from "@/hooks/useSearchState";
import { getItem } from "@/utils/localStorage";
import { ArrowRight } from "lucide-react";
import { MovieSortFilters } from "@/utils/movieSort";
import SortDropdown from "./SortDropdown";
import useScreenSize from "@/hooks/useScreenSize";

export function DarkSearchBar() {
  const { searchValue, setSearchValue, refetch, isLoading, error } =
    useFetchMovies();
  const { data, setData } = useSearchState(
    "searchResults",
    getItem("searchResults")
  );
  // Persist selected sort globally so other views can respect it
  const { setData: setSortFilter } = useSearchState(
    "sortFilter",
    MovieSortFilters.DEFAULT
  );
  const { data: currentSort = MovieSortFilters.DEFAULT } = useSearchState(
    "sortFilter",
    MovieSortFilters.DEFAULT
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchValue || !searchValue.trim()) return;
    // trigger immediate fetch bypassing debounce
    refetch(searchValue, true, currentSort);
  };

  const filterOptions = [
    { label: "Sort", value: MovieSortFilters.DEFAULT },
    {
      label: "Year Released, Newest to Oldest",
      value: MovieSortFilters.YEAR_HIGH_TO_LOW,
    },
    {
      label: "Year Released, Oldest to Newest",
      value: MovieSortFilters.YEAR_LOW_TO_HIGH,
    },
    {
      label: "Rating, Highest to Lowest",
      value: MovieSortFilters.RATING_HIGH_TO_LOW,
    },
    {
      label: "Rating, Lowest to Highest",
      value: MovieSortFilters.RATING_LOW_TO_HIGH,
    },
  ];

  function sortMovies(filter) {
    if (!Array.isArray(data) || !data.length) return;
    setSortFilter(filter);
    const toTimestamp = (m) => {
      const rel =
        m?.Released && m.Released !== "N/A" ? Date.parse(m.Released) : NaN;
      if (!Number.isNaN(rel)) return rel;
      const y = parseInt(m?.Year, 10);
      return Number.isFinite(y) ? Date.parse(`${y}-01-01`) : 0;
    };
    const toRating = (m) => {
      const v = Number(m?.imdbRating);
      return Number.isFinite(v) ? v : 0;
    };
    let next = data.slice();
    switch (filter) {
      case MovieSortFilters.YEAR_HIGH_TO_LOW:
        next.sort((a, b) => toTimestamp(b) - toTimestamp(a));
        break;
      case MovieSortFilters.YEAR_LOW_TO_HIGH:
        next.sort((a, b) => toTimestamp(a) - toTimestamp(b));
        break;
      case MovieSortFilters.RATING_HIGH_TO_LOW:
        next.sort((a, b) => toRating(b) - toRating(a));
        break;
      case MovieSortFilters.RATING_LOW_TO_HIGH:
        next.sort((a, b) => toRating(a) - toRating(b));
        break;
      default:
        return;
    }
    setData(next);
  }

  const screenSize = useScreenSize();

  const mobile = screenSize.width < 640;

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-50 flex justify-center m-8"
    >
      <div className="container mx-6">
        <div className="relative w-full max-w-screen-md mx-auto group sm:min-w-96">
          {/* Gradient glow border */}
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>

          {/* Main search container */}
          <div className="relative w-full border rounded-2xl border-slate-700/50 bg-slate-800/90 backdrop-blur-sm ">
            <div className="flex items-center gap-2 px-6 py-4">
              {/* Search icon */}
              <SortDropdown
                filterOptions={filterOptions}
                onSelect={(value) => {
                  sortMovies(value);
                }}
              />

              {/* Input field */}
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={mobile ? "Search" : "What movie sounds good?"}
                className="flex-1 text-lg text-white bg-transparent placeholder:text-gray-400 focus:outline-none"
              />

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 ml-4 transition-all duration-200 shrink-0 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="block border-2 rounded-full size-5 animate-spin border-white/30 border-t-white" />
                ) : (
                  <ArrowRight className="text-white size-5" />
                )}
              </button>
            </div>
            {error && (
              <div className="px-6 pb-3 text-xs text-red-400">{error}</div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
