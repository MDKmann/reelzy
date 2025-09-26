import { useCallback } from "react";
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

    const setData = useCallback(
      (updated) => {
        queryClient.setQueryData([queryKey], updated ?? []);
      },
      [queryClient]
    );

    const resetData = useCallback(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      queryClient.refetchQueries({ queryKey: [queryKey] });
    }, [queryClient]);

    return { data, setData, resetData };
  };
}
