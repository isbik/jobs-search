import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PostAuthLogoutMutationResponse } from "../types/PostAuthLogout";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostAuthLogoutClient = typeof client<PostAuthLogoutMutationResponse, Error, never>;
type PostAuthLogout = {
    data: PostAuthLogoutMutationResponse;
    error: Error;
    request: never;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostAuthLogoutMutationResponse;
    client: {
        parameters: Partial<Parameters<PostAuthLogoutClient>[0]>;
        return: Awaited<ReturnType<PostAuthLogoutClient>>;
    };
};
/**
 * @link /auth/logout
 */
export function usePostAuthLogout(options: {
    mutation?: UseMutationOptions<PostAuthLogout["response"], PostAuthLogout["error"]>;
    client?: PostAuthLogout["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({}) => {
            const res = await client<PostAuthLogout["data"], PostAuthLogout["error"], void>({
                method: "post",
                url: `/auth/logout`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}