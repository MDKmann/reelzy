import useFetchMovies from "@/hooks/useFetchMovies";
import { useSearchState } from "@/hooks/useSearchState";
import { getItem } from "@/utils/localStorage";
import { Search, Filter, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { MovieSortFilters, applyMovieSort } from "@/utils/movieSort";

export function DarkSearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(MovieSortFilters.DEFAULT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchValue, setSearchValue } = useFetchMovies();
  const { data, setData } = useSearchState(
    "searchResults",
    getItem("searchResults")
  );

  // const { path } = useLocation();
  // const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    //   if (searchValue) {
    //     navigate("/search", { state: searchValue, replace: true });
    //   }
  };

  // handleSortMovies(event, setData)

  function sortMovies(filter) {
    if (!data || !Array.isArray(data)) return;
    setSelectedSort(filter);
    applyMovieSort(data, filter, setData);
  }

  function handleSearchChange(value) {
    setError(null);
    setIsLoading(true);
    try {
      setSearchValue(value);
    } catch {
      setError("Failed to update search.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative z-50 flex justify-center">
      <div className="container relative self-center max-w-screen-md mx-6 group">
        {/* Gradient glow border */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>

        {/* Main search container */}
        <div className="relative border rounded-2xl border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
          <div className="flex items-center px-6 py-4">
            {/* Search icon */}
            <Search className="mr-4 text-gray-400 size-6 shrink-0" />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 p-2 mr-4 transition-colors duration-200 rounded-lg shrink-0 bg-slate-700/50 hover:bg-slate-600/50"
              >
                <Filter className="text-gray-400 size-4" />
                <ChevronDown
                  className={`size-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 z-50 w-64 mt-2 border shadow-xl top-full rounded-xl border-slate-700/50 bg-slate-800/95 backdrop-blur-sm">
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-400">
                      Sort Movies
                    </div>
                    <button
                      type="button"
                      onClick={() => sortMovies(MovieSortFilters.DEFAULT)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${selectedSort === MovieSortFilters.DEFAULT ? "bg-purple-500/20 text-purple-300" : "text-gray-300 hover:bg-slate-700/50"}`}
                    >
                      Sort
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sortMovies(MovieSortFilters.YEAR_HIGH_TO_LOW)
                      }
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        selectedSort === MovieSortFilters.YEAR_HIGH_TO_LOW
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Year Released, Newest to Oldest
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sortMovies(MovieSortFilters.YEAR_LOW_TO_HIGH)
                      }
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        selectedSort === MovieSortFilters.YEAR_LOW_TO_HIGH
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Year Released, Oldest to Newest
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sortMovies(MovieSortFilters.RATING_HIGH_TO_LOW)
                      }
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        selectedSort === MovieSortFilters.RATING_HIGH_TO_LOW
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Rating, Highest to Lowest
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        sortMovies(MovieSortFilters.RATING_LOW_TO_HIGH)
                      }
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors duration-200 ${
                        selectedSort === MovieSortFilters.RATING_LOW_TO_HIGH
                          ? "bg-purple-500/20 text-purple-300"
                          : "text-gray-300 hover:bg-slate-700/50"
                      }`}
                    >
                      Rating, Lowest to Highest
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Input field */}
            <input
              type="text"
              value={searchValue}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="What movie sounds good?"
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

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </form>
  );
}
