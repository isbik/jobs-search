import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PostCompaniesMutationRequest, PostCompaniesMutationResponse } from "../types/PostCompanies";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostCompaniesClient = typeof client<PostCompaniesMutationResponse, Error, PostCompaniesMutationRequest>;
type PostCompanies = {
    data: PostCompaniesMutationResponse;
    error: Error;
    request: PostCompaniesMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostCompaniesMutationResponse;
    client: {
        parameters: Partial<Parameters<PostCompaniesClient>[0]>;
        return: Awaited<ReturnType<PostCompaniesClient>>;
    };
};
/**
 * @link /companies
 */
export function usePostCompanies(options: {
    mutation?: UseMutationOptions<PostCompanies["response"], PostCompanies["error"], {
        data: PostCompanies["request"];
    }>;
    client?: PostCompanies["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data }) => {
            const res = await client<PostCompanies["data"], PostCompanies["error"], PostCompanies["request"]>({
                method: "post",
                url: `/companies`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}