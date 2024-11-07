export type DeleteJobsJobidPathParams = {
    /**
     * @type number
    */
    jobId?: number | null;
};
/**
 * @description Delete a job
*/
export type DeleteJobsJobid200 = {
    /**
     * @type boolean
    */
    ok: boolean;
};
/**
 * @description Forbidden
*/
export type DeleteJobsJobid403 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Job not found
*/
export type DeleteJobsJobid404 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Delete a job
*/
export type DeleteJobsJobidMutationResponse = {
    /**
     * @type boolean
    */
    ok: boolean;
};
export type DeleteJobsJobidMutation = {
    Response: DeleteJobsJobidMutationResponse;
    PathParams: DeleteJobsJobidPathParams;
    Errors: DeleteJobsJobid403 | DeleteJobsJobid404;
};