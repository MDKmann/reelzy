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
import { DarkSearchBar } from "@/components/DarkSearchBar.jsx";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState();
  const [actors, setActors] = useState();
  const [img, setImg] = useState();
  const BASE_API_URL = "https://www.omdbapi.com/?";
  const KEY = "&apikey=fd7c8c4e";

  const { id } = useParams();

  const runtimeRef = useRef("");

  const imageLoaded = useCallback((posterUrl) => {
    if (!posterUrl) return;
    const image = new Image();
    image.src = posterUrl;
    image.onload = () => setImg(image);
  }, []);

  useEffect(() => {
    let active = true;
    async function fetchMovieDetails() {
      try {
        const { data } = await axios.get(`${BASE_API_URL}i=${id}${KEY}`);
        if (!active) return;
        setMovie(data);
        setGenres(data.Genre?.split(", ") || []);
        setActors(data.Actors?.split(", ") || []);
        runtimeRef.current = fixTime(data.Runtime);
        imageLoaded(data.Poster);
      } catch {
        // swallow for now or set error state if needed
      }
    }
    fetchMovieDetails();
    return () => {
      active = false;
    };
  }, [id, imageLoaded]);

  return (
    <>
      <DarkSearchBar />
      <section className="py-8 antialiased md:py-16">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          {imageLoaded(movie)}
          {img ? (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="mx-auto max-w-[300px] max-h-[444px] shrink-0 lg:max-w-lg card-shadow-dark rounded-lg">
                  <img
                    className="w-full mx-auto border border-gray-900 movie-card-img rounded-xl"
                    src={movie.Poster}
                    alt=""
                  />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-white sm:text-2xl">
                    {movie.Title}
                  </h1>
                  <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                    <p className="text-2xl font-extrabold text-white sm:text-3xl">
                      {movie.Rated}
                    </p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FontAwesomeIcon icon={faStar} />
                      </div>

                      <p className="text-lg font-medium leading-none text-gray-400">
                        {movie.imdbRating}/10
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-4 sm:flex sm:items-center sm:gap-4"></div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
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
                    <div className="col-start-2 mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4">
                      {actors?.map((actor) => (
                        <a
                          key={actor}
                          href={`https://www.google.com/search?q=${actor}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title=""
                          className="flex items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                          role="button"
                        >
                          <svg
                            className="size-5 -ms-2 me-2"
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

                  <hr className="my-6 border-gray-800 md:my-8" />

                  <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {movie.Plot}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400">
                    {movie.Awards}
                  </p>

                  <div className="col-start-2 mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4">
                    {genres?.map((genre) => (
                      <a
                        key={genre}
                        href="#"
                        title=""
                        className="flex items-center justify-center rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-gray-700 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                        role="button"
                      >
                        <svg
                          className="size-5 -ms-2 me-2"
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
                  <hr className="mt-12 border-gray-800 sm:hidden" />
                  <div className="flex justify-center mt-8 sm:hidden">
                    <a
                      id="watch"
                      href={`https://www.google.com/search?q=Watch+${movie.Title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      role="button"
                      className="flex items-center justify-center rounded-lg border border-gray-600 bg-red-700 px-8 py-3 text-lg font-medium text-gray-200 hover:bg-red-600 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                    >
                      <svg
                        className="size-5 -ms-2 me-2"
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
              <hr className="mt-16 border-gray-800 lg:my-12" />
              <div className="justify-center hidden mt-16 sm:flex lg:my-12">
                <a
                  id="watch"
                  href={`https://www.google.com/search?q=Watch+${movie.Title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  className="flex items-center justify-center rounded-lg border border-gray-600 bg-red-700 px-8 py-3 text-lg font-medium text-gray-200 hover:bg-red-600 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                >
                  <svg
                    className="size-5 -ms-2 me-2"
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
                <div className="max-w-md mx-auto shrink-0 lg:max-w-lg">
                  <img className="w-full bg-gray-700 rounded-md movie-card-img" />
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="w-48 h-5 mb-4 bg-gray-200 rounded-full dark:bg-gray-700"></h1>
                  <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                    <p className="w-16 h-5 mb-4 bg-gray-200 rounded-full dark:bg-gray-700"></p>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-4 sm:flex sm:items-center sm:gap-4"></div>

                  <div className="h-3 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                  <div className="mt-6 sm:mt-8 sm:flex sm:items-center sm:gap-4">
                    <div className="col-start-2 mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4">
                      {actors?.map((actor) => (
                        <a
                          key={actor}
                          href="#"
                          title=""
                          className="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                          role="button"
                        >
                          <svg
                            className="w-5 h-5 -ms-2 me-2"
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
                    <div className="h-3 mb-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full dark:bg-gray-700 w-84"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full dark:bg-gray-700 w-60"></div>
                  </p>

                  <p className="h-3 mb-4 bg-gray-200 rounded-full dark:bg-gray-700 w-72"></p>

                  <div className="col-start-2 mt-6 sm:mt-8 sm:flex sm:items-start sm:gap-4">
                    {genres?.map((genre) => (
                      <a
                        key={genre}
                        href="#"
                        title=""
                        className="hover:text-primary-700 flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 my-2 sm:my-0 max-w-[350px]"
                        role="button"
                      >
                        <svg
                          className="w-5 h-5 -ms-2 me-2"
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
