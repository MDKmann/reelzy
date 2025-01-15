
import SlidersSVG from "./SlidersSVG";

// const options = [
//   { value: " ", label: "Sort" },
//   { value: "YEAR_HIGH_TO_LOW", label: "Year Released, Newest to Oldest" },
//   { value: "YEAR_LOW_TO_HIGH", label: "Year Released, Oldest to Newest" },
//   { value: "RATING_HIGH_TO_LOW", label: "Rating, Highest to Lowest" },
//   { value: "RATING_LOW_TO_HIGH", label: "Rating, Lowest to Highest" },
// ];

const SortSelect = (props) => {

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   return handleSortMovies(event)
  // };

    // useEffect(() => {
    //   function handleSortMovies(value) {
    //     console.log(value);
    //     let movies = data;

    //     if (value === "YEAR_HIGH_TO_LOW") {
    //       setData(movies.toSorted((b, a) => a.Released - b.released));
    //     }
    //     // if (value === "YEAR_HIGH_TO_LOW") {
    //     //   movies.sort((a, b) => Date.parse(b.Released) - Date.parse(a.Released));
    //     // } else if (value === "YEAR_LOW_TO_HIGH") {
    //     //   movies.sort((a, b) => Date.parse(a.Released) - Date.parse(b.Released));
    //     // } else if (value === "RATING_HIGH_TO_LOW") {
    //     //   movies.sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
    //     // } else if (value === "RATING_LOW_TO_HIGH") {
    //     //   movies.sort((a, b) => Number(a.imdbRating) - Number(b.imdbRating));
    //     // }
    //   }
    //   handleSortMovies();
    //   refetch;
    // }, [handleSortMovies]);

  return (
    <>
      <button className="peer relative z-10 block p-2 transition-colors duration-300 transform rounded-lg focus:outline-none border-2 border-blue-500">
        <SlidersSVG />
      </button>
      <div className="hidden peer-focus:block absolute right-0 z-20 w-48 mt-2 overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800 border">
        <a
          href="#"
          onClick={() => props.handleSortMovies("YEAR_HIGH_TO_LOW")}
          className=" block px-4 py-2 text-sm text-gray-800 transition-colors duration-300 transform border-b dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="text-gray-600 dark:text-gray-400">SORT</span>
        </a>
        <a
          href="#"
          onClick={() => props.handleSortMovies("YEAR_HIGH_TO_LOW")}
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
      </div>
    </>
  );
};

export default SortSelect;
