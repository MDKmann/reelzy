// Reusable movie sorting utility
export const MovieSortFilters = {
  DEFAULT: "DEFAULT",
  YEAR_HIGH_TO_LOW: "YEAR_HIGH_TO_LOW",
  YEAR_LOW_TO_HIGH: "YEAR_LOW_TO_HIGH",
  RATING_HIGH_TO_LOW: "RATING_HIGH_TO_LOW",
  RATING_LOW_TO_HIGH: "RATING_LOW_TO_HIGH",
};

export function sortMoviesArray(
  movies = [],
  filter = MovieSortFilters.DEFAULT
) {
  if (!Array.isArray(movies) || movies.length === 0) return movies;
  switch (filter) {
    case MovieSortFilters.YEAR_HIGH_TO_LOW:
      return movies.toSorted(
        (b, a) => Date.parse(a.Released) - Date.parse(b.Released)
      );
    case MovieSortFilters.YEAR_LOW_TO_HIGH:
      return movies.toSorted(
        (a, b) => Date.parse(a.Released) - Date.parse(b.Released)
      );
    case MovieSortFilters.RATING_HIGH_TO_LOW:
      return movies.toSorted(
        (b, a) => Number(a.imdbRating) - Number(b.imdbRating)
      );
    case MovieSortFilters.RATING_LOW_TO_HIGH:
      return movies.toSorted(
        (b, a) => Number(a.imdbRating) - Number(b.imdbRating)
      );
    default:
      return movies;
  }
}

// Light wrapper hook if needed later
export function applyMovieSort(movies, filter, setData) {
  const sorted = sortMoviesArray(movies, filter);
  setData(sorted);
}
