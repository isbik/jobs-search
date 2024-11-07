import type { Company } from "./Company";

 export type GetCompaniesQueryParams = {
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
    name?: string;
};
/**
 * @description Get all companies
*/
export type GetCompanies200 = {
    /**
     * @type number
    */
    total: number;
    /**
     * @type array
    */
    items: Company[];
};
/**
 * @description Get all companies
*/
export type GetCompaniesQueryResponse = {
    /**
     * @type number
    */
    total: number;
    /**
     * @type array
    */
    items: Company[];
};
export type GetCompaniesQuery = {
    Response: GetCompaniesQueryResponse;
    QueryParams: GetCompaniesQueryParams;
};