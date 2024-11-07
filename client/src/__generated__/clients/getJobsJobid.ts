import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetJobsJobidQueryResponse, GetJobsJobidPathParams } from "../types/GetJobsJobid";

 /**
 * @link /jobs/:jobId
 */
export async function getJobsJobid(jobId: GetJobsJobidPathParams["jobId"], options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetJobsJobidQueryResponse>["data"]> {
    const res = await client<GetJobsJobidQueryResponse>({ method: "get", url: `/jobs/${jobId}`, ...options });
    return res.data;
}