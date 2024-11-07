import type { Job } from "./Job";

 export type GetJobsJobidPathParams = {
    /**
     * @type number
    */
    jobId?: number | null;
};
/**
 * @description Get a job
*/
export type GetJobsJobid200 = Job;
/**
 * @description Job not found
*/
export type GetJobsJobid404 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Get a job
*/
export type GetJobsJobidQueryResponse = Job;
export type GetJobsJobidQuery = {
    Response: GetJobsJobidQueryResponse;
    PathParams: GetJobsJobidPathParams;
    Errors: GetJobsJobid404;
};