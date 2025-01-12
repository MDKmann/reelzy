import { createGlobalState } from "../data/createGlobalState";
import topMovies from "../data/topMovies.json"

export const useSearchState = createGlobalState('searchResults', topMovies);