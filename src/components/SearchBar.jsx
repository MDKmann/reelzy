import MagnifySVG from "./MagnifySVG";
// import SlidersSVG from "./SlidersSVG";
import useFetchMovies from "../hooks/useFetchMovies";
import { useSearchState } from "../hooks/useSearchState";
// import { handleSortMovies } from "../utils/sortMovies";
import SortSelect from "./SortSelect";

import { getItem } from "../utils/localStorage";
import { useEffect, useState } from "react";
import SlidersSVG from "./SlidersSVG";

export function SearchBar() {
  // const [filter, setFilter] = useState("");
  const { searchValue, setSearchValue, refetch } = useFetchMovies();
  const { data, setData, resetData } = useSearchState(
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
    console.log(filter);
    let movies = data;
    console.log(movies)

    if (filter === "YEAR_HIGH_TO_LOW") {
      setData(
        movies.toSorted(
          (b, a) => Date.parse(a.Released) - Date.parse(b.Released)
        )
      );
    }
    if (filter === "YEAR_LOW_TO_HIGH") {
      setData(
        movies.toSorted(
          (a, b) => Date.parse(a.Released) - Date.parse(b.Released)
        )
      );
    }
    if (filter === "RATING_HIGH_TO_LOW") {
      setData(
        movies.toSorted((b, a) => (a.imdbRating) - (b.imdbRating))
      );
    }
    if (filter === "RATING_LOW_TO_HIGH") {
      setData(
        movies.toSorted((b, a) => Number(a.imdbRating) - Number(b.imdbRating))
      );
    }
    console.log(movies)
  }

  useEffect(() => {
    sortMovies();
    refetch;
    console.log(data)
  }, [data, setData, resetData]);

  return (
    <div className="m-4 flex justify-center">
      <div className="flex w-full max-w-[600px] rounded-full bg-[#0d1829] px-2">
        <button className="flex cursor-pointer self-center bg-[#0d1829] p-1"></button>
        <div className="relative group">
          <label alt="filter movies"
          >
            <div className="absolute mx-4 my-2 group-focus:opacity-0 group-hover:opacity-0 group-active:opacity-0 group:transition-all">
              <SlidersSVG />
            </div>
            <select
              id="filter"
              defaultValue="DEFAULT"
              onChange={(event) => sortMovies(event.target.value)}
              className="text-gray-400 w-8 h-10 px-5 pr-10 rounded-full text-sm select-anim"
            >
              <option value="DEFAULT" disabled>
                Sort
              </option>
              <option value="YEAR_HIGH_TO_LOW">
                Year Released, Newest to Oldest
              </option>
              <option value="YEAR_LOW_TO_HIGH">
                Year Released, Oldest to Newest
              </option>
              <option value="RATING_HIGH_TO_LOW">
                Rating, Highest to Lowest
              </option>
              <option value="RATING_LOW_TO_HIGH">
                Rating, Lowest to Highest
              </option>
            </select>
          </label>

        </div>

        <form className="flex grow" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by title . . ."
            required
            className="flex grow w-full bg-[#0d1829] bg-transparent pl-2 text-[#cccccc] focus:outline-none z-10 outline-0"
          />
          <button
            type="submit"
            className="relative rounded-full bg-[#0d1829] p-2"
          >
            <MagnifySVG />
          </button>
        </form>
      </div>
    </div>
  );
}
