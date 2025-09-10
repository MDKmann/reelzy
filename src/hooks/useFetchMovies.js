import axios from "axios";
import { useDebounce } from "../utils/debounceHook";
import { useCallback, useEffect, useState } from "react";
import { useSearchState } from "./useSearchState";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../utils/localStorage";

export default function useFetchMovies() {
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const { setData, resetData } = useSearchState("searchResults", []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchRequest = useCallback(async () => {
    const storedResults = getItem("searchResults") || [];
    if (!debouncedSearch) {
      setData(storedResults);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      let fullSearchResults = {};
      const { data } = await axios.get(
        `${BASE_API_URL}s=${debouncedSearch}${KEY}`
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
      setItem("searchResults", resultsArray);
      setData(resultsArray);
      if (searchValue) {
        navigate("/search", { state: { query: searchValue }, replace: true });
      }
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, navigate, searchValue, setData]);

  useEffect(() => {
    handleSearchRequest();
  }, [handleSearchRequest]);

  return {
    searchValue,
    setSearchValue,
    setData,
    refetch: handleSearchRequest,
    isLoading,
    error,
  };
}
