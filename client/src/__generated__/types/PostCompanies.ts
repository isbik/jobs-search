/**
 * @description Create a new company
*/
export type PostCompanies201 = {
    /**
     * @type number
    */
    id: number;
};
export type PostCompaniesMutationRequest = {
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
 * @description Create a new company
*/
export type PostCompaniesMutationResponse = {
    /**
     * @type number
    */
    id: number;
};
export type PostCompaniesMutation = {
    Response: PostCompaniesMutationResponse;
    Request: PostCompaniesMutationRequest;
};