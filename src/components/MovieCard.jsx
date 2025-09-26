import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fixTime } from "../utils/fixTime";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card.jsx";
import { Badge } from "@/components/ui/Badge.jsx";

const MovieCard = ({ movie }) => {
  const runtimeRef = useRef("");
  const [img, setImg] = useState();

  const imageLoaded = useCallback((posterUrl) => {
    if (!posterUrl) return;
    const image = new Image();
    image.src = posterUrl;
    image.onload = () => setImg(image);
  }, []);

  // Update runtime whenever the runtime changes
  useEffect(() => {
    runtimeRef.current = fixTime(movie?.Runtime);
  }, [movie?.Runtime]);

  // Preload poster image when URL changes
  useEffect(() => {
    imageLoaded(movie?.Poster);
  }, [imageLoaded, movie?.Poster]);

  return (
    <>
      {img ? (
        <>
          <Link
            key={movie.imdbID}
            to={`/${movie.imdbID}`}
            className="group rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <Card className="relative flex aspect-[2/3] rounded-xl border border-border/50 transition-all duration-300 hover:border-border hover:shadow-lg group-hover:translate-y-[-2px] group-hover:scale-105">
              <div className="absolute aspect-[2/3] h-full rounded-xl object-cover">
                <img
                  src={movie.Poster}
                  alt={`${movie.Title} poster`}
                  loading="lazy"
                  className="size-full rounded-xl object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 rounded-b-xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute left-0 top-2 flex w-full items-center justify-between px-4">
                  {movie.imdbRating && movie.imdbRating !== "N/A" && (
                    <span className="flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-[11px] font-medium text-amber-300 backdrop-blur-sm">
                      <FontAwesomeIcon icon={faStar} className="size-3" />
                      {movie.imdbRating}
                    </span>
                  )}
                  {movie.Rated && movie.Rated !== "N/A" && (
                    <Badge
                      variant="secondary"
                      className="bg-white/15 text-[11px] font-medium text-white backdrop-blur-sm"
                    >
                      {movie.Rated}
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="place-self-end translate-y-8 p-4 text-xs text-muted-foreground group-hover:translate-y-0 transition-secondary">
                <CardHeader className="px-2 pb-0">
                  <CardTitle className="line-clamp-2 text-base leading-snug group-hover:text-primary">
                    {movie.Title}
                  </CardTitle>
                </CardHeader>
                <div className="mt-4 flex flex-wrap items-center gap-2 space-x-4 opacity-0 transition-opacity delay-500 group-hover:opacity-100">
                  {movie.Year && (
                    <span className="rounded bg-muted/40 px-2 py-1">
                      {movie.Year}
                    </span>
                  )}
                  {runtimeRef.current && (
                    <span className="rounded bg-muted/40 px-2 py-1">
                      {runtimeRef.current}
                    </span>
                  )}
                  {movie.Genre && typeof movie.Genre === "string" && (
                    <span
                      className="max-w-[120px] truncate"
                      title={movie.Genre}
                    >
                      {movie.Genre.split(", ").slice(0, 2).join(", ")}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        </>
      ) : (
        <>
          <div className="relative group rounded-2xl transition-group hover:scale-105">
            <div className="absolute inset-0 flex items-end rounded-2xl">
              <div className="p-4 text-white sm:translate-y-8 group-hover:translate-y-0 transition-secondary">
                <h3 className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></h3>
                <div className="mt-4 transition-opacity delay-500 group-hover:opacity-100 sm:space-x-4 sm:opacity-0">
                  <div className="flex justify-start">
                    <div className="mr-2 h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mr-2 h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-2 w-16 rounded-full bg-gray-200 dark:bg-gray-700 "></div>
                  </div>
                </div>
              </div>
            </div>
            <img className="movie-card-img rounded-2xl bg-gray-500 object-cover" />
          </div>
        </>
      )}
    </>
  );
};

export default MovieCard;
