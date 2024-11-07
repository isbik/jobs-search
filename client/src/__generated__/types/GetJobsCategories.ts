import type { Category } from "./Category";

 /**
 * @description Get all job categories
*/
export type GetJobsCategories200 = Category[];
/**
 * @description Get all job categories
*/
export type GetJobsCategoriesQueryResponse = Category[];
export type GetJobsCategoriesQuery = {
    Response: GetJobsCategoriesQueryResponse;
};