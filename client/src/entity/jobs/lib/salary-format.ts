import { currencyFormatter } from "@/shared/lib";

export const formatSalary = (minSalary: number, maxSalary: number) => {
  return minSalary === maxSalary
    ? currencyFormatter.format(minSalary)
    : `${currencyFormatter.format(minSalary)} - ${currencyFormatter.format(maxSalary)}`;
};
