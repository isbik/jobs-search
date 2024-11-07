import client from "@/shared/api/client";
import { useMutation } from "@tanstack/react-query";
import type { PatchInternalJobsJobidMutationRequest, PatchInternalJobsJobidMutationResponse, PatchInternalJobsJobidPathParams, PatchInternalJobsJobid403, PatchInternalJobsJobid404 } from "../types/PatchInternalJobsJobid";
import type { UseMutationOptions } from "@tanstack/react-query";

 type PatchInternalJobsJobidClient = typeof client<PatchInternalJobsJobidMutationResponse, PatchInternalJobsJobid403 | PatchInternalJobsJobid404, PatchInternalJobsJobidMutationRequest>;
type PatchInternalJobsJobid = {
    data: PatchInternalJobsJobidMutationResponse;
    error: PatchInternalJobsJobid403 | PatchInternalJobsJobid404;
    request: PatchInternalJobsJobidMutationRequest;
    pathParams: PatchInternalJobsJobidPathParams;
    queryParams: never;
    headerParams: never;
    response: PatchInternalJobsJobidMutationResponse;
    client: {
        parameters: Partial<Parameters<PatchInternalJobsJobidClient>[0]>;
        return: Awaited<ReturnType<PatchInternalJobsJobidClient>>;
    };
};
/**
 * @link /internal/jobs/:jobId
 */
export function usePatchInternalJobsJobid(options: {
    mutation?: UseMutationOptions<PatchInternalJobsJobid["response"], PatchInternalJobsJobid["error"], {
        jobId: PatchInternalJobsJobidPathParams["jobId"];
        data?: PatchInternalJobsJobid["request"];
    }>;
    client?: PatchInternalJobsJobid["client"]["parameters"];
} = {}) {
    const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {};
    return useMutation({
        mutationFn: async ({ jobId, data }) => {
            const res = await client<PatchInternalJobsJobid["data"], PatchInternalJobsJobid["error"], PatchInternalJobsJobid["request"]>({
                method: "patch",
                url: `/internal/jobs/${jobId}`,
                data,
                ...clientOptions
            });
            return res.data;
        },
        ...mutationOptions
    });
}