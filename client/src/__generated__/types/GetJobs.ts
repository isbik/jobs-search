import type { OrderDirection } from "./OrderDirection";
import type { Job } from "./Job";

 export const getJobsQueryParamsOrderBy = {
    "createdAt": "createdAt",
    "minSalary": "minSalary"
} as const;
export type GetJobsQueryParamsOrderBy = (typeof getJobsQueryParamsOrderBy)[keyof typeof getJobsQueryParamsOrderBy];
export const getJobsQueryParamsWorkType = {
    "full-time": "full-time",
    "part-time": "part-time",
    "internship": "internship",
    "contract": "contract"
} as const;
export type GetJobsQueryParamsWorkType = (typeof getJobsQueryParamsWorkType)[keyof typeof getJobsQueryParamsWorkType];
export type GetJobsQueryParams = {
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
    orderBy?: GetJobsQueryParamsOrderBy;
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
    workType?: GetJobsQueryParamsWorkType | null;
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
export type GetJobs200 = {
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
 * @description Get all jobs
*/
export type GetJobsQueryResponse = {
    /**
     * @type number
    */
    total: number;
    /**
     * @type array
    */
    items: Job[];
};
export type GetJobsQuery = {
    Response: GetJobsQueryResponse;
    QueryParams: GetJobsQueryParams;
};