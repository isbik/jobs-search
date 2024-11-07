import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PostAuthRegisterMutationRequest, PostAuthRegisterMutationResponse, PostAuthRegister403, PostAuthRegister500 } from "../types/PostAuthRegister";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostAuthRegisterClient = typeof client<PostAuthRegisterMutationResponse, PostAuthRegister403 | PostAuthRegister500, PostAuthRegisterMutationRequest>;
type PostAuthRegister = {
    data: PostAuthRegisterMutationResponse;
    error: PostAuthRegister403 | PostAuthRegister500;
    request: PostAuthRegisterMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostAuthRegisterMutationResponse;
    client: {
        parameters: Partial<Parameters<PostAuthRegisterClient>[0]>;
        return: Awaited<ReturnType<PostAuthRegisterClient>>;
    };
};
/**
 * @link /auth/register
 */
export function usePostAuthRegister(options: {
    mutation?: UseMutationOptions<PostAuthRegister["response"], PostAuthRegister["error"], {
        data: PostAuthRegister["request"];
    }>;
    client?: PostAuthRegister["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data }) => {
            const res = await client<PostAuthRegister["data"], PostAuthRegister["error"], PostAuthRegister["request"]>({
                method: "post",
                url: `/auth/register`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}