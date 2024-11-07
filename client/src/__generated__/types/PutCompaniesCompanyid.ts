import type { Company } from "./Company";

 export type PutCompaniesCompanyidPathParams = {
    /**
     * @type number
    */
    companyId?: number | null;
};
/**
 * @description Update a company
*/
export type PutCompaniesCompanyid200 = Company;
/**
 * @description Forbidden
*/
export type PutCompaniesCompanyid403 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Company not found
*/
export type PutCompaniesCompanyid404 = {
    /**
     * @type string
    */
    message: string;
};
export type PutCompaniesCompanyidMutationRequest = {
    /**
     * @type string, uri
    */
    url: string;
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
    email: string;
};
/**
 * @description Update a company
*/
export type PutCompaniesCompanyidMutationResponse = Company;
export type PutCompaniesCompanyidMutation = {
    Response: PutCompaniesCompanyidMutationResponse;
    Request: PutCompaniesCompanyidMutationRequest;
    PathParams: PutCompaniesCompanyidPathParams;
    Errors: PutCompaniesCompanyid403 | PutCompaniesCompanyid404;
};