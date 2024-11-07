import type { Company } from "./Company";

 export type GetCompaniesCompanyidPathParams = {
    /**
     * @type number
    */
    companyId?: number | null;
};
/**
 * @description Get a company
*/
export type GetCompaniesCompanyid200 = Company;
/**
 * @description Company not found
*/
export type GetCompaniesCompanyid404 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Get a company
*/
export type GetCompaniesCompanyidQueryResponse = Company;
export type GetCompaniesCompanyidQuery = {
    Response: GetCompaniesCompanyidQueryResponse;
    PathParams: GetCompaniesCompanyidPathParams;
    Errors: GetCompaniesCompanyid404;
};