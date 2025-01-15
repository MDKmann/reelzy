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
  const [filter, setFilter] = useState("");
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

  useEffect(() => {
    function sortMovies(filter) {
      console.log(filter);
      let movies = data;

      if (filter === "YEAR_HIGH_TO_LOW") {
        setData(movies.toSorted((b, a) => a.Released - b.released));
      }
      // if (value === "YEAR_HIGH_TO_LOW") {
      //   movies.sort((a, b) => Date.parse(b.Released) - Date.parse(a.Released));
      // } else if (value === "YEAR_LOW_TO_HIGH") {
      //   movies.sort((a, b) => Date.parse(a.Released) - Date.parse(b.Released));
      // } else if (value === "RATING_HIGH_TO_LOW") {
      //   movies.sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
      // } else if (value === "RATING_LOW_TO_HIGH") {
      //   movies.sort((a, b) => Number(a.imdbRating) - Number(b.imdbRating));
      // }
    }
    sortMovies();
    refetch;
  }, [filter]);

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
              defaultValue=""
              className=" w-8 h-10 px-5 pr-10 rounded-full text-sm select-anim"
            >
              <option value="" disabled selected="">
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
          {/* <button className="peer relative z-10 block p-2 transition-colors duration-300 transform rounded-lg focus:outline-none border-2 border-blue-500">
            <SlidersSVG />
          </button>

          <div className="hidden peer-focus:block absolute right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border">
            <a
              href="#"
              className=" block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
             
              <span className="text-gray-600 dark:text-gray-400">
                SORT
              </span>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              small
              <span className="text-gray-600 dark:text-gray-400">
                Year Released, Newest to Oldest
              </span>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              medium
              <span className="text-gray-600 dark:text-gray-400">
                Year Released, Oldest to Newest
              </span>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              large
              <span className="text-gray-600 dark:text-gray-400">
                Rating, Highest to Lowest
              </span>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              large
              <span className="text-gray-600 dark:text-gray-400">
                Rating, Lowest to Highest
              </span>
            </a>
          </div> */}
        </div>

        <form className="flex grow" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search by title . . ."
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
