import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fixTime } from "../utils/fixTime";

const MovieCard = ({ movie }) => {
  const runtimeRef = useRef("");

  useEffect(() => {
    runtimeRef.current = fixTime(movie.Runtime);
  }, []);

  return (
    <Link to={`/${movie.imdbID}`}>
      {/* <div className="hover:card-hover-shadow transition-group group relative rounded-2xl hover:scale-105">
        <div className="absolute inset-0 flex items-end rounded-2xl border border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
          <div className="transition-secondary translate-y-8 p-4 text-white group-hover:translate-y-0">
            <h3 className="mb-2 text-xl font-bold">{movie.Title}</h3>
            <div className="mt-4 space-x-4 opacity-0 transition-opacity delay-500 group-hover:opacity-100">
              <span>
                <span className="text-yellow-400">
                <FontAwesomeIcon icon={faStar} />
                  </span> {movie.imdbRating}/10
              </span>
              <span>{movie.Rated}</span>
              <span>{runtimeRef.current}</span>
            </div>
          </div>
        </div>
        <img
          src={movie.Poster}
          loading="lazy"
          alt="movie-poster"
          className="movie-card-img rounded-2xl object-cover"
        />
      </div> */}
      <div className="hover:card-hover-shadow transition-group group relative rounded-2xl hover:scale-105">
        <div className="absolute inset-0 flex items-end rounded-2xl border border-[#b1b1b166] bg-gradient-to-t from-black/60 to-transparent">
          <div className="transition-secondary sm:translate-y-8 p-4 text-white group-hover:translate-y-0">
            <h3 className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2"></h3>
            <div className="mt-4 sm:space-x-4 sm:opacity-0 transition-opacity delay-500 group-hover:opacity-100">

              <div className="flex justify-start">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mr-2"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 mr-2"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16 "></div>
              </div>
            </div>
          </div>
        </div>
        <img className="movie-card-img bg-gray-200 rounded-2xl object-cover" />
      </div>
    </Link>
  );
};

export default MovieCard;
