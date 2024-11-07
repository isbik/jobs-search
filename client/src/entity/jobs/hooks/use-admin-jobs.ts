import { useGetInternalJobs } from "@/__generated__";

export const useAdminJobs = (
  params: Parameters<typeof useGetInternalJobs>["0"],
  query?: {
    enabled?: boolean;
  },
) => {
  return useGetInternalJobs(params, {
    query,
  });
};
