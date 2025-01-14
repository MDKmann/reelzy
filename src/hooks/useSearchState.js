import { createGlobalState } from "../data/createGlobalState";
import useFetchMovies from "./useFetchMovies";
const { searchResults } = useFetchMovies
export const useSearchState = createGlobalState('searchResults', searchResults );