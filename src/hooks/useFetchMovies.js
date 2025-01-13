import axios from "axios";
import { useDebounce } from "../utils/debounceHook";
import { useCallback, useEffect, useState } from "react";
import topMovies from "../data/topMovies.json";
import { useSearchState } from "./useSearchState";
import { useLocation, useNavigate } from "react-router-dom";


export default function useFetchMovies() {
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue);
  const { setData, resetData } = useSearchState("searchResults", {});
  const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

  const handleSearchRequest = useCallback(async () => {
    setIsLoading(true);
    let fullSearchResults = {};

    const { data } = await axios.get(
      `${BASE_API_URL}s=${debouncedSearch}${KEY}`
    );

    let responseDataSearch = [];
   
     responseDataSearch = data.Search;
    

    const responseDataIds = responseDataSearch?.map((movie) => movie.imdbID);
    await Promise.allSettled(
      responseDataIds?.map(async (id) => {
        // map over search results imdbIDs
        const responseMapped = await axios.get(`${BASE_API_URL}i=${id}${KEY}`);
        const responseMappedData = responseMapped.data;
        // Send request for each id
        fullSearchResults[responseMappedData.imdbID] = responseMappedData;
      })
    );
    setData(Object.values(fullSearchResults));
    console.log(Object.values(fullSearchResults));

    setIsLoading(false);
    if (searchValue) {
      navigate("/search", { state: searchValue, replace: true });
    }
  }, [debouncedSearch]);

  useEffect(() => {
    handleSearchRequest();
  }, [handleSearchRequest]);

  return {
    searchValue,
    setSearchValue,
    refetch: handleSearchRequest,
  };
}
