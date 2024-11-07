import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PostJobsMutationRequest, PostJobsMutationResponse } from "../types/PostJobs";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PostJobsClient = typeof client<PostJobsMutationResponse, Error, PostJobsMutationRequest>;
type PostJobs = {
    data: PostJobsMutationResponse;
    error: Error;
    request: PostJobsMutationRequest;
    pathParams: never;
    queryParams: never;
    headerParams: never;
    response: PostJobsMutationResponse;
    client: {
        parameters: Partial<Parameters<PostJobsClient>[0]>;
        return: Awaited<ReturnType<PostJobsClient>>;
    };
};
/**
 * @link /jobs
 */
export function usePostJobs(options: {
    mutation?: UseMutationOptions<PostJobs["response"], PostJobs["error"], {
        data: PostJobs["request"];
    }>;
    client?: PostJobs["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ data }) => {
            const res = await client<PostJobs["data"], PostJobs["error"], PostJobs["request"]>({
                method: "post",
                url: `/jobs`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}