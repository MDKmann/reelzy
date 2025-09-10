import { createGlobalState } from "../data/createGlobalState";

// Factory wrapper so callers can still pass (key, initialData)
// Usage: const { data, setData } = useSearchState('searchResults', [])
export function useSearchState(key = "searchResults", initialData = []) {
  const useStateHook = createGlobalState(key, initialData);
  return useStateHook();
}
