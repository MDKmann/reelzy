import { createGlobalState } from "../data/createGlobalState";
import topMovies from "../data/topMovies.json"
import useFetchMovies from "./useFetchMovies";
const { searchResults } = useFetchMovies
export const useSearchState = createGlobalState('searchResults', searchResults );