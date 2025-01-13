// import { useSearchState } from "../hooks/useSearchState";
import { useEffect } from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ data }) => {
  // const { data } = useSearchState();

  useEffect(() => {}, [data]);

  return (
    <div className="mobile-grid md:md-grid lg:xl-grid m-10">
      {data?.map((movie) =>
        movie.Poster !== "N/A" ? (
          <MovieCard key={movie.imdbID} movie={movie} />
        ) : null
      )}
    </div>
  );
};

export default MovieGrid;
