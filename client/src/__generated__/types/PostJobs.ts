import type { WorkType } from "./WorkType";
import type { WorkLevel } from "./WorkLevel";

 /**
 * @description Create a new job
*/
export type PostJobs201 = {
    /**
     * @type number
    */
    id: number;
};
export type PostJobsMutationRequest = {
    /**
     * @type string
    */
    title: string;
    /**
     * @type string
    */
    description: string;
    /**
     * @type number
    */
    minSalary: number | null;
    /**
     * @type number
    */
    maxSalary: number | null;
    /**
     * @type string, uri
    */
    url: string;
    /**
     * @type number
    */
    categoryId: number | null;
    /**
     * @type string
    */
    workType: WorkType;
    /**
     * @type array | undefined
    */
    skills?: string[];
    /**
     * @type string
    */
    experience: WorkLevel;
};
/**
 * @description Create a new job
*/
export type PostJobsMutationResponse = {
    /**
     * @type number
    */
    id: number;
};
export type PostJobsMutation = {
    Response: PostJobsMutationResponse;
    Request: PostJobsMutationRequest;
};