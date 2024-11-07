import { useQueryClient, useQuery } from "@tanstack/react-query";

import { getUsersMe, User } from "../../../__generated__";

export const useMe = () => {
  const queryClient = useQueryClient();

  return useQuery<User>({
    queryKey: ["Me"],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    initialData: () => queryClient.getQueryData<User>(["Me"]),
    queryFn: () => getUsersMe(),
  });
};
