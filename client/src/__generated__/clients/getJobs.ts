import client from "@/shared/api/client";
import type { ResponseConfig } from "@/shared/api/client";
import type { GetJobsQueryResponse, GetJobsQueryParams } from "../types/GetJobs";

 /**
 * @link /jobs
 */
export async function getJobs(params?: GetJobsQueryParams, options: Partial<Parameters<typeof client>[0]> = {}): Promise<ResponseConfig<GetJobsQueryResponse>["data"]> {
    const res = await client<GetJobsQueryResponse>({ method: "get", url: `/jobs`, params, ...options });
    return res.data;
}