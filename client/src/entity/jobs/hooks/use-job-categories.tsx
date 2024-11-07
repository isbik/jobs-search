import { useGetJobsCategories } from "../../../__generated__";

export const useJobCategories = () => {
  const { data: categories = [] } = useGetJobsCategories();

  return {
    categories,
  };
};
