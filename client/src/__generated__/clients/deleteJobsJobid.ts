import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { DeleteJobsJobidMutationResponse, DeleteJobsJobidPathParams } from "../types/DeleteJobsJobid";

 /**
 * @link /jobs/:jobId
 */
export async function deleteJobsJobid(jobId: DeleteJobsJobidPathParams["jobId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<DeleteJobsJobidMutationResponse>["data"]> {
    const res = await client<DeleteJobsJobidMutationResponse>({ method: "delete", url: `/jobs/${jobId}`, ...options });
    return res.data;
}