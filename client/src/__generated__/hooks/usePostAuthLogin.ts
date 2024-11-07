import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PostAuthLoginMutationRequest, PostAuthLoginMutationResponse, PostAuthLogin401 } from "../types/PostAuthLogin";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostAuthLoginClient = typeof client<PostAuthLoginMutationResponse, PostAuthLogin401, PostAuthLoginMutationRequest>;
type PostAuthLogin = {
    data: PostAuthLoginMutationResponse;
    error: PostAuthLogin401;
    request: PostAuthLoginMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostAuthLoginMutationResponse;
    client: {
        parameters: Partial<Parameters<PostAuthLoginClient>[0]>;
        return: Awaited<ReturnType<PostAuthLoginClient>>;
    };
};
/**
 * @link /auth/login
 */
export function usePostAuthLogin(options: {
    mutation?: UseMutationOptions<PostAuthLogin["response"], PostAuthLogin["error"], {
        data: PostAuthLogin["request"];
    }>;
    client?: PostAuthLogin["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data }) => {
            const res = await client<PostAuthLogin["data"], PostAuthLogin["error"], PostAuthLogin["request"]>({
                method: "post",
                url: `/auth/login`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}