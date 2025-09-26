import { useEffect, useState } from "react";
import { useSearchState } from "../hooks/useSearchState";
import { MovieSortFilters, sortMoviesArray } from "@/utils/movieSort";
import { useLocation } from "react-router-dom";
import { DarkSearchBar } from "@/components/DarkSearchBar.jsx";
import { FeaturesCardGrid } from "@/components/FeaturesCardGrid.jsx";

const Search = () => {
  const { data } = useSearchState();
  const { data: currentSort = MovieSortFilters.DEFAULT } = useSearchState(
    "sortFilter",
    MovieSortFilters.DEFAULT
  );
  const [results, setResults] = useState([]);
  const { state } = useLocation(); // <-- unpack route state

  useEffect(() => {
    setResults(sortMoviesArray(data, currentSort));
  }, [data, currentSort, state]);

  return (
    <>
      <div className="flex h-3/4 flex-col items-center">
        <DarkSearchBar />
        <FeaturesCardGrid data={results} />
      </div>
    </>
  );
};

export default Search;
