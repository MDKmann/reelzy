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
import { DarkSearchBar } from "@/components/ui/DarkSearchBar";

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
      <section className="min-h-screen py-8 antialiased md:py-16">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          {img ? (
            <>
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="mx-auto max-w-[300px] max-h-[444px] shrink-0 lg:max-w-lg">
                  <div className="p-4 glass-card rounded-2xl">
                    <img
                      className="w-full mx-auto shadow-2xl rounded-xl"
                      src={movie.Poster || "/placeholder.svg"}
                      alt={movie.Title}
                    />
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <div className="p-6 mb-6 glass-card rounded-2xl">
                    <h1 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                      {movie.Title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="px-4 py-2 rounded-full glass-pill">
                        <p className="text-lg font-bold text-white">
                          {movie.Rated}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <p className="text-lg font-medium text-white">
                          {movie.imdbRating}/10
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6 text-purple-300">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="text-purple-400"
                        />
                        <span className="text-sm font-medium">
                          {movie.Year}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-purple-400"
                        />
                        <span className="text-sm font-medium">
                          {runtimeRef.current}
                        </span>
                      </div>
                    </div>
                  </div>

                  {actors && actors.length > 0 && (
                    <div className="p-6 mb-6 glass-card rounded-2xl">
                      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                        <FontAwesomeIcon
                          icon={faChalkboardUser}
                          className="text-purple-400"
                        />
                        Cast
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {actors.map((actor) => (
                          <a
                            key={actor}
                            href={`https://www.google.com/search?q=${actor}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 rounded-full glass-pill hover:bg-purple-500/30 hover:scale-105"
                          >
                            {actor}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-6 mb-6 glass-card rounded-2xl">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                      Plot
                    </h3>
                    <p className="mb-4 leading-relaxed text-gray-300">
                      {movie.Plot}
                    </p>
                    {movie.Awards && (
                      <div className="inline-block px-4 py-2 rounded-full glass-pill">
                        <p className="text-sm text-purple-300">
                          {movie.Awards}
                        </p>
                      </div>
                    )}
                  </div>

                  {genres && genres.length > 0 && (
                    <div className="p-6 mb-6 glass-card rounded-2xl">
                      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-white">
                        <FontAwesomeIcon
                          icon={faList}
                          className="text-purple-400"
                        />
                        Genres
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {genres.map((genre) => (
                          <div
                            key={genre}
                            className="px-4 py-2 text-sm font-medium text-white rounded-full glass-pill"
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <a
                      href={`https://www.google.com/search?q=Watch+${movie.Title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-8 py-4 font-bold text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl hover:scale-105 hover:shadow-purple-500/25"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Watch Now
                    </a>
                  </div>
                </div>
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

                  <div className="mb-6 text-gray-500 dark:text-gray-400">
                    <div className="h-3 mb-3 bg-gray-200 rounded-full w-84 dark:bg-gray-700"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full w-84 dark:bg-gray-700"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full w-84 dark:bg-gray-700"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full w-84 dark:bg-gray-700"></div>
                    <div className="h-3 mb-3 bg-gray-200 rounded-full w-60 dark:bg-gray-700"></div>
                  </div>

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
