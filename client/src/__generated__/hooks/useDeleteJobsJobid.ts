import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { DeleteJobsJobidMutationResponse, DeleteJobsJobidPathParams, DeleteJobsJobid403, DeleteJobsJobid404 } from "../types/DeleteJobsJobid";
import type { UseMutationOptions } from "@tanstack/react-query";

 type DeleteJobsJobidClient = typeof client<DeleteJobsJobidMutationResponse, DeleteJobsJobid403 | DeleteJobsJobid404, never>;
type DeleteJobsJobid = {
    data: DeleteJobsJobidMutationResponse;
    error: DeleteJobsJobid403 | DeleteJobsJobid404;
    request: never;
    pathParams: DeleteJobsJobidPathParams;
    queryParams: never;
    headerParams: never;
    response: DeleteJobsJobidMutationResponse;
    client: {
        parameters: Partial<Parameters<DeleteJobsJobidClient>[0]>;
        return: Awaited<ReturnType<DeleteJobsJobidClient>>;
    };
};
/**
 * @link /jobs/:jobId
 */
export function useDeleteJobsJobid(options: {
    mutation?: UseMutationOptions<DeleteJobsJobid["response"], DeleteJobsJobid["error"], {
        jobId: DeleteJobsJobidPathParams["jobId"];
    }>;
    client?: DeleteJobsJobid["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ jobId }) => {
            const res = await client<DeleteJobsJobid["data"], DeleteJobsJobid["error"], DeleteJobsJobid["request"]>({
                method: "delete",
                url: `/jobs/${jobId}`,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}