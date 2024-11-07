import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { PatchInternalJobsJobidMutationRequest, PatchInternalJobsJobidMutationResponse, PatchInternalJobsJobidPathParams } from "../types/PatchInternalJobsJobid";

 /**
 * @link /internal/jobs/:jobId
 */
export async function patchInternalJobsJobid(jobId: PatchInternalJobsJobidPathParams["jobId"], data?: PatchInternalJobsJobidMutationRequest, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<PatchInternalJobsJobidMutationResponse>["data"]> {
    const res = await client<PatchInternalJobsJobidMutationResponse, PatchInternalJobsJobidMutationRequest>({ method: "patch", url: `/internal/jobs/${jobId}`, data, ...options });
    return res.data;
}