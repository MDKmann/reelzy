import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import { SearchBar } from "../components/SearchBar";
import { useSearchState } from "../hooks/useSearchState";
import { useLocation } from "react-router-dom";
import { DarkSearchBar } from "@/components/ui/DarkSearchBar";

const Search = () => {
  const { data } = useSearchState();
  const [results, setResults] = useState([]);
  const { state } = useLocation(); // <-- unpack route state

useEffect(() => {setResults(data)}, [data,state])

  return (
    <>
      <div className="flex flex-col items-center h-3/4">
        <DarkSearchBar />
        <MovieGrid data={results}/>
      </div>
    </>
  );
};

export default Search;
