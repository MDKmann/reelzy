import { useQuery, useQueryClient } from "@tanstack/react-query";

export function createGlobalState(queryKey, initialData) {
  return function useGlobalState() {
    const queryClient = useQueryClient();
    const safeInitial = initialData == null ? [] : initialData;

    const { data = safeInitial } = useQuery({
      queryKey: [queryKey],
      queryFn: () => Promise.resolve(safeInitial),
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    });

    function setData(updated) {
      queryClient.setQueryData([queryKey], updated ?? []);
    }

    function resetData() {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.refetchQueries({ queryKey: [queryKey] });
    }

    return { data, setData, resetData };
  };
}
