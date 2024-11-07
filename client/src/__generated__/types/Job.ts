import type { WorkType } from "./WorkType";
import type { WorkLevel } from "./WorkLevel";
import type { JobStatus } from "./JobStatus";

 export type Job = {
    /**
     * @type number
    */
    id: number;
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
    minSalary: number;
    /**
     * @type number
    */
    maxSalary: number;
    /**
     * @type string, uri
    */
    url: string;
    /**
     * @type object
    */
    category: {
        /**
         * @type number
        */
        id: number;
        /**
         * @type string
        */
        name: string;
    } | null;
    /**
     * @type object
    */
    company: {
        /**
         * @type number
        */
        id: number;
        /**
         * @type string
        */
        name: string;
        /**
         * @type string
        */
        logo: string;
        /**
         * @type string
        */
        url: string;
    } | null;
    /**
     * @type string
    */
    workType: WorkType;
    /**
     * @type string
    */
    experience: WorkLevel;
    /**
     * @type array
    */
    skills: string[];
    /**
     * @type string
    */
    status: JobStatus;
    /**
     * @type boolean
    */
    isFeatured: boolean;
};