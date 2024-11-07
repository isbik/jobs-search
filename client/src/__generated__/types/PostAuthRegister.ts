/**
 * @description Create new user
*/
export type PostAuthRegister201 = {
    /**
     * @type boolean
    */
    ok: boolean;
};
/**
 * @description User already exists
*/
export type PostAuthRegister403 = {
    /**
     * @type string
    */
    message: string;
};
/**
 * @description Something went wrong
*/
export type PostAuthRegister500 = {
    /**
     * @type string
    */
    message: string;
};
export type PostAuthRegisterMutationRequest = {
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
 * @description Create new user
*/
export type PostAuthRegisterMutationResponse = {
    /**
     * @type boolean
    */
    ok: boolean;
};
export type PostAuthRegisterMutation = {
    Response: PostAuthRegisterMutationResponse;
    Request: PostAuthRegisterMutationRequest;
    Errors: PostAuthRegister403 | PostAuthRegister500;
};