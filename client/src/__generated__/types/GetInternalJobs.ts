import type { OrderDirection } from "./OrderDirection";
import type { Job } from "./Job";

 export const getInternalJobsQueryParamsOrderBy = {
    "createdAt": "createdAt",
    "minSalary": "minSalary"
} as const;
export type GetInternalJobsQueryParamsOrderBy = (typeof getInternalJobsQueryParamsOrderBy)[keyof typeof getInternalJobsQueryParamsOrderBy];
export const getInternalJobsQueryParamsWorkType = {
    "full-time": "full-time",
    "part-time": "part-time",
    "internship": "internship",
    "contract": "contract"
} as const;
export type GetInternalJobsQueryParamsWorkType = (typeof getInternalJobsQueryParamsWorkType)[keyof typeof getInternalJobsQueryParamsWorkType];
export type GetInternalJobsQueryParams = {
    /**
     * @default 0
     * @type number
    */
    offset?: number | null;
    /**
     * @default 10
     * @type number
    */
    limit?: number | null;
    /**
     * @type string | undefined
    */
    search?: string;
    /**
     * @type string | undefined
    */
    orderBy?: GetInternalJobsQueryParamsOrderBy;
    /**
     * @type number
    */
    userId?: number | null;
    /**
     * @type number
    */
    categoryId?: number | null;
    /**
     * @type string
    */
    workType?: GetInternalJobsQueryParamsWorkType | null;
    /**
     * @type number
    */
    companyId?: number | null;
    /**
     * @type number
    */
    minSalary?: number | null;
    /**
     * @type boolean
    */
    isFeatured?: boolean | null;
    /**
     * @type string | undefined
    */
    orderDirection?: OrderDirection;
};
/**
 * @description Get all jobs
*/
export type GetInternalJobs200 = {
    /**
     * @type number
    */
    total: number;
    /**
     * @type array
    */
    items: Job[];
};
/**
 * @description Forbidden
*/
export type GetInternalJobs403 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Get all jobs
*/
export type GetInternalJobsQueryResponse = {
    /**
     * @type number
    */
    total: number;
    /**
     * @type array
    */
    items: Job[];
};
export type GetInternalJobsQuery = {
    Response: GetInternalJobsQueryResponse;
    QueryParams: GetInternalJobsQueryParams;
    Errors: GetInternalJobs403;
};