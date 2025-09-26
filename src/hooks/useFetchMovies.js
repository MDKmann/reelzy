import axios from "axios";
import { useDebounce } from "../utils/debounceHook";
import { useCallback, useEffect, useState } from "react";
import { useSearchState } from "./useSearchState";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../utils/localStorage";
import { sortMoviesArray, MovieSortFilters } from "@/utils/movieSort";

export default function useFetchMovies() {
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const { setData } = useSearchState("searchResults", []);
  const { data: sortFilter = MovieSortFilters.DEFAULT } = useSearchState(
    "sortFilter",
    MovieSortFilters.DEFAULT
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchRequest = useCallback(
    async (
      queryOverride,
      manual = false,
      currentSort = MovieSortFilters.DEFAULT
    ) => {
      const storedResults = getItem("searchResults") || [];
      const query =
        typeof queryOverride === "string"
          ? queryOverride.trim()
          : debouncedSearch;
      const isManual =
        manual ||
        (typeof queryOverride === "string" && queryOverride.trim().length > 0);
      if (!query) {
        setData(storedResults);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        let fullSearchResults = {};
        const { data } = await axios.get(
          `${BASE_API_URL}s=${encodeURIComponent(query)}${KEY}`
        );
        let responseDataSearch = data?.Search || storedResults;
        const responseDataIds =
          responseDataSearch?.map((movie) => movie.imdbID) || [];
        await Promise.allSettled(
          responseDataIds.map(async (id) => {
            const responseMapped = await axios.get(
              `${BASE_API_URL}i=${id}${KEY}`
            );
            const responseMappedData = responseMapped.data;
            if (responseMappedData?.imdbID)
              fullSearchResults[responseMappedData.imdbID] = responseMappedData;
          })
        );
        const resultsArray = Object.values(fullSearchResults);
        const sortedResults = sortMoviesArray(resultsArray, currentSort);
        setItem("searchResults", sortedResults);
        setData(sortedResults);
        // Only navigate to /search on manual submissions
        if (isManual) {
          navigate("/search", { state: { query }, replace: true });
        }
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearch, navigate, setData]
  );

  useEffect(() => {
    handleSearchRequest(undefined, false, sortFilter);
    // Only fetch on search changes, not sort.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return {
    searchValue,
    setSearchValue,
    setData,
    refetch: handleSearchRequest,
    isLoading,
    error,
  };
}
