import type { JobStatus } from "./JobStatus";

 export type PatchInternalJobsJobidPathParams = {
    /**
     * @type number
    */
    jobId?: number | null;
};
/**
 * @description Update a job
*/
export type PatchInternalJobsJobid200 = {
    /**
     * @type boolean
    */
    ok: boolean;
};
/**
 * @description Forbidden
*/
export type PatchInternalJobsJobid403 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Job not found
*/
export type PatchInternalJobsJobid404 = {
    /**
     * @type string
    */
    message: string;
};
export type PatchInternalJobsJobidMutationRequest = {
    /**
     * @type string | undefined
    */
    status?: JobStatus;
    /**
     * @type boolean | undefined
    */
    isFeatured?: boolean;
};
/**
 * @description Update a job
*/
export type PatchInternalJobsJobidMutationResponse = {
    /**
     * @type boolean
    */
    ok: boolean;
};
export type PatchInternalJobsJobidMutation = {
    Response: PatchInternalJobsJobidMutationResponse;
    Request: PatchInternalJobsJobidMutationRequest;
    PathParams: PatchInternalJobsJobidPathParams;
    Errors: PatchInternalJobsJobid403 | PatchInternalJobsJobid404;
};