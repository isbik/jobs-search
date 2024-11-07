import type { User } from "./User";

 /**
 * @description Login user
*/
export type PostAuthLogin200 = User;
/**
 * @description Invalid credentials
*/
export type PostAuthLogin401 = {
    /**
     * @type string
    */
    message: string;
};
export type PostAuthLoginMutationRequest = {
    /**
     * @type string
    */
    email: string;
    /**
     * @type string
    */
    password: string;
};
/**
 * @description Login user
*/
export type PostAuthLoginMutationResponse = User;
export type PostAuthLoginMutation = {
    Response: PostAuthLoginMutationResponse;
    Request: PostAuthLoginMutationRequest;
    Errors: PostAuthLogin401;
};