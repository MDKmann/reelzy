import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { faStar, faChalkboardUser, faList,  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fixTime } from "../utils/fixTime";
import { SearchBar } from "../components/SearchBar";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState();
  const [actors, setActors] = useState();
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const { id } = useParams();

  const runtimeRef = useRef('')

  useEffect(() => {
    async function fetchMovieDetails() {
      const { data } = await axios.get(`${BASE_API_URL}i=${id}${KEY}`);

      const genresString = data.Genre;
      const genreArray = genresString.split(", ");
      setGenres(genreArray);

      const actorsString = data.Actors;
      const actorsArray = actorsString.split(", ");
      setActors(actorsArray);

      runtimeRef.current = fixTime(data.Runtime)

      setMovie(data);
    }
    fetchMovieDetails();
    console.log(movie);
  }, [id]);

  return (
    <>
      <SearchBar />
      <section className="bg-white py-8 antialiased md:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
              <img className="w-full dark:hidden threeD_img" src={movie.Poster} alt="" />
              <img
                className="hidden w-full dark:block threeD_img"
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

                </div>
              </div>

              <div className="mt-2 sm:mt-4 sm:flex sm:items-center sm:gap-4"></div>

              <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </div>

                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                  {movie.Year}
                  </p>

                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} />
                  </div>

                  <a
                    href="#"
                    className="text-sm font-medium leading-none text-gray-900  dark:text-white"
                  >
                    {runtimeRef.current}
                  </a>

                </div>
              <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">

              <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                {actors?.map((actor) => (
                  <a
                    key={actor}
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
                      <FontAwesomeIcon icon={faChalkboardUser} />
                    </svg>
                    {actor}
                  </a>
                ))}
              </div>

                {/* <a
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
                  {movie.Actors}
                </a> */}
              </div>

              <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {movie.Plot}
              </p>

              <p className="text-gray-500 dark:text-gray-400">{movie.Awards}</p>

              <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                {genres?.map((genre) => (
                  <a
                    key={genre}
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
                     <FontAwesomeIcon icon={faList} />
                    </svg>
                    {genre}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
