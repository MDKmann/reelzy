// Reusable movie sorting utility
export const MovieSortFilters = {
  DEFAULT: "DEFAULT",
  YEAR_HIGH_TO_LOW: "YEAR_HIGH_TO_LOW",
  YEAR_LOW_TO_HIGH: "YEAR_LOW_TO_HIGH",
  RATING_HIGH_TO_LOW: "RATING_HIGH_TO_LOW",
  RATING_LOW_TO_HIGH: "RATING_LOW_TO_HIGH",
};

/**
 * Sort an array of OMDB movie objects by the specified filter.
 * - Falls back gracefully when Released/Year or imdbRating are missing/"N/A".
 * - Uses slice().sort for wide compatibility (avoids Array.prototype.toSorted).
 */
export function sortMoviesArray(
  movies = [],
  filter = MovieSortFilters.DEFAULT
) {
  if (!Array.isArray(movies) || movies.length === 0) return movies;
  const toTimestamp = (m) => {
    const r =
      m?.Released && m.Released !== "N/A" ? Date.parse(m.Released) : NaN;
    if (!Number.isNaN(r)) return r;
    const y = parseInt(m?.Year, 10);
    return Number.isFinite(y) ? Date.parse(`${y}-01-01`) : 0;
  };
  const toRating = (m) => {
    const v = Number(m?.imdbRating);
    return Number.isFinite(v) ? v : 0;
  };
  switch (filter) {
    case MovieSortFilters.YEAR_HIGH_TO_LOW:
      return movies.slice().sort((a, b) => toTimestamp(b) - toTimestamp(a));
    case MovieSortFilters.YEAR_LOW_TO_HIGH:
      return movies.slice().sort((a, b) => toTimestamp(a) - toTimestamp(b));
    case MovieSortFilters.RATING_HIGH_TO_LOW:
      return movies.slice().sort((a, b) => toRating(b) - toRating(a));
    case MovieSortFilters.RATING_LOW_TO_HIGH:
      return movies.slice().sort((a, b) => toRating(a) - toRating(b));
    default:
      return movies;
  }
}

// Light wrapper hook if needed later
export function applyMovieSort(movies, filter, setData) {
  const sorted = sortMoviesArray(movies, filter);
  setData(sorted);
}
