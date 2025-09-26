import MovieCard from "./MovieCard";

// Accepts `data` (array of movie objects). Each movie should include at least:
// { imdbID, Title, Poster, Year, Rated, Runtime, imdbRating }
export function FeaturesCardGrid({ data = [] }) {
  const movies = Array.isArray(data) ? data : [];

  if (!movies.length) {
    return (
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 mx-auto text-center md:px-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            No results
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Try refining your search to find a movie.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 md:py-20">
      <div className="container px-4 mx-auto md:px-6">
        <div className="mb-10 space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Search Results
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-muted-foreground">
            Showing {movies.length} {movies.length === 1 ? "movie" : "movies"}{" "}
            for
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies
            .filter((m) => m?.Poster && m.Poster !== "N/A")
            .map((movie) => {
              // const runtime = movie.Runtime ? fixTime(movie.Runtime) : null;
              return <MovieCard movie={movie} key={movie.imdbID} />;
            })}
        </div>
      </div>
    </section>
  );
}
