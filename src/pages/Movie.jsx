import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faChalkboardUser,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fixTime } from "../utils/fixTime";
import { SearchBar } from "../components/SearchBar";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState();
  const [actors, setActors] = useState();
  const [img, setImg] = useState();
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const { id } = useParams();

  const runtimeRef = useRef("");

  const imageLoaded = useCallback((movie) => {
    const image = new Image();
    image.src = movie.Poster;
    image.onload = () => {
      setImg(image);
    };
  }, []);

  useEffect(() => {
    async function fetchMovieDetails() {
      const { data } = await axios.get(`${BASE_API_URL}i=${id}${KEY}`);

      const genresString = data.Genre;
      const genreArray = genresString.split(", ");
      setGenres(genreArray);

      const actorsString = data.Actors;
      const actorsArray = actorsString.split(", ");
      setActors(actorsArray);

      runtimeRef.current = fixTime(data.Runtime);

      setMovie(data);
    }
    fetchMovieDetails();
    console.log(movie);
  }, [id, imageLoaded]);

  return (
    <>
      <SearchBar />
      <section className=" py-8 antialiased md:py-16 bg-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {imageLoaded(movie)}
          {img ? (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="mx-auto max-w-[300px] max-h-[444px] shrink-0 lg:max-w-lg card-shadow-dark rounded-lg">
                  <img
                    className=" w-full movie-card-img mx-auto rounded-xl border border-gray-900"
                    src={movie.Poster}
                    alt=""
                  />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold sm:text-2xl text-white">
                    {movie.Title}
                  </h1>
                  <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                    <p className="text-2xl font-extrabold sm:text-3xl text-white">
                      {movie.Rated}
                    </p>

                    <div className="mt-2 flex items-center gap-2 sm:mt-0">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FontAwesomeIcon icon={faStar} />
                      </div>

                      <p className="text-lg font-medium leading-none text-gray-400">
                        {movie.imdbRating}/10
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-4 sm:flex sm:items-center sm:gap-4"></div>

                  <div className="mt-2 flex items-center gap-2 sm:mt-0">
                    <div className="flex items-center gap-1 text-red-600">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>

                    <p className="text-sm font-medium leading-none text-gray-400">
                      {movie.Year}
                    </p>

                    <div className="flex items-center gap-1 text-red-600">
                      <FontAwesomeIcon icon={faClock} />
                    </div>

                    <a
                      href="#"
                      className="text-sm font-medium leading-none text-gray-400"
                    >
                      {runtimeRef.current}
                    </a>
                  </div>
                  <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                      {actors?.map((actor) => (
                        <a
                          key={actor}
                          href={`https://www.google.com/search?q=${actor}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          className="hover:text-primary-700 flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                          <span className="text-white">{actor}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <hr className="my-6  md:my-8 border-gray-800" />

                  <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {movie.Plot}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    {movie.Awards}
                  </p>

                  <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                    {genres?.map((genre) => (
                      <a
                        key={genre}
                        href="#"
                        title=""
                        className="hover:text-primary-700 flex items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                        <span className="text-white">{genre}</span>
                      </a>
                    ))}
                  </div>
                  <hr className=" sm:hidden mt-12 border-gray-800" />
                  <div className="sm:hidden mt-8 flex justify-center">
                    <a
                      id="watch"
                      href={`https://www.google.com/search?q=Watch+${movie.Title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="button"
                      className="hover:text-primary-700 flex items-center justify-center rounded-lg border px-8 py-3 text-lg font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-red-700 text-gray-200 hover:bg-red-600 hover:text-white focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                        <FontAwesomeIcon icon="fa-solid fa-ticket" />
                      </svg>
                      <span>Watch</span>
                    </a>
                  </div>
                </div>
              </div>
              <hr className="mt-16  lg:my-12 border-gray-800" />
              <div className=" hidden sm:flex mt-16 lg:my-12 justify-center">
                <a
                  id="watch"
                  href={`https://www.google.com/search?q=Watch+${movie.Title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="hover:text-primary-700 flex items-center justify-center rounded-lg border px-8 py-3 text-lg font-medium focus:z-10 focus:outline-none focus:ring-4 border-gray-600 bg-red-700 text-gray-200 hover:bg-red-600 hover:text-white focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                    <FontAwesomeIcon icon="fa-solid fa-ticket" />
                  </svg>
                  <span>Watch</span>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
                  <img className="w-full movie-card-img bg-gray-700 rounded-md" />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></h1>
                  <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                    <p className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mb-4"></p>

                    <div className="mt-2 flex items-center gap-2 sm:mt-0">
                      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-4 sm:flex sm:items-center sm:gap-4"></div>

                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                  <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                    <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                      {actors?.map((actor) => (
                        <a
                          key={actor}
                          href="#"
                          title=""
                          className="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                          ></svg>
                          <span className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />

                  <p className="mb-6 text-gray-500 dark:text-gray-400">
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84 mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60 mb-3"></div>
                  </p>

                  <p className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-72 mb-4"></p>

                  <div className="mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4 col-start-2">
                    {genres?.map((genre) => (
                      <a
                        key={genre}
                        href="#"
                        title=""
                        className="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
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
                        ></svg>
                        <span className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MovieDetails;
