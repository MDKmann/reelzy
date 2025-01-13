import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const { id } = useParams()


  useEffect(() => {
      async function fetchMovieDetails() {
        const { data } = await axios.get(`${BASE_API_URL}i=${id}${KEY}`);
        setMovie(data);
      };
      fetchMovieDetails()
      console.log(movie)
  },[id])

  return (
    <>
      <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
              <img className="w-full dark:hidden" src={movie.Poster} alt="" />
              <img
                className="hidden w-full dark:block"
                src={movie.Poster}
                alt=""
              />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {movie.Title}
              </h1>
              <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  {movie.Rated}
                </p>

                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    ({movie.imdbRating})
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    345 Reviews
                  </a>
                </div>
              </div>

              {/* <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                <a
                  href="#"
                  title=""
                  className="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  role="button"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>
                  Add to favorites
                </a>

                <a
                  href="#"
                  title=""
                  className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4 flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 sm:mt-0"
                  role="button"
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </a>
              </div> */}

              <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {movie.Plot}
              </p>

              <p className="text-gray-500 dark:text-gray-400">{movie.Awards}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
